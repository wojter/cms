import { getLoginSession } from "../../lib/auth";
import dbConnect from "../../lib/db-connect";
import { findUser } from "../../lib/user";

export default async function user(req, res) {
  try {
    await dbConnect();
    const role = req.query.role;
    if (role !== "admin" && role !== "user") {
      console.log(`Role should be 'admin' or 'user' but gets: ${role}`);
      return res
        .status(500)
        .end(`Role should be 'admin' or 'user' but gets: ${role}`);
    }
    req.isAdmin = role === "admin";
    const session = await getLoginSession(req);
    const isAdmin = req.isAdmin;
    const user = (session && (await findUser(session.email, isAdmin))) ?? null;

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).end("Authentication token is invalid, please log in");
  }
}
