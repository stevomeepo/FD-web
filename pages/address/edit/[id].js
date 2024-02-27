// pages/address/edit/[id].js
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AddressForm from '../../../components/AddressForm';
import { fetchAddressDetails } from '../../../lib/customer';
import { AuthContext } from '../../../context/authContext';

const EditAddressPage = () => {
  const [initialAddress, setInitialAddress] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const loadAddressDetails = async () => {
      if (user && user.customerAccessToken) {
        const details = await fetchAddressDetails(user.customerAccessToken, id);
        if (details.success) {
          setInitialAddress(details.address);
        } else {
          console.error(details.error);
        }
      }
    };

    if (id) {
      loadAddressDetails();
    }
  }, [id, user]);

  const handleSaveSuccess = () => {
    router.push('/address');
  };

  return (
    <div>
      {initialAddress ? (
        <AddressForm
          initialAddress={initialAddress}
          onSaveSuccess={handleSaveSuccess}
          customerAccessToken={user.customerAccessToken}
          onCancel={() => router.push('/address')}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditAddressPage;