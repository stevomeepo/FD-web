import React, { useState } from 'react';
import { updateCustomer } from '../lib/customer';

const ProfileForm = ({ customerAccessToken, onSaveSuccess, initialData }) => {
  const [formData, setFormData] = useState({
    firstName: initialData.firstName || '',
    lastName: initialData.lastName || '',
    email: initialData.email || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await updateCustomer(customerAccessToken, formData);

    if (response.customerUserErrors && response.customerUserErrors.length > 0) {
      console.error("Error updating profile:", response.customerUserErrors[0].message);
    } else {
      onSaveSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
      <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <button type="submit">Save Profile</button>
    </form>
  );
};

export default ProfileForm;