import React, { useState } from 'react';
import { updateCustomerAddress, createCustomerAddress } from '../lib/customer';

const AddressForm = ({ customerAccessToken, onSaveSuccess, initialAddress, onCancel }) => {
  const [address, setAddress] = useState(initialAddress || {});
  const [successMessage, setSuccessMessage] = useState('');

  const handleSaveSuccess = () => {
    setAddress({});
    setSuccessMessage('Address saved successfully!');
    onSaveSuccess();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
  
    // Destructure the address state to separate the id and the rest of the address fields
    const { id, ...addressInput } = address;
  
    if (id) {
      // If an id is present, update the existing address
      response = await updateCustomerAddress(customerAccessToken, id, addressInput);
    } else {
      // If no id is present, create a new address
      response = await createCustomerAddress(customerAccessToken, addressInput);
    }
  
    if (response.success) {
      handleSaveSuccess();
    } else {
      console.error("Error updating address:", response.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {successMessage && <div>{successMessage}</div>}
      <input name="firstName" value={address.firstName} onChange={handleChange} placeholder="First Name" />
      <input name="lastName" value={address.lastName} onChange={handleChange} placeholder="Last Name" />
      <input name="address1" value={address.address1} onChange={handleChange} placeholder="Address Line 1" />
      <input name="address2" value={address.address2} onChange={handleChange} placeholder="Address Line 2" />
      <input name="city" value={address.city} onChange={handleChange} placeholder="City" />
      <input name="province" value={address.province} onChange={handleChange} placeholder="State" />
      <input name="country" value={address.country} onChange={handleChange} placeholder="Country" />
      <input name="zip" value={address.zip} onChange={handleChange} placeholder="Zipcode" />
      <input name="phone" value={address.phone} onChange={handleChange} placeholder="Phone Number" />
      <button type="submit">Save Address</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default AddressForm;