import mongoose from "mongoose";

const PostCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [
      1,
      "Post category name length cannot be less than 1 characters",
    ],
    maxLength: [
      100,
      "Post category name length cannot be more than 100 characters",
    ],
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
});

module.exports =
  mongoose.models.PostCategory ||
  mongoose.model("PostCategory", PostCategorySchema);
