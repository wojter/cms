import Post from "../../../../models/Post";
import dbConnect from "../../../../lib/db-connect";
import mongoose from "mongoose";
import { isAdminAuthenticated } from "../../../../lib/auth";

export default async function updatePost(req, res) {
  try {
    await dbConnect();
    if (!(await isAdminAuthenticated(req, res))) {
      return res.status(401).end("Unauthorized");
    }
    const body = req.body;
    const postId = body.id;
    if (!mongoose.isValidObjectId(postId)) {
      return res.status(400).end("Post id is not a valid MongoDB ObjectId");
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).end("Cannot find post with such id");
    }

    Object.entries(body).forEach(([key, value]) => {
      post[key] = value;
    });

    post.modified = Date.now();

    const error = await post.validateSync();
    if (error) {
      let errorMsg = "";
      Object.entries(error.errors).forEach(([label, { message }]) => {
        errorMsg = `Wrong ${label}: ${message}`;
      });
      return res.status(400).end(errorMsg);
    }
    await post.save();

    return res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
