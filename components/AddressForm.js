import React, { useState } from 'react';
import { updateCustomerAddress, createCustomerAddress } from '../lib/customer';
import { US_STATES } from '../utils/states';

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
  
    const { id, ...addressInput } = address;
  
    if (id) {
      response = await updateCustomerAddress(customerAccessToken, id, addressInput);
    } else {
      response = await createCustomerAddress(customerAccessToken, addressInput);
    }
  
    if (response.success) {
      handleSaveSuccess();
    } else {
      console.error("Error updating address:", response.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        {successMessage && <div className="mb-4 text-green-500">{successMessage}</div>}
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-bold text-black mb-2">First Name</label>
          <input name="firstName" value={address.firstName} onChange={handleChange} placeholder="First Name" className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-bold text-black mb-2">Last Name</label>
          <input name="lastName" value={address.lastName} onChange={handleChange} placeholder="Last Name" className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="address1" className="block text-sm font-bold text-black mb-2">Address Line 1</label>
          <input name="address1" value={address.address1} onChange={handleChange} placeholder="Address Line 1" className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="address2" className="block text-sm font-bold text-black mb-2">Address Line 2</label>
          <input name="address2" value={address.address2} onChange={handleChange} placeholder="Address Line 2" className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-bold text-black mb-2">City</label>
          <input name="city" value={address.city} onChange={handleChange} placeholder="City" className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="province" className="block text-sm font-bold text-black mb-2">State/Province</label>
          <select
            name="province"
            value={address.province}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select a State</option>
            {US_STATES.map((state) => (
              <option key={state.abbreviation} value={state.abbreviation}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="block text-sm font-bold text-black mb-2">Country</label>
          <select 
          name="country" 
          value={address.country} 
          onChange={handleChange} 
          placeholder="Country" 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" 
          required
          >
            <option value="">Select a Country</option>
            <option value="US">United States</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="zip" className="block text-sm font-bold text-black mb-2">Zip/Postal Code</label>
          <input name="zip" value={address.zip} onChange={handleChange} placeholder="Zipcode" className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-bold text-black mb-2">Phone Number</label>
          <input name="phone" value={address.phone} onChange={handleChange} placeholder="Phone Number" className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-black hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Save Address
          </button>
          <button type="button" onClick={onCancel} className="bg-black hover:bg-gray-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddressForm;