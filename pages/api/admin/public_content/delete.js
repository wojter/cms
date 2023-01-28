import ConfigEntry from "../../../../models/ConfigEntry";
import dbConnect from "../../../../lib/db-connect";
import { isAdminAuthenticated } from "../../../../lib/auth";

export default async function newFrontPost(req, res) {
  try {
    await dbConnect();
    if (!(await isAdminAuthenticated(req, res))) {
      return res.status(401).end("Unauthorized");
    }
    const toDeletePostArrayId = req.body.array_id;
    const config = await ConfigEntry.findOne();
    const parsed = JSON.parse(config.body);
    parsed.front_page_posts_ids = parsed.front_page_posts_ids.filter((_, id) => id !== toDeletePostArrayId);
    config.modified = Date.now();
    config.body = JSON.stringify(parsed);
    await config.save();
    return res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
