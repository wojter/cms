import PostCategory from "../../../../../models/PostCategory";
import dbConnect from "../../../../../lib/db-connect";
import { getDocsWithPagination } from "../../../../../lib/api-helpers/get-docs-with-pagination";
import { isAdminAuthenticated } from "../../../../../lib/auth";

export default async function postCategories(req, res) {
  try {
    await dbConnect();
    if (!(await isAdminAuthenticated(req, res))) {
      return res.status(401).end("Unauthorized");
    }
    const result = await getDocsWithPagination(PostCategory, req.query);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error.message);
  }
}
