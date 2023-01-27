import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  category_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
    minLength: [3, "Title length cannot be less than 3 characters"],
    maxLength: [200, "Title length cannot be more than 200 characters"],
    index: true,
  },
  body: {
    type: String,
    required: true,
    minLength: [5, "Body length cannot be less than 5 characters"],
    maxLength: [2000, "Body length cannot be more than 2000 characters"],
    index: true,
  },
  created: {
    type: Date,
    required: true,
  },
  modified: {
    type: Date,
    required: true,
  },
  thumbnail_url: {
    type: String,
  },
});

module.exports = mongoose.models.Post || mongoose.model("Post", PostSchema);
