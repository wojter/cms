import mongoose from "mongoose";

const PostCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [1, "Post category length cannot be less than 1 characters"],
    maxLength: [100, "Post category length cannot be more than 100 characters"],
  },
});

module.exports =
  mongoose.models.PostCategory ||
  mongoose.model("PostCategory", PostCategorySchema);
