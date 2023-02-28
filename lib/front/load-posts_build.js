import dbConnect from "../db-connect";
import Post from "../../models/Post";
import ConfigEntry from "../../models/ConfigEntry";
import PostCategory from "../../models/PostCategory";
import { ObjectID } from "bson";

export async function getPosts() {
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
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $addFields: {
          author: "$author.username",
          category: "$category.name",
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          created: 1,
          author: 1,
          category: 1,
          thumbnail_url: 1,
        },
      },
    ]);

    if (!posts) {
      return [];
    }
    for (let i = 0; i < posts.length; i++) {
      posts[i]._id = posts[i]._id.toString();
      posts[i].created = posts[i].created.toString();
    }
    return posts;
  } catch (error) {
    console.error(error);
    return error;
  }
  const res = await fetch(`${process.env.API_URL}/api/front/posts`);
  const data = await res.json();

  return data;
}
export async function getPostCategories() {
  try {
    await dbConnect();
    const postCategories = await PostCategory.find();

    if (!postCategories) {
      return [];
    }
    return postCategories;
  } catch (error) {
    console.error(error);
    return error;
  }
  const res = await fetch(`/api/front/postcategories`);
  const data = await res.json();

  return data;
}
export async function getPostsIDs() {
  await dbConnect();
  const posts = await Post.find({}, { _id: 1 });

  if (!posts) {
    return [];
  }

  return posts;
}

export async function getPost(params) {
  try {
    await dbConnect();
    const postID = params.id;
    const posts = await Post.aggregate([
      { $match: { _id: { $eq: ObjectID(postID.toString()) } } },
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
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $addFields: {
          author: "$author.username",
          category: "$category.name",
        },
      },
      {
        $project: {
          category_id: 0,
          user_id: 0,
        },
      },
    ]);
    posts[0]._id = posts[0]._id.toString();
    posts[0].created = posts[0].created.toString();
    posts[0].modified = posts[0].modified.toString();
    if (!posts) {
      return [];
    }

    return posts;
  } catch (error) {
    console.error(error);
    return error;
  }

  const res = await fetch(
    `${process.env.API_URL}/api/front/posts/${params.id}`
  );
  const data = await res.json();

  return data;
}

export async function getPublicContent() {
  try {
    await dbConnect();
    const configs = await ConfigEntry.find();
    if (configs.length) {
      const parsed = JSON.parse(configs[0].body);
      return parsed;
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
  const res = await fetch(`${process.env.API_URL}/api/front/publiccontent`);
  const data = await res.json();

  return data;
}
