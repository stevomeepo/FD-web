import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { fetchUserProfile } from "../lib/customer";
import ProfileForm from '../components/ProfileForm';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [customerData, setCustomerData] = useState(null);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState('');
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

  const handleCancelProfileEdit = () => {
    setShowProfileForm(false);
    window.scrollTo(0, 0);
  };

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

  if (!customerData) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-md p-8 border-2 border-gray-300 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-black mb-4 text-center">
          {user ? (
            <>
              <span className="text-red-500">{user.firstName}'s</span>
              <span className="text-black"> Profile</span>
            </>
          ) : (
            <span className="text-black">Profile</span>
          )}
        </h1>
        {!showProfileForm ? (
          <>
            <div className="mb-4">
              <p className="text-m font-bold text-black">First Name: <span className="font-normal">{customerData.firstName}</span></p>
            </div>
            <div className="mb-4">
              <p className="text-m font-bold text-black">Last Name: <span className="font-normal">{customerData.lastName}</span></p>
            </div>
            <div className="mb-4">
              <p className="text-m font-bold text-black">Email: <span className="font-normal">{customerData.email}</span></p>
            </div>
            <div>
            <p className="text-m font-bold text-black">Marketing Updates: <span className="font-normal">{customerData.acceptsMarketing ? '✅' : '❌'}</span></p>
            </div>
            <div className="flex justify-center w-full pt-7">
              <Link href="/edit-profile">
                <div className="px-4 py-2 mb-4 font-bold text-white bg-black rounded hover:bg-red-500 focus:outline-none focus:shadow-outline">
                  Edit Profile
                </div>
              </Link>
            </div>
          </>
        ) : (
          <ProfileForm
            customerAccessToken={user.customerAccessToken}
            initialData={customerData}
            onSaveSuccess={() => setShowProfileForm(false)}
            onCancel={handleCancelProfileEdit}
          />
        )}
        <p className="mt-2 text-center">
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

export default ProfilePage;