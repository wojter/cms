import Reaction from "../../../../models/Reaction";
import Post from "../../../../models/Post";
import User from "../../../../models/User";
import ReactionCategory from "../../../../models/ReactionCategory";
import dbConnect from "../../../../lib/db-connect";
import { getDocsWithPagination } from "../../../../lib/get-docs-with-pagination";
import { isAuthenticated } from "../../../../lib/auth";
import { ObjectID } from "bson";

export default async function reactions(req, res) {
  try {
    await dbConnect();
    // if (!(await isAuthenticated(req, res))) {
    //   return res.status(401).end("Unauthorized");
    // }
   
    const body = req.body;
    console.log(body)
    const reaction = await Reaction.find(
      {
        "post_id": ObjectID(body.post_id),
        "user_id": ObjectID(body.user_id),
      }
    );
    if (!reaction) {
      return res.status(400).end("Cannot find reaction with such id");
    }
    return res.status(200).send(reaction);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error.message);
  }
}
