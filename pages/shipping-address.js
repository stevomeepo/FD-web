import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { fetchUserProfile } from "../lib/customer";
import AddressForm from '../components/AddressForm';
import Link from 'next/link';

const ShippingAddressPage = () => {
  const { user } = useContext(AuthContext);
  const [customerData, setCustomerData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getCustomerData = async () => {
      const customerAccessToken = user?.customerAccessToken;

      if (customerAccessToken) {
        const response = await fetchUserProfile(customerAccessToken);

        if (response.success) {
          setCustomerData(response.data);
        } else {
          setError(response.error);
        }
      } else {
        setError('User is not logged in.');
      }
    };

    if (user) {
      getCustomerData();
    }
  }, [user]);

  if (error) {
    return <div className="p-4 text-red-500 font-bold">Error: {error}</div>;
  }

  const handleCancelAddressEdit = () => {
    setIsEditing(false);
    window.scrollTo(0, 0);
  };

  if (!customerData) {
    return <div className="p-4">Loading...</div>;
  }

  const address = customerData.addresses?.edges[0]?.node;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-md p-8 border-2 border-gray-300 rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-center text-black">Shipping Address</h1>
        {!isEditing ? (
          <>
            <div className="mb-4">
              <p className="text-sm font-bold text-black">{address?.firstName} {address?.lastName}</p>
              <p className="text-sm">{address?.address1}</p>
              <p className="text-sm">{address?.address2}</p>
              <p className="text-sm">{address?.city}, {address?.province} {address?.zip}</p>
              <p className="text-sm">{address?.country}</p>
              <p className="text-sm">{address?.phone}</p>
            </div>
            <button onClick={() => setIsEditing(true)} className="w-full bg-black hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Edit Address
            </button>
          </>
        ) : (
          <AddressForm
              customerAccessToken={user.customerAccessToken}
              initialAddress={address}
              onSaveSuccess={() => setIsEditing(false)}
              onCancel={handleCancelAddressEdit}
          />
        )}
      </div>
    </div>
  );
};

export default ShippingAddressPage;
