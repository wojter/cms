import Image from "../../../../models/Image";
import dbConnect from "../../../../lib/db-connect";
import { isAdminAuthenticated } from "../../../../lib/auth";

export default async function newImage(req, res) {
  try {
    await dbConnect();
    if (!(await isAdminAuthenticated(req, res))) {
      return res.status(401).end("Unauthorized");
    }
    const date_now = Date.now();
    const new_image = new Image({
      user_id: req.body.user_id,
      slug: req.body.slug,
      url: req.body.url,
      public_id: req.body.public_id,
      created: date_now,
      modified: date_now,
    });
    const error = await new_image.validateSync();
    if (error) {
      let errorMsg = "";
      Object.entries(error.errors).forEach(([label, { message }]) => {
        errorMsg = `Wrong ${label}: ${message}`;
      });
      return res.status(400).end(errorMsg);
    }

    await new_image.save();
    return res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
