import React, { useState } from 'react';
import { updateCustomer } from '../lib/customer';

const ProfileForm = ({ customerAccessToken, onSaveSuccess, initialData, onCancel }) => {
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
  const resetForm = () => {
    setFormData({
      firstName: initialData.firstName || '',
      lastName: initialData.lastName || '',
      email: initialData.email || '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-bold text-black mb-2">First Name</label>
          <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-bold text-black mb-2">Last Name</label>
          <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-8">
          <label htmlFor="email" className="block text-sm font-bold text-black mb-2">Email</label>
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-black hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Save Profile
          </button>
          <button type="button" onClick={onCancel} className="bg-black hover:bg-gray-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;