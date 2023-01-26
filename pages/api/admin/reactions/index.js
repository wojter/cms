import Reaction from "../../../../models/Reaction";
import Post from "../../../../models/Post";
import User from "../../../../models/User";
import ReactionCategory from "../../../../models/ReactionCategory";
import dbConnect from "../../../../lib/db-connect";
import { getDocsWithPagination } from "../../../../lib/get-docs-with-pagination";
import { isAdminAuthenticated } from "../../../../lib/auth";

export default async function reactions(req, res) {
  try {
    await dbConnect();
    if (!(await isAdminAuthenticated(req, res))) {
      return res.status(401).end("Unauthorized");
    }
    const populateData = [
      ["post_id", Post],
      ["user_id", User],
      ["category_id", ReactionCategory],
    ];
    const result = await getDocsWithPagination(
      Reaction,
      req.query,
      populateData
    );
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error.message);
  }
}
