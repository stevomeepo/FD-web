import { deleteCustomerAddress } from '../../lib/customer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { adminAccessToken, customerId, addressId } = req.body;

    try {
        const deletedAddressId = await deleteCustomerAddress(adminAccessToken, customerId, addressId);
        res.status(200).json({ success: true, deletedAddressId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
}
