export default function logout(req, res) {
  res.setHeader('Set-Cookie', `accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict`);
  res.status(200).json({ success: true });
}