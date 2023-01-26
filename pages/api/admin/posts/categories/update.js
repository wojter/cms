import PostCategory from "../../../../../models/PostCategory";
import dbConnect from "../../../../../lib/db-connect";
import mongoose from "mongoose";
import { isAdminAuthenticated } from "../../../../../lib/auth";

export default async function updatePostCategory(req, res) {
  try {
    await dbConnect();
    if (!(await isAdminAuthenticated(req, res))) {
      return res.status(401).end("Unauthorized");
    }
    const body = req.body;
    const postCategoryId = body.id;
    if (!mongoose.isValidObjectId(postCategoryId)) {
      return res
        .status(400)
        .end("Post category id is not a valid MongoDB ObjectId");
    }
    const postCategory = await PostCategory.findById(postCategoryId);
    if (!postCategory) {
      return res.status(400).end("Cannot find post category with such id");
    }

    Object.entries(body).forEach(([key, value]) => {
      postCategory[key] = value;
    });

    postCategory.modified = Date.now();

    const error = await postCategory.validateSync();
    if (error) {
      let errorMsg = "";
      Object.entries(error.errors).forEach(([label, { message }]) => {
        errorMsg = `Wrong ${label}: ${message}`;
      });
      return res.status(400).end(errorMsg);
    }
    await postCategory.save();

    return res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
