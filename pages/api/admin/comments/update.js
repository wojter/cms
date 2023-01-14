import Comment from "../../../../models/Comment";
import dbConnect from "../../../../lib/db-connect";
import mongoose from "mongoose";
import { isAdminAuthenticated } from "../../../../lib/auth";

export default async function updateComment(req, res) {
  try {
    await dbConnect();
    if (!(await isAdminAuthenticated(req, res))) {
      return res.status(401).end("Unauthorized");
    }
    const body = req.body;
    const commentId = body.id;
    if (!mongoose.isValidObjectId(commentId)) {
      return res.status(400).end("Comment id is not a valid MongoDB ObjectId");
    }
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(400).end("Cannot find comment with such id");
    }

    Object.entries(body).forEach(([key, value]) => {
      comment[key] = value;
    });

    comment.modified = Date.now();

    const error = await comment.validateSync();
    if (error) {
      let errorMsg = "";
      Object.entries(error.errors).forEach(([label, { message }]) => {
        errorMsg = `Wrong ${label}: ${message}`;
      });
      return res.status(400).end(errorMsg);
    }
    await comment.save();

    return res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
