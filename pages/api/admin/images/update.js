import Image from "../../../../models/Image";
import dbConnect from "../../../../lib/db-connect";
import mongoose from "mongoose";
import { isAdminAuthenticated } from "../../../../lib/auth";

export default async function updateImage(req, res) {
  try {
    await dbConnect();
    if (!(await isAdminAuthenticated(req, res))) {
      return res.status(401).end("Unauthorized");
    }
    const body = req.body;
    const imageId = body.id;
    if (!mongoose.isValidObjectId(imageId)) {
      return res.status(400).end("Image id is not a valid MongoDB ObjectId");
    }
    const image = await Image.findById(imageId);
    if (!image) {
      return res.status(400).end("Cannot find image with such id");
    }

    Object.entries(body).forEach(([key, value]) => {
      image[key] = value;
    });

    image.modified = Date.now();

    const error = await image.validateSync();
    if (error) {
      let errorMsg = "";
      Object.entries(error.errors).forEach(([label, { message }]) => {
        errorMsg = `Wrong ${label}: ${message}`;
      });
      return res.status(400).end(errorMsg);
    }
    await image.save();

    return res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
