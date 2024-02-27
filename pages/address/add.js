import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import AddressForm from '../../components/AddressForm';
import { AuthContext } from '../../context/authContext';

const AddAddressPage = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const handleSaveSuccess = () => {
    router.push('/address');
  };

  if (!user) {
    useEffect(() => {
      router.push('/login');
    }, []);
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Address</h1>
      <AddressForm
        customerAccessToken={user.customerAccessToken}
        onSaveSuccess={handleSaveSuccess}
        onCancel={() => router.push('/address')}
      />
    </div>
  );
};

export default AddAddressPage;