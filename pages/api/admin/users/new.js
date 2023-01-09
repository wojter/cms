import { createUser, createAdminUser } from "../../../../lib/user";
import dbConnect from "../../../../lib/db-connect";
import { isAdminAuthenticated } from "../../../../lib/auth";

export default async function newUser(req, res) {
  try {
    await dbConnect();
    if (!(await isAdminAuthenticated(req, res))) {
      return res.status(401).end("Unauthorized");
    }
    let response;
    if (req?.body?.is_admin) {
      response = await createAdminUser(req.body);
    } else {
      response = await createUser(req.body);
    }
    const { ok, msg } = response;
    if (!ok) {
      return res.status(400).end(msg);
    } else {
      return res.status(200).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
