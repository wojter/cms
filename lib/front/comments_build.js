import dbConnect from "../db-connect";
import Comment from "../../models/Comment";
import ReactionCategory from "../../models/ReactionCategory";
import Reaction from "../../models/Reaction";
import { ObjectID } from "bson";

export async function getPostComments(params) {
  await dbConnect();
  const  postID  = params.id;
  // const comments = await Comment.find();
  const comments = await Comment.aggregate([
    { $match: { post_id: { $eq: ObjectID(postID) } } },
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
      $addFields: {
        author: "$author.username",
      },
    },
  ]);

  if (!comments) {
    return [];
  }
  for (let i = 0; i < comments.length; i++) {
    comments[i]._id = comments[i]._id.toString();
    comments[i].created = comments[i].created.toString();
    comments[i].modified = comments[i].modified.toString();
    comments[i].user_id = comments[i].user_id.toString();
    comments[i].post_id = comments[i].post_id.toString();
  }
  return comments;
  const res = await fetch(
    `${process.env.API_URL}/api/front/comments/${params.id}`
  );
  const data = await res.json();

  return data;
}

export async function getReactionCategories() {
  try {
    await dbConnect();
    let reactionCategories = await ReactionCategory.find(
      {},
      { node: 1, name: 1 }
    );
    if (reactionCategories.length == 0) {
      return [];
    }
    let ret = reactionCategories.map((cat) => {
      const container = {};
      container._id = cat._id.toString();
      container.name = cat.name;
      container.node = cat.node;
      return container;
    });
    return ret;
  } catch (error) {
    console.log(error);
    return error;
  }
  const res = await fetch(
    `${process.env.API_URL}/api/front/reactioncategories`
  );
  const data = await res.json();

  return data;
}

export async function getPostReactions(params) {
  try {
    await dbConnect();
    const  postID  = params.id;
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
        $project: {
          _id: 0,
          created: 0,
          modified: 0,
        },
      },
      {
        $group: {
          _id: "$name",
          node: { $addToSet: "$node" },
          count: { $sum: 1 },
        },
      },
      {
        $unwind: "$node",
      },
    ]);
    if (reactions.length == 0) {
      return [];
    }
    return reactions;
  } catch (error) {
    console.error(error);
    return error;
  }

  const res = await fetch(
    `${process.env.API_URL}/api/front/reactions/${params.id}`
  );
  const data = await res.json();

  return data;
}

export async function getUserReactions(params) {
  await dbConnect();
  const  userId  = params.id;
  // const comments = await Comment.find();
  const reactions = await Reaction.aggregate([
    { $match: { post_id: { $eq: ObjectID(userId) } } },
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
      $project: {
        user_id: 1,
        name: 1,
        node: 1,
      },
    },
  ]);
  
  if (reactions.length == 0) {
    return [];
  }
  console.log(reactions)
  reactions[0]._id = reactions[0]._id.toString()
  reactions[0].user_id = reactions[0].user_id.toString()
  return reactions;
  const res = await fetch(
    `${process.env.API_URL}/api/front/userreaction/${params.id}`
  );
  const data = await res.json();

  return data;
}
