import dbConnect from "../../../lib/db-connect";
import ConfigEntry from "../../../models/ConfigEntry";
import Post from "../../../models/Post";
import mongoose from "mongoose";

export default async function publicContent(req, res) {
    try {
        await dbConnect();
        const configs = await ConfigEntry.find();
        if (configs.length) {
          const parsed = JSON.parse(configs[0].body);
  
          parsed.front_page_posts_ids = parsed.front_page_posts_ids.map(id => mongoose.Types.ObjectId(id))
  
          return res.status(200).send(parsed)
        } else {
          return res.status(400);
        }
  
      } catch (error) {
        console.error(error);
        return res.status(500).end(error.message);
      }  
}