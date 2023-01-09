import mongoose from "mongoose";

const emailRe = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const validateEmail = function (email) {
  return emailRe.test(email);
};

const checkPasswordStr = function (password) {
  if (password.length < 6) {
    return {
      ok: false,
      msg: "Password is too short, should be 6 or more characters long.",
    };
  } else {
    return {
      ok: true,
    };
  }
};

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minLength: [5, "Email length cannot be less than 3 characters"],
    maxLength: [100, "Email length cannot be more than 100 characters"],
    validate: [validateEmail, "Please fill a valid email, address"],
    match: [emailRe, "Please fill a valid email, address"],
    index: true,
  },
  hash: {
    type: String,
    required: false,
  },
  salt: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
    minLength: [3, "Username length cannot be less than 3 characters"],
    maxLength: [50, "Username length cannot be more than 100 characters"],
    index: true,
  },
  is_admin: {
    type: Boolean,
    required: true,
    default: false,
  },
  created: {
    type: Date,
    required: true,
  },
  created_by: {
    type: mongoose.Types.ObjectId,
    required: false,
  },
  modified: {
    type: Date,
    required: true,
  },
  modified_by: {
    type: mongoose.Types.ObjectId,
    required: false,
  },
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
module.exports.checkPasswordStr = checkPasswordStr;
