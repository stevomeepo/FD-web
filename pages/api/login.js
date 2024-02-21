import { validateUserCredentials } from '../../lib/customer';

export default async function handler(req, res) {
  const { email, password } = req.body;

  const validationResponse = await validateUserCredentials(email, password);

  if (validationResponse.success) {
    // Set the token in an httpOnly cookie with Secure attribute for HTTPS
    res.setHeader('Set-Cookie', `accessToken=${validationResponse.accessToken}; Path=/; HttpOnly; SameSite=Strict; Secure;`);

    // Inform the client of a successful login without exposing the token in the response body
    res.status(200).json({ message: 'Login successful' });
  } else {
    // Handle failed validation
    res.status(401).json({ error: validationResponse.error });
  }
}
