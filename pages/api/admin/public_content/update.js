import ConfigEntry from "../../../../models/ConfigEntry";
import dbConnect from "../../../../lib/db-connect";
import { isAdminAuthenticated } from "../../../../lib/auth";

export default async function moveFrontPost(req, res) {
  try {
    await dbConnect();
    if (!(await isAdminAuthenticated(req, res))) {
      return res.status(401).end("Unauthorized");
    }
    const toMovePostArrayId = req.body.array_id;
    const direction = req.body.direction;
    const config = await ConfigEntry.findOne();
    const parsed = JSON.parse(config.body);

    if (toMovePostArrayId === parsed.front_page_posts_ids.length-1 && direction === "right") {
      return res.status(200).end();
    }

    if (toMovePostArrayId === 0 && direction === "left") {
      return res.status(200).end();
    }

    const swapElements = (index1, index2) => {
      parsed.front_page_posts_ids[index1] = parsed.front_page_posts_ids.splice(index2, 1, parsed.front_page_posts_ids[index1])[0];
    };

    const idToSwapWith = toMovePostArrayId + (direction === "left" ? -1 : 1);

    swapElements(idToSwapWith, toMovePostArrayId);

    config.modified = Date.now();
    config.body = JSON.stringify(parsed);
    await config.save();
    return res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
