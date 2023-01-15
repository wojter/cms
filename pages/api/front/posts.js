import Post from "../../../models/Post";
import dbConnect from "../../../lib/db-connect";
import User from "../../../models/User";

export default async function postsCategories(req, res) {
  try {
    await dbConnect();
    const posts = await Post.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "author",
        },
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
            _id: 1,
            title: 1,
            created: 1,
            author: 1,
            category: 1,
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
