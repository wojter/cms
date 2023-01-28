import mongoose from "mongoose";

const ConfigEntrySchema = new mongoose.Schema({
  body: {
    type: String,
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
});

module.exports = mongoose.models.ConfigEntry || mongoose.model("ConfigEntry", ConfigEntrySchema);
