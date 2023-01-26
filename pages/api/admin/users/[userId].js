import User from "../../../../models/User";
import Post from "../../../../models/Post";
import Comment from "../../../../models/Comment";
import Reaction from "../../../../models/Reaction";
import dbConnect from "../../../../lib/db-connect";
import { isAdminAuthenticated } from "../../../../lib/auth";
import mongoose from "mongoose";

export default async function user(req, res) {
  try {
    await dbConnect();
    if (!(await isAdminAuthenticated(req, res))) {
      return res.status(401).end("Unauthorized");
    }
    const { userId } = req.query;
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).end("User id is not a valid MongoDB ObjectId");
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).end("Cannot find user with such id");
    }

    if (req.method === "GET") {
      return res.status(200).send(user);
    } else if (req.method === "DELETE") {
      if (req.user._id === user._id.toString()) {
        return res.status(400).end("Cannot delete your own account");
      }
      if (user.is_admin) {
        return res
          .status(400)
          .end(
            "Cannot delete admin account. Change 'is_admin' property first."
          );
      }

      let userPosts = await Post.find({ user_id: user._id })
        .select("user_id")
        .lean();

      userPosts = userPosts.map((post) => post._id);

      await Comment.deleteMany({
        $or: [{ user_id: user._id }, { post_id: { $in: userPosts } }],
      });

      await Reaction.deleteMany({
        $or: [{ user_id: user._id }, { post_id: { $in: userPosts } }],
      });

      await Post.deleteMany({ _id: { $in: userPosts } });

      await User.deleteOne({ _id: user._id });
      return res.status(200).end();
    } else {
      return res.status(400).end(`Method '${req.method}' not allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
