import Reaction from "../../../../../models/Reaction";
import ReactionCategory from "../../../../../models/ReactionCategory";
import dbConnect from "../../../../../lib/db-connect";
import { isAdminAuthenticated } from "../../../../../lib/auth";
import mongoose from "mongoose";

export default async function reactionCategory(req, res) {
  try {
    await dbConnect();
    if (!(await isAdminAuthenticated(req, res))) {
      return res.status(401).end("Unauthorized");
    }
    const { categoryId } = req.query;
    if (!mongoose.isValidObjectId(categoryId)) {
      return res
        .status(400)
        .end("Reaction category id is not a valid MongoDB ObjectId");
    }
    const reactionCategory = await ReactionCategory.findById(categoryId);
    if (!reactionCategory) {
      return res.status(400).end("Cannot find reaction category with such id");
    }
    if (req.method === "GET") {
      return res.status(200).send(reactionCategory);
    } else if (req.method === "DELETE") {
      if (await Reaction.exists({ category_id: reactionCategory._id })) {
        return res
          .status(400)
          .end(
            "Cannot delete this reaction category. It is a category of some existing reactions"
          );
      }
      await ReactionCategory.deleteOne({ _id: reactionCategory._id });

      return res.status(200).end();
    } else {
      return res.status(400).end(`Method '${req.method}' not allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
