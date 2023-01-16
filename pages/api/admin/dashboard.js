import User from "../../../models/User";
import Post from "../../../models/Post";
import Comment from "../../../models/Comment";
import Reaction from "../../../models/Reaction";
import dbConnect from "../../../lib/db-connect";
import { isAdminAuthenticated } from "../../../lib/auth";

export default async function dashboard(req, res) {
  try {
    await dbConnect();
    if (!(await isAdminAuthenticated(req, res))) {
      return res.status(401).end("Unauthorized");
    }
    const users = await User.count();
    const posts = await Post.count();
    const comments = await Comment.count();
    const reactions = await Reaction.count();
    const result = {
      users,
      posts,
      comments,
      reactions,
    };
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error.message);
  }
}
