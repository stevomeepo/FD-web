import React, { useState } from 'react';
import { updateCustomerAddress } from '../lib/customer';

const AddressForm = ({ customerAccessToken, onSaveSuccess, initialAddress }) => {
  const [address, setAddress] = useState(initialAddress || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addressId = address.id;
    const addressInput = {
        firstName: address.firstName,
        lastName: address.lastName,
        address1: address.address1,
        address2: address.address2,
        city: address.city,
        province: address.province,
        country: address.country,
        zip: address.zip,
        phone: address.phone,
    };
    const response = await updateCustomerAddress(customerAccessToken, addressId, addressInput);

    if (response.success) {
        onSaveSuccess();
    } else {
        console.error("Error updating address:", response.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" value={address.firstName} onChange={handleChange} placeholder="First Name" />
      <input name="lastName" value={address.lastName} onChange={handleChange} placeholder="Last Name" />
      <input name="address1" value={address.address1} onChange={handleChange} placeholder="Address Line 1" />
      <input name="address2" value={address.address2} onChange={handleChange} placeholder="Address Line 2" />
      <input name="city" value={address.city} onChange={handleChange} placeholder="City" />
      <input name="province" value={address.province} onChange={handleChange} placeholder="State" />
      <input name="country" value={address.country} onChange={handleChange} placeholder="Country" />
      <input name="zip" value={address.zip} onChange={handleChange} placeholder="Zipcode" />
      <button type="submit">Save Address</button>
    </form>
  );
};

export default AddressForm;