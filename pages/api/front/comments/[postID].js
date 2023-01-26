import Comment from "../../../../models/Comment";
import dbConnect from "../../../../lib/db-connect";
import { ObjectID } from "bson";

export default async function CommentsID(req, res) {
//   try {
    await dbConnect();
    const { postID } = req.query;
    // const comments = await Comment.find();
    const comments = await Comment.aggregate([
      { $match: { post_id: {$eq: ObjectID(postID) }} },
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
        $addFields: {
          "author": "$author.username",
        },
      }
    ]);
    
    if (!comments) {
      return res.status(400).end("No comments");
    }

    return res.status(200).send(comments);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).end(error.message);
//   }
}
