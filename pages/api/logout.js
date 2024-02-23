import { deleteCustomerAccessToken } from '../../lib/customer';

export default async function logout(req, res) {
  const accessToken = req.cookies.accessToken;

  if (accessToken) {
    const deletionResult = await deleteCustomerAccessToken(accessToken);

    if (!deletionResult.success) {
      console.error('Failed to delete customer access token:', deletionResult.error);
    }
  }

  res.setHeader('Set-Cookie', `accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict`);
  res.status(200).json({ success: true });
}