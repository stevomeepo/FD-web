import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProfileForm from '../../components/ProfileForm';
import { AuthContext } from '../../context/authContext';
import { fetchUserProfile } from "../../lib/customer";

const EditProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [initialData, setInitialData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loadProfileData = async () => {
      if (user?.customerAccessToken) {
        const response = await fetchUserProfile(user.customerAccessToken);
        if (response.success) {
          setInitialData(response.data);
        } else {
          console.error(response.error);
        }
      }
    };

    loadProfileData();
  }, [user]);

  const handleSaveSuccess = () => {
    router.push('/profile');
  };

  if (!initialData) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <ProfileForm
      customerAccessToken={user.customerAccessToken}
      initialData={initialData}
      onSaveSuccess={handleSaveSuccess}
      onCancel={() => router.push('/profile')}
    />
  );
};

export default EditProfilePage;