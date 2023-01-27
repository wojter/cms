import Comment from "../../../../models/Comment";
import dbConnect from "../../../../lib/db-connect";
import { isAuthenticated } from "../../../../lib/auth";
import mongoose from "mongoose";

export default async function newComment(req, res) {
  try {
    await dbConnect();
    if (!(await isAuthenticated(req, res))) {
      return res.status(401).end("Unauthorized");
    }
    const date_now = Date.now();
    const new_comment = new Comment({
      user_id: req.body.user_id,
      post_id: req.body.post_id,
      body: req.body.body,
      created: date_now,
      modified: date_now,
    });
    const error = await new_comment.validateSync();
    if (error) {
      let errorMsg = "";
      Object.entries(error.errors).forEach(([label, { message }]) => {
        errorMsg = `Wrong ${label}: ${message}`;
      });
      return res.status(400).end(errorMsg);
    }

    await new_comment.save();
    return res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
