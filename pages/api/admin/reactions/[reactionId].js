import Reaction from "../../../../models/Reaction";
import dbConnect from "../../../../lib/db-connect";
import { isAdminAuthenticated } from "../../../../lib/auth";
import mongoose from "mongoose";
import User from "../../../../models/User";
import Post from "../../../../models/Post";
import ReactionCategory from "../../../../models/ReactionCategory";

export default async function reaction(req, res) {
  try {
    await dbConnect();
    if (!(await isAdminAuthenticated(req, res))) {
      return res.status(401).end("Unauthorized");
    }
    const { reactionId } = req.query;
    if (!mongoose.isValidObjectId(reactionId)) {
      return res.status(400).end("Reaction id is not a valid MongoDB ObjectId");
    }
    const reaction = await Reaction.findById(reactionId)
      .populate({ path: "user_id", model: User })
      .populate({ path: "post_id", model: Post })
      .populate({ path: "category_id", model: ReactionCategory });
    if (!reaction) {
      return res.status(400).end("Cannot find reaction with such id");
    }

    if (req.method === "GET") {
      return res.status(200).send(reaction);
    } else if (req.method === "DELETE") {
      await Reaction.deleteOne({ _id: reaction._id });
      return res.status(200).end();
    } else {
      return res.status(400).end(`Method '${req.method}' not allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
