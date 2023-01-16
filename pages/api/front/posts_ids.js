import Post from "../../../models/Post";
import dbConnect from "../../../lib/db-connect";

export default async function PostsIDs(req, res) {
  try {
    await dbConnect();
    const posts = await Post.find({}, { _id: 1 });

    if (!posts) {
      return res.status(400).end("Cannot find posts");
    }

    return res.status(200).send(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error.message);
  }
}
