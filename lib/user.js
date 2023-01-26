import crypto from "crypto";
import User, { checkPasswordStr } from "../models/User";

export async function createUser(
  { username, email, password },
  isAdmin = false
) {
  try {
    const { ok, msg } = checkPasswordStr(password);
    if (!ok) {
      return { ok: false, msg };
    }
    const date_now = Date.now();
    const new_user = new User({
      email,
      username,
      created: date_now,
      modified: date_now,
      is_admin: isAdmin,
    });
    const error = await new_user.validateSync();
    if (error) {
      let errorMsg = "";
      Object.entries(error.errors).forEach(([label, { message }]) => {
        errorMsg = `Wrong ${label}: ${message}`;
      });
      return { ok: false, msg: errorMsg };
    }

    if (await User.exists({ email })) {
      let error = "There is already user with the same email address";
      return { ok: false, msg: error };
    }

    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");
    new_user.hash = hash;
    new_user.salt = salt;
    await new_user.save();
    return { ok: true };
  } catch (err) {
    console.err(err);
    return { ok: false, msg: err };
  }
}

export async function createAdminUser(body) {
  return createUser(body, true);
}

export async function findUser(email, isAdmin) {
  return await User.findOne({ email, is_admin: isAdmin }).lean();
}

export function validatePassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, "sha512")
    .toString("hex");
  const passwordsMatch = user.hash === inputHash;
  return passwordsMatch;
}
