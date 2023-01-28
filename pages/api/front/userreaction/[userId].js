import Reaction from "../../../../models/Reaction";
import dbConnect from "../../../../lib/db-connect";
import { ObjectID } from "bson";

export default async function CommentsID(req, res) {
  //   try {
  await dbConnect();
  const { userId } = req.query;
  // const comments = await Comment.find();
  const reactions = await Reaction.aggregate([
    { $match: {post_id: {$eq : ObjectID(userId)}}},
    {
        $lookup: {
            from: "reactioncategories",
            localField: "category_id",
            foreignField: "_id",
            as: "name",
        }
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
            user_id :1,
            name: 1,
            node: 1

        }
    }
]);
    
  if (!reactions) {
    return res.status(400).end("No reactions");
  }

  return res.status(200).send(reactions);
}