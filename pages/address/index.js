import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { fetchUserProfile, deleteCustomerAddress } from "../../lib/customer";
import { useRouter } from 'next/router';
import Link from 'next/link';
import Cookies from 'js-cookie';
import AddressFormEdit from '../../components/AddressEdit';
import Loader from '../../components/Loader';

const ShippingAddressPage = () => {
  const { user, isLoading } = useContext(AuthContext);
  const [customerData, setCustomerData] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
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
  
    if (isLoading) {
      return;
    }
  
    if (!user) {
      router.push('/login');
      return;
    }
  
    getCustomerData();
  }, [user, isLoading, router]);

  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    };
  };

  const handleDeleteAddress = async (addressId) => {
    console.log(`Deleting address with ID: ${addressId}`);

    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Deleted address with ID: ${addressId}`);

    if (!user || !user.customerAccessToken) {
      console.error("User is not authenticated.");
      return;
    }

    setIsDeleting(true);
    const customerAccessToken = user.customerAccessToken;
    try {
      const response = await deleteCustomerAddress(customerAccessToken, addressId);
      if (response && response.success) {
        await getCustomerData();
      } else {
        console.error("Failed to delete address:", response.errors);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
    setIsDeleting(false);
  };

  const debouncedHandleDeleteAddress = debounce(handleDeleteAddress, 300);

  if (error) {
    return <div className="p-4 text-red-500 font-bold">Error: {error}</div>;
  }

  if (!customerData) {
    return <div className="flex justify-center items-center min-h-screen">
      <Loader />
      </div>
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
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

    const handleEdit = (address) => {
    setIsEditing(true);
    setEditingAddress(address);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingAddress(null);
  };

  const handleSaveSuccess = () => {
    setIsEditing(false);
    setEditingAddress(null);
    fetchUserProfile(user.customerAccessToken).then(response => {
      if (response.success) {
        setCustomerData(response.data);
      } else {
        setError(response.error);
      }
    });
  };

  const hasAddresses = customerData.addresses?.edges?.length > 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <div className="w-full max-w-md p-8 border-2 border-gray-300 rounded-lg shadow-md bg-white">
        <h1 className="text-4xl font-bold text-black mb-4 text-center">Shipping <span className="text-red-500">Address</span></h1>
        {!isEditing ? (
          <>
            {hasAddresses ? (
              customerData.addresses.edges.map(({ node: address }) => (
                <div key={address.id} className="mb-6">
                  <p className="text-xl font-bold text-black">{address.firstName} {address.lastName}</p>
                  <p className="text-m">{address.address1}</p>
                  <p className="text-m">{address.address2}</p>
                  <p className="text-m">{address.city}, {address.province} {address.zip}</p>
                  <p className="text-m">{address.country}</p>
                  <p className="text-m">{address.phone}</p>
                  <button 
                    className="text-md font-bold cursor-pointer hover:text-red-500" 
                    onClick={() => handleEdit(address)}
                  >
                    Edit
                  </button>
                  <span className="mx-2">|</span>
                  <button 
                    className="text-md font-bold cursor-pointer hover:text-red-500" 
                    onClick={() => debouncedHandleDeleteAddress(address.id)} 
                    disabled={isDeleting}
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <div className="mb-4 text-center text-m">No Address Saved Yet...</div>
            )}
            <div className="mt-4 text-center">
              <Link href="/address/add" className="px-4 py-2 mb-4 font-bold text-white bg-black rounded hover:bg-red-500 focus:outline-none focus:shadow-outline">
                Add Address
              </Link>
            </div>
          </>
        ) : (
          <AddressFormEdit
            customerAccessToken={user.customerAccessToken}
            initialAddress={editingAddress}
            onSaveSuccess={handleSaveSuccess}
            onCancel={handleCancelEdit}
          />
        )}
        <div className="mt-3 text-center">
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
            <div onClick={handleLogout} className="text-md font-bold cursor-pointer hover:text-red-500 link-underline">
              Logout
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingAddressPage;
