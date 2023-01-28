import dbConnect from "../../../../lib/db-connect";
import { isAdminAuthenticated } from "../../../../lib/auth";
import ConfigEntry from "../../../../models/ConfigEntry";
import Post from "../../../../models/Post";
import mongoose from "mongoose";

export default async function publicContent(req, res) {
    try {
      await dbConnect();
      if (!(await isAdminAuthenticated(req, res))) {
        return res.status(401).end("Unauthorized");
      }
      const configs = await ConfigEntry.find();
      if (configs.length) {
        const parsed = JSON.parse(configs[0].body);

        parsed.front_page_posts_ids = parsed.front_page_posts_ids.map(id => mongoose.Types.ObjectId(id))

        const posts = await Post.find({ _id: { $in: parsed.front_page_posts_ids } });

        if (!posts.length) {
          return res.status(200).json({
            frontPosts: []
          });
        }

        const resultPosts = [];
        
        parsed.front_page_posts_ids.forEach(id => {
          
          const post = posts.find(post => id.toString() === post._id.toString());

          if (post) {
            resultPosts.push({
              id: post._id.toString(),
              title: post.title,
              thumbnail_url: post.thumbnail_url,
            })
          }
        
        });

        if (!resultPosts.length) {
          return res.status(400);
        }
        return res.status(200).json({
          frontPosts: resultPosts
        });
      } else {
        return res.status(400);
      }

    } catch (error) {
      console.error(error);
      return res.status(500).end(error.message);
    }
  }
  