import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { fetchUserProfile } from "../lib/customer";
import AddressForm from '../components/AddressForm';

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
    return <div>Error: {error}</div>;
  }

  const handleCancelAddressEdit = () => {
    setCustomerData(false);
  };

  if (!customerData) {
    return <div>Loading...</div>;
  }

  const address = customerData.addresses?.edges[0]?.node;

  return (
    <div>
      <h1>Shipping Address</h1>
      {!isEditing ? (
        <>
          <p>{address?.firstName} {address?.lastName}</p>
          <p>{address?.address1}</p>
          <p>{address?.address2}</p>
          <p>{address?.city}, {address?.province} {address?.zip}</p>
          <p>{address?.country}</p>
          <p>{address?.phone}</p>
          <button onClick={() => setIsEditing(true)}>Edit Address</button>
        </>
      ) : (
        <AddressForm
            customerAccessToken={user.customerAccessToken}
            initialAddress={customerData.addresses?.edges[0]?.node}
            onSaveSuccess={() => setCustomerData(false)}
            onCancel={handleCancelAddressEdit}
        />
      )}
    </div>
  );
};

export default ShippingAddressPage;
