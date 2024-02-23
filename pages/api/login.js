import { createCustomerAccessToken } from '../../lib/customer';

export default async function handler(req, res) {
  const { email, password } = req.body;

  const validationResponse = await createCustomerAccessToken(email, password);

  if (validationResponse.success) {
    const isProduction = process.env.NODE_ENV === 'production';
    // Set the token in an httpOnly cookie with Secure attribute for HTTPS
    // and specify Max-Age for the cookie's expiration time
    res.setHeader('Set-Cookie', `accessToken=${validationResponse.accessToken}; Path=/; HttpOnly; SameSite=Strict; ${isProduction ? 'Secure;' : ''} Max-Age=3600`);

    // Inform the client of a successful login without exposing the token in the response body
    res.status(200).json({ message: 'Login successful' });
  } else {
    // Handle failed validation
    res.status(401).json({ error: validationResponse.error });
  }
}