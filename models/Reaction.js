import mongoose from "mongoose";

const ReactionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  post_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  category_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  created: {
    type: Date,
    required: true,
  },
  modified: {
    type: Date,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
    index: true,
  },
});

module.exports =
  mongoose.models.Reaction || mongoose.model("Reaction", ReactionSchema);
