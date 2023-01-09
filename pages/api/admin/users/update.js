import User from "../../../../models/User";
import dbConnect from "../../../../lib/db-connect";
import mongoose from "mongoose";
import { isAdminAuthenticated } from "../../../../lib/auth";

export default async function updateUser(req, res) {
  try {
    await dbConnect();
    if (!(await isAdminAuthenticated(req, res))) {
      return res.status(401).end("Unauthorized");
    }
    const body = req.body;
    const userId = body.id;
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).end("User id is not a valid MongoDB ObjectId");
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).end("Cannot find user with such id");
    }

    Object.entries(body).forEach(([key, value]) => {
      user[key] = value;
    });

    user.modified = Date.now();

    const error = await user.validateSync();
    if (error) {
      let errorMsg = "";
      Object.entries(error.errors).forEach(([label, { message }]) => {
        errorMsg = `Wrong ${label}: ${message}`;
      });
      return res.status(400).end(errorMsg);
    }
    await user.save();

    return res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
