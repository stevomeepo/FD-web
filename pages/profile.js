import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { fetchUserProfile, updateCustomerProfile } from '../lib/customer';

export default function ProfilePage() {
  const { user, setUser, isLoading } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    country: "United States",
    zip:'',
    addressId:'',
  });
  const [editing, setEditing] = useState(false);
  const [originalProfile, setOriginalProfile] = useState({});

  useEffect(() => {
    if (user) {
        setProfile({ ...profile, ...user });
        setOriginalProfile({ ...profile, ...user });
      }
  }, [user]);

  if (isLoading) {
    return <div>Loading user information...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevState => ({
        ...prevState,
        [name]: value
    }));
  };
  
  const handleSave = async (e) => {
    e.preventDefault();
    console.log("Attempting to save with accessToken:", user?.customerAccessToken);
    if (!user || !user.customerAccessToken) {
      console.error("No user or customerAccessToken found");
      return;
    }
    const customerInput = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
    };
    const addressInput = {
      addressId: profile.addressId,
      address1: profile.address1,
      address2: profile.address2,
      city: profile.city,
      country: profile.country,
      zip: profile.zip,
    };

    const response = await updateCustomerProfile(user.customerAccessToken, customerInput, addressInput);

    if (!response.success) {
      console.error("Failed to update profile:", response.errors);
    } else {
      console.log("Profile updated successfully:", response);
      setUser((prevUser) => ({
          ...prevUser,
          ...response.customer,
      }));
      setEditing(false);
      setOriginalProfile({ ...profile, ...response.customer });
    }
  };
  
  const handleCancel = () => {
    setProfile(originalProfile);
    setEditing(false);
  };
  
  const handleEdit = (e) => {
    e.preventDefault();
    setEditing(true);
  };

  return (
    isLoading ? (
      <div>Loading user information...</div>
    ) : (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
        <div className="container mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-300 max-w-2xl">
          <h2 className="text-4xl font-bold text-black mb-4">PROFILE <span className='text-red-500'>DETAILS</span></h2>
          <form className="text-black" onSubmit={handleSave}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="firstName">
                  First Name
                </label>
                {editing ? (
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                  />
                ) : (
                  <span className="text-black">{profile.firstName}</span>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="lastName">
                  Last Name
                </label>
                {editing ? (
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                  />
                ) : (
                  <span className="text-black">{profile.lastName}</span>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                {editing ? (
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                  />
                ) : (
                  <span className="text-black">{profile.email}</span>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="phoneNumber">
                  Phone Number
                </label>
                {editing ? (
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    value={profile.phoneNumber}
                    onChange={handleChange}
                  />
                ) : (
                  <span className="text-black">{profile.phoneNumber}</span>
                )}
              </div>
            </div>
              <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="address1">
                  Street Address 1
                </label>
                {editing ? (
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    id="address1"
                    type="text"
                    name="address1"
                    value={profile.address1}
                    onChange={handleChange}
                  />
                ) : (
                  <span className="text-black">{profile.address1}</span>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="address2">
                  Street Address 2
                </label>
                {editing ? (
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    id="address2"
                    type="text"
                    name="address2"
                    value={profile.address2}
                    onChange={handleChange}
                  />
                ) : (
                  <span className="text-black">{profile.address2}</span>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="city">
                  City
                </label>
                {editing ? (
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    id="city"
                    type="text"
                    name="city"
                    value={profile.city}
                    onChange={handleChange}
                  />
                ) : (
                  <span className="text-black">{profile.city}</span>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="province">
                  State
                </label>
                {editing ? (
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    id="province"
                    name="province"
                    value={profile.province}
                    onChange={handleChange}
                  >
                    <option value="">Select a State</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </select>
                ) : (
                  <span className="text-black">{profile.province}</span>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="zip">
                  Zipcode
                </label>
                {editing ? (
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    id="zip"
                    type="text"
                    name="zip"
                    value={profile.zip}
                    onChange={handleChange}
                  />
                ) : (
                  <span className="text-black">{profile.zip}</span>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="country">
                  Country
                </label>
                {editing ? (
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    id="country"
                    name="country"
                    value={profile.country}
                    onChange={handleChange}
                  >
                    <option value="">Select a Country</option>
                    <option value="USA">United States</option>
                  </select>
                ) : (
                  <span className="text-black">{profile.country}</span>
                )}
              </div>
              <div className="flex justify-between mt-6">
                {editing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="bg-black hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-black hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="bg-black hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )
    );
  }