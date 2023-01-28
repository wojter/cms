import Reaction from "../../../../models/Reaction";
import dbConnect from "../../../../lib/db-connect";
import { ObjectID } from "bson";

export default async function CommentsID(req, res) {
  //   try {
  await dbConnect();
  const { postID } = req.query;
  // const comments = await Comment.find();
  const reactions = await Reaction.aggregate([
    { $match: { post_id: { $eq: ObjectID(postID) } } },
    {
      $lookup: {
        from: "reactioncategories",
        localField: "category_id",
        foreignField: "_id",
        as: "name",
      },
    },
    {
      $unwind: "$name",
    },
    {
      $addFields: {
        name: "$name.name",
        node: "$name.node",
      },
    },
    {
        $project : {
          _id : 0,
          created:0,
          modified: 0
        },
    },
    {
      $group: {
         _id:  "$name",
        node:  { $addToSet :"$node"} ,
        count: { $sum: 1 },
      }
    },
    {
      $unwind: "$node"
    }
  ]);

  if (!reactions) {
    return res.status(400).end("No reactions");
  }

  return res.status(200).send(reactions);
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).end(error.message);
  //   }
}
