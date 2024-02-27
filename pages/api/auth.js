import { validateAccessTokenAndGetUserData } from '../../lib/customer';

export default async function handler(req, res) {
  const accessToken = req.cookies.accessToken;
  const validationResponse = await validateAccessTokenAndGetUserData(accessToken);

  if (!accessToken) {
    return res.status(200).json({ isAuthenticated: false });
  }

  if (validationResponse.valid) {
    return res.status(200).json({
      isAuthenticated: true,
      user: validationResponse.data,
      accessToken,
      shopifyCustomerId: validationResponse.shopifyCustomerId
    });
  } else {
    return res.status(200).json({ isAuthenticated: false });
  }
}
