// pages/address/edit/[id].js
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../../../context/authContext';
import { fetchAddressDetails, updateCustomerAddress } from '../../../lib/customer';

const EditAddressPage = () => {
    const { user } = useContext(AuthContext);
    const [address, setAddress] = useState(null);
    const [error, setError] = useState('');
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (user && id) {
            fetchAddressDetails(user.customerAccessToken, id)
                .then(response => {
                    if (response.success) {
                        setAddress(response.address);
                    } else {
                        setError(response.error || 'Failed to fetch address details.');
                    }
                });
        }
    }, [user, id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const addressInput = Object.fromEntries(formData.entries());

        const response = await updateCustomerAddress(user.customerAccessToken, id, addressInput);
        if (response.success) {
            router.push('/address');
        } else {
            setError(response.error || 'Failed to update address.');
        }
    };

    if (!address) {
        return <div>Loading...</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            {/* Create form fields for address details here, pre-filled with address data */}
            <input name="firstName" defaultValue={address.firstName} />
            {/* Repeat for other fields */}
            <button type="submit">Update Address</button>
        </form>
    );
};

export default EditAddressPage;
