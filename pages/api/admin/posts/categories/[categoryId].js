import Post from "../../../../../models/Post";
import PostCategory from "../../../../../models/PostCategory";
import dbConnect from "../../../../../lib/db-connect";
import { isAdminAuthenticated } from "../../../../../lib/auth";
import mongoose from "mongoose";

export default async function postCategory(req, res) {
  try {
    await dbConnect();
    if (!(await isAdminAuthenticated(req, res))) {
      return res.status(401).end("Unauthorized");
    }
    const { categoryId } = req.query;
    if (!mongoose.isValidObjectId(categoryId)) {
      return res
        .status(400)
        .end("Post category id is not a valid MongoDB ObjectId");
    }
    const postCategory = await PostCategory.findById(categoryId);
    if (!postCategory) {
      return res.status(400).end("Cannot find post category with such id");
    }
    if (req.method === "GET") {
      return res.status(200).send(postCategory);
    } else if (req.method === "DELETE") {
      if (await Post.exists({ category_id: postCategory._id })) {
        return res
          .status(400)
          .end(
            "Cannot delete this post category. It is a category of some existing posts"
          );
      }
      await PostCategory.deleteOne({ _id: postCategory._id });

      return res.status(200).end();
    } else {
      return res.status(400).end(`Method '${req.method}' not allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
