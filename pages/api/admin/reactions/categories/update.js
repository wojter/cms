import ReactionCategory from "../../../../../models/ReactionCategory";
import dbConnect from "../../../../../lib/db-connect";
import mongoose from "mongoose";
import { isAdminAuthenticated } from "../../../../../lib/auth";

export default async function updateReactionCategory(req, res) {
  try {
    await dbConnect();
    if (!(await isAdminAuthenticated(req, res))) {
      return res.status(401).end("Unauthorized");
    }
    const body = req.body;
    const reactionCategoryId = body.id;
    if (!mongoose.isValidObjectId(reactionCategoryId)) {
      return res
        .status(400)
        .end("Reaction category id is not a valid MongoDB ObjectId");
    }
    const reactionCategory = await ReactionCategory.findById(
      reactionCategoryId
    );
    if (!reactionCategory) {
      return res.status(400).end("Cannot find reaction category with such id");
    }

    Object.entries(body).forEach(([key, value]) => {
      reactionCategory[key] = value;
    });

    reactionCategory.modified = Date.now();

    const error = await reactionCategory.validateSync();
    if (error) {
      let errorMsg = "";
      Object.entries(error.errors).forEach(([label, { message }]) => {
        errorMsg = `Wrong ${label}: ${message}`;
      });
      return res.status(400).end(errorMsg);
    }
    await reactionCategory.save();

    return res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
