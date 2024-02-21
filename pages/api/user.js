import { validateAccessTokenAndGetUserData } from '../../lib/customer';

export default async function handler(req, res) {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    const validationResponse = await validateAccessTokenAndGetUserData(accessToken);

    if (validationResponse.valid) {
        res.status(200).json(validationResponse.data);
    } else {
        res.status(401).json({ error: validationResponse.error });
    }
}