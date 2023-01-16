import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  post_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  body: {
    type: String,
    required: true,
    minLength: [1, "Body length cannot be less than 1 characters"],
    maxLength: [500, "Body length cannot be more than 500 characters"],
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
  mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
