import { createUser } from "../../../lib/user";
import dbConnect from "../../../lib/db-connect";

export default async function signup(req, res) {
  await dbConnect();
  try {
    await createUser(req.body);
    res.status(200).send({ done: true });
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
