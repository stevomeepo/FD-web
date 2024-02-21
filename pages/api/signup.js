// pages/api/SignUp.js
import { createCustomer, validateUserCredentials } from '../../lib/customer';

export default async function handler(req, res) {
    const customerInput = req.body;

    try {
        const creationResult = await createCustomer(customerInput);
        if (creationResult.errors) {
            res.status(400).json({ errors: creationResult.errors });
            return;
        }

        const { email, password } = customerInput;
        const validationResponse = await validateUserCredentials(email, password);

        if (validationResponse.success) {
            res.setHeader('Set-Cookie', `accessToken=${validationResponse.accessToken}; Path=/; HttpOnly; SameSite=Strict; Secure;`);
            res.status(200).json({ message: 'Signup successful' });
        } else {
            // Handle failed login attempt after signup
            res.status(401).json({ error: 'Signup successful, but login failed. Please try logging in.' });
        }
    } catch (error) {
        console.error('Signup failed:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}