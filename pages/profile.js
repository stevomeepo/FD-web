import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { fetchUserProfile } from "../lib/customer";
import ProfileForm from '../components/ProfileForm';
import AddressForm from '../components/AddressForm';

const ProfilePage = () => {
  const { user, isLoading } = useContext(AuthContext);
  const [customerData, setCustomerData] = useState(null);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
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

  const handleSaveSuccess = () => {
  // Re-fetch profile data or update state as needed
  setShowForm(false);
  };

  if (isLoading || !customerData) {
    return <div>Loading...</div>;
  }

  const primaryAddress = customerData.addresses?.edges[0]?.node;

  return (
    <div>
      <h1>Profile</h1>
      {!showProfileForm && (
        <button onClick={() => setShowProfileForm(true)}>Edit Profile</button>
      )}
      {user && showProfileForm && (
        <ProfileForm
          customerAccessToken={user.customerAccessToken}
          initialData={customerData}
          onSaveSuccess={() => setShowProfileForm(false)}
        />
      )}

      {!showAddressForm && (
        <button onClick={() => setShowAddressForm(true)}>Edit Address</button>
      )}
      {user && showAddressForm && (
        <AddressForm
          customerAccessToken={user.customerAccessToken}
          initialAddress={customerData.addresses?.edges[0]?.node}
          onSaveSuccess={() => setShowAddressForm(false)}
        />
      )}
    </div>
  );
};

export default ProfilePage;