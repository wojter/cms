import Post from "../../../../models/Post";
import dbConnect from "../../../../lib/db-connect";
import { ObjectID } from "bson";

export default async function PostsIDs(req, res) {
  try {
    await dbConnect();
    const { postID } = req.query;
    const posts = await Post.aggregate([
      { $match: { _id: {$eq: ObjectID(postID) }} },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "author",
        }
      },
      {
        $unwind: "$author",
      },
      {
            $lookup: {
                from: "postcategories",
                localField: "category_id",
                foreignField: "_id",
                as: "category"
            }
      },
      {
        $unwind: "$category",
      },
      {
        $addFields: {
          "author": "$author.username",
          "category": "$category.name"
        },
      },
      {
        $project: {
          category_id: 0,
          user_id: 0,
        }
      }
    ]);

    if (!posts) {
      return res.status(400).end("Cannot find posts");
    }

    return res.status(200).send(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error.message);
  }
}
