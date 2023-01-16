import Reaction from "../../../../models/Reaction";
import dbConnect from "../../../../lib/db-connect";
import mongoose from "mongoose";
import { isAdminAuthenticated } from "../../../../lib/auth";

export default async function updateReaction(req, res) {
  try {
    await dbConnect();
    if (!(await isAdminAuthenticated(req, res))) {
      return res.status(401).end("Unauthorized");
    }
    const body = req.body;
    const reactionId = body.id;
    if (!mongoose.isValidObjectId(reactionId)) {
      return res.status(400).end("Reaction id is not a valid MongoDB ObjectId");
    }
    const reaction = await Reaction.findById(reactionId);
    if (!reaction) {
      return res.status(400).end("Cannot find reaction with such id");
    }

    Object.entries(body).forEach(([key, value]) => {
      reaction[key] = value;
    });

    reaction.modified = Date.now();

    const error = await reaction.validateSync();
    if (error) {
      let errorMsg = "";
      Object.entries(error.errors).forEach(([label, { message }]) => {
        errorMsg = `Wrong ${label}: ${message}`;
      });
      return res.status(400).end(errorMsg);
    }
    await reaction.save();

    return res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
