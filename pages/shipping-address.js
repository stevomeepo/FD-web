import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { fetchUserProfile } from "../lib/customer";
import AddressForm from '../components/AddressForm';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ShippingAddressPage = () => {
  const { user } = useContext(AuthContext);
  const [customerData, setCustomerData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

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
    } else {
      router.push('/login');
    }
  }, [user, router]);

  if (error) {
    return <div className="p-4 text-red-500 font-bold">Error: {error}</div>;
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      const data = await response.json();
    
      if (data.success) {
        setUser(null);
        Cookies.remove('accessToken');
        router.push('/');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
    setIsLoggingOut(false);
  };

  if (isLoggingOut) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <p>Logging out...</p>
      </div>
    );
  }

  const handleCancelAddressEdit = () => {
    setIsEditing(false);
    window.scrollTo(0, 0);
  };

  if (!customerData) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  const hasAddresses = customerData.addresses?.edges?.length > 0;
  const address = customerData.addresses?.edges[0]?.node;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-md p-8 border-2 border-gray-300 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-black mb-4 text-center">Shipping <span className="text-red-500">Address</span></h1>
        {!isEditing ? (
          <>
            {hasAddresses ? (
              <div className="mb-4">
                <p className="text-xl font-bold text-black">{address.firstName} {address.lastName}</p>
                <p className="text-m">{address.address1}</p>
                <p className="text-m">{address.address2}</p>
                <p className="text-m">{address.city}, {address.province} {address.zip}</p>
                <p className="text-m">{address.country}</p>
                <p className="text-m">{address.phone}</p>
              </div>
            ) : (
              <div className="mb-4 text-center text-m">No Address Saved Yet...</div>
            )}
            <button onClick={() => setIsEditing(true)} className="w-full bg-black hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              {hasAddresses ? 'Edit Address' : 'Add Address'}
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
        <p className="mt-4 text-center">
          <Link href="/" className="text-md font-bold cursor-pointer hover:text-red-500">
            Return to Home
          </Link>
        </p>
        {user && (
          <div onClick={handleLogout} className="mt-2 text-center text-md font-bold cursor-pointer hover:text-red-500">Logout</div>
        )}
      </div>
    </div>
  );
};

export default ShippingAddressPage;
