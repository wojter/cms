import { removeTokenCookie } from "../../../lib/auth-cookies";

export default async function logout(req, res) {
  const role = req.query?.role;
  const redirectPath = req.query?.redirect;
  if (role !== "admin" && role !== "user") {
    console.log(`Role should be 'admin' or 'user' but gets: ${role}`);
    res.writeHead(401, { Location: "/" });
    res.end();
    return;
  }
  const isAdmin = role === "admin";
  removeTokenCookie(res, isAdmin);
  res.writeHead(302, { Location: redirectPath ? `/${redirectPath}` : "/test" });
  res.end();
}
