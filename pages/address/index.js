import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { fetchUserProfile, deleteCustomerAddress } from "../../lib/customer";
import { useRouter } from 'next/router';
import Link from 'next/link';
import Cookies from 'js-cookie';

const ShippingAddressPage = () => {
  const { user, isLoading } = useContext(AuthContext);
  const [customerData, setCustomerData] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const getCustomerData = async () => {
      if (!user || !user.customerAccessToken) {
        setError('User is not logged in.');
        return;
      }
      const customerAccessToken = user.customerAccessToken;
      if (customerAccessToken) {
        const response = await fetchUserProfile(customerAccessToken);
        if (response.success) {
          setCustomerData(response.data);
        } else {
          setError(response.error);
        }
      }
    };
  
    if (!isLoading && user) {
      getCustomerData();
    } else {
      router.push('/login');
    }
  }, [user, isLoading]);

  const handleDeleteAddress = async (addressId) => {
    if (!user || !user.customerAccessToken) {
      console.error("User is not authenticated.");
      return;
    }

    const customerAccessToken = user.customerAccessToken;
    try {
      const response = await deleteCustomerAddress(customerAccessToken, addressId);
      if (response && response.success) {
        getCustomerData();
      } else {
        console.error("Failed to delete address:", response.errors);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

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
        router.push('/login');
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

  if (!customerData) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  const hasAddresses = customerData.addresses?.edges?.length > 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-md p-8 border-2 border-gray-300 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-black mb-4 text-center">Shipping <span className="text-red-500">Address</span></h1>
        {hasAddresses ? (
        customerData.addresses.edges.map(({ node: address }) => {
          return (
            <div key={address.id} className="mb-6">
              <p className="text-xl font-bold text-black">{address.firstName} {address.lastName}</p>
              <p className="text-m">{address.address1}</p>
              <p className="text-m">{address.address2}</p>
              <p className="text-m">{address.city}, {address.province} {address.zip}</p>
              <p className="text-m">{address.country}</p>
              <p className="text-m">{address.phone}</p>
              <button className="text-md font-bold cursor-pointer hover:text-red-500 link-underline" onClick={() => handleDeleteAddress(address.id)}>
                Delete
              </button>
            </div>
          );
        })
        ) : (
          <div className="mb-4 text-center text-m">No Address Saved Yet...</div>
        )}
        <div className="mt-4 text-center">
          <Link href="/address/add" className="px-4 py-2 mb-4 font-bold text-white bg-black rounded hover:bg-red-500 focus:outline-none focus:shadow-outline">
            Add Address
          </Link>
        </div>
        <div className="mt-8 text-center">
          <Link href="/" className="text-md font-bold cursor-pointer hover:text-red-500 link-underline">
              Return to Home
          </Link>
        </div>
        <div className="flex justify-between items-center w-full pt-5">
          <Link href="/profile" className="text-md font-bold cursor-pointer hover:text-red-500 link-underline">
            Profile
          </Link>
          <Link href="/orders" className="text-md font-bold cursor-pointer hover:text-red-500 link-underline">
            Orders
          </Link>
          {user && (
            <div onClick={handleLogout} className="text-md font-bold cursor-pointer hover:text-red-500 link-underline">Logout</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingAddressPage;
