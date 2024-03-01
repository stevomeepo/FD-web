import React, { useState } from 'react';
import { updateCustomer } from '../lib/customer';
import { Switch } from '@headlessui/react'
import { useRouter } from 'next/router';

const ProfileForm = ({ customerAccessToken, onSaveSuccess, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: initialData.firstName || '',
    lastName: initialData.lastName || '',
    email: initialData.email || '',
    acceptsMarketing: initialData.acceptsMarketing || false,
  });
  const [isSavingLoading, setIsSavingLoading] = useState(false);
  const [isCancellingLoading, setIsCancellingLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = (e) => {
    setFormData(prev => ({ ...prev, acceptsMarketing: e }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSavingLoading(true);
    const response = await updateCustomer(customerAccessToken, formData);

    if (response.customerUserErrors && response.customerUserErrors.length > 0) {
      console.error("Error updating profile:", response.customerUserErrors[0].message);
      setIsSavingLoading(false);
    } else {
      onSaveSuccess();
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setIsCancellingLoading(true);
    router.push('/profile');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 border-2 border-gray-300 rounded-lg shadow-md bg-white">
        <div className="text-4xl font-bold text-black mb-4 text-center">
          Edit <span className='text-red-500'>Profile</span>
        </div>
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
          <div className='pb-3'>
            <label htmlFor="acceptsMarketing" className="block text-sm font-bold text-black mr-4 pb-2">Accept Marketing</label>
            <Switch
              checked={formData.acceptsMarketing}
              onChange={handleToggleChange}
              className={`${formData.acceptsMarketing ? 'bg-red-500' : 'bg-gray-300'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${formData.acceptsMarketing ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
          <div className="flex items-center justify-between">
          <button className="bg-black hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" disabled={isSavingLoading}>
              {isSavingLoading ? (
                <div className="spinner"></div>
              ) : (
                "Save Profile"
              )}
            </button>
            <button className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded border border-black focus:outline-none focus:shadow-outline" type="submit" onClick={handleCancel} disabled={isCancellingLoading}>
              {isCancellingLoading ? (
                <div className="spinner"></div>
              ) : (
                "Cancel"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;