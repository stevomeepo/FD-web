import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { fetchUserProfile } from "../lib/customer";
import ProfileForm from '../components/ProfileForm';
import Link from 'next/link';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [customerData, setCustomerData] = useState(null);
  const [showProfileForm, setShowProfileForm] = useState(false);
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

  const handleCancelProfileEdit = () => {
    setShowProfileForm(false);
  };

  if (!customerData) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-md p-8 border-2 border-gray-300 rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-center text-black">
          {user ? `${user.firstName}'s Profile` : "Profile"}
        </h1>
        {!showProfileForm ? (
          <>
            <div className="mb-4">
              <p className="text-sm font-bold text-black">First Name: <span className="font-normal">{customerData.firstName}</span></p>
            </div>
            <div className="mb-4">
              <p className="text-sm font-bold text-black">Last Name: <span className="font-normal">{customerData.lastName}</span></p>
            </div>
            <div className="mb-4">
              <p className="text-sm font-bold text-black">Email: <span className="font-normal">{customerData.email}</span></p>
            </div>
            <button 
              onClick={() => setShowProfileForm(true)}
              className="w-full px-4 py-2 mb-4 font-bold text-white bg-black rounded hover:bg-red-500 focus:outline-none focus:shadow-outline"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <ProfileForm
            customerAccessToken={user.customerAccessToken}
            initialData={customerData}
            onSaveSuccess={() => setShowProfileForm(false)}
            onCancel={handleCancelProfileEdit}
          />
        )}
        <p className="mt-4 text-center">
          <Link href="/" className="text-red-500 font-bold">
            Return to Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;