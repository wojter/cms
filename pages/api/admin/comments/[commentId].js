import Comment from "../../../../models/Comment";
import dbConnect from "../../../../lib/db-connect";
import { isAdminAuthenticated } from "../../../../lib/auth";
import mongoose from "mongoose";
import User from "../../../../models/User";
import Post from "../../../../models/Post";

export default async function comment(req, res) {
  try {
    await dbConnect();
    if (!(await isAdminAuthenticated(req, res))) {
      return res.status(401).end("Unauthorized");
    }
    const { commentId } = req.query;
    if (!mongoose.isValidObjectId(commentId)) {
      return res.status(400).end("Comment id is not a valid MongoDB ObjectId");
    }
    const comment = await Comment.findById(commentId)
      .populate({ path: "user_id", model: User })
      .populate({ path: "post_id", model: Post });
    if (!comment) {
      return res.status(400).end("Cannot find comment with such id");
    }

    if (req.method === "GET") {
      return res.status(200).send(comment);
    } else if (req.method === "DELETE") {
      await Comment.deleteOne({ _id: comment._id });
      return res.status(200).end();
    } else {
      return res.status(400).end(`Method '${req.method}' not allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
