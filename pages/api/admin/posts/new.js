import Post from "../../../../models/Post";
import dbConnect from "../../../../lib/db-connect";
import { isAdminAuthenticated } from "../../../../lib/auth";
import mongoose from "mongoose";

export default async function newPost(req, res) {
  try {
    await dbConnect();
    if (!(await isAdminAuthenticated(req, res))) {
      return res.status(401).end("Unauthorized");
    }
    const date_now = Date.now();
    const new_post = new Post({
      title: req.body.title,
      user_id: mongoose.Types.ObjectId(req.body.user_id),
      category_id: mongoose.Types.ObjectId(req.body.category_id),
      body: req.body.body,
      created: date_now,
      modified: date_now,
    });
    const error = await new_post.validateSync();
    if (error) {
      let errorMsg = "";
      Object.entries(error.errors).forEach(([label, { message }]) => {
        errorMsg = `Wrong ${label}: ${message}`;
      });
      return res.status(400).end(errorMsg);
    }

    await new_post.save();
    return res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
