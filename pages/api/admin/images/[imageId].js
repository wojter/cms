import Image from "../../../../models/Image";
import dbConnect from "../../../../lib/db-connect";
import { isAdminAuthenticated } from "../../../../lib/auth";
import mongoose from "mongoose";
import User from "../../../../models/User";

export default async function image(req, res) {
  try {
    await dbConnect();
    if (!(await isAdminAuthenticated(req, res))) {
      return res.status(401).end("Unauthorized");
    }
    const { imageId } = req.query;
    if (!mongoose.isValidObjectId(imageId)) {
      return res.status(400).end("Image id is not a valid MongoDB ObjectId");
    }
    const image = await Image.findById(imageId).populate({
      path: "user_id",
      model: User,
    });
    if (!image) {
      return res.status(400).end("Cannot find image with such id");
    }

    if (req.method === "GET") {
      return res.status(200).send(image);
    } else if (req.method === "DELETE") {
      await Image.deleteOne({ _id: image._id });
      return res.status(200).end();
    } else {
      return res.status(400).end(`Method '${req.method}' not allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
