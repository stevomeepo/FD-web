import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import { useRouter } from 'next/router';

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    addresses: [{
      address1: '',
      address2: '',
      city: '',
      province: '',
      country: 'United States',
      zip: ''
    }]
  });
  const router = useRouter();

  const fetchShopifyUserData = async (shopifyCustomerId) => {
    try {
      const response = await fetch(`/api/user/getCustomer?customerId=${shopifyCustomerId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Shopify user data:', error);
    }
  };

  useEffect(() => {
    const checkUserAuthentication = async () => {
        try {
            const response = await fetch('/api/auth/check', {
              method: 'GET',
              credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                const shopifyUserData = await fetchShopifyUserData(data.user.shopifyCustomerId);
                console.log(shopifyUserData);
                setFormData({
                  ...shopifyUserData,
                  addresses: shopifyUserData.addresses || [{
                    address1: '',
                    address2: '',
                    city: '',
                    province: '',
                    country: 'United States',
                    zip: ''
                  }]
                });
            } else {
                console.error('Authentication check failed', response.status);
                router.push('/login');
            }
        } catch (error) {
            console.error('Error during authentication check', error);
            router.push('/login');
        }
    };
    if (!user) {
      checkUserAuthentication();
    } else {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        addresses: user.addresses || [{
          address1: '',
          address2: '',
          city: '',
          province: '',
          country: 'United States',
          zip: ''
        }]
      });
    }
  }, [user, router]);
  const handleEdit = () => {
    setEditMode(true);
    console.log('Editing user:', user); // Debug: Log the user data being used
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phoneNumber: user.phoneNumber || '',
      addresses: user.addresses || [{ // Make sure this is the correct path
        address1: '',
        address2: '',
        city: '',
        province: '',
        country: 'United States',
        zip: ''
      }]
    });
  };
  const handleCancel = () => {
    setFormData({
      ...user,
      addresses: [{
        address1: user.addresses?.address1 || '',
        address2: user.addresses?.address2 || '',
        country: user.addresses?.country || 'United States',
        province: user.addresses?.province || '',
        city: user.addresses?.city || '',
        zip: user.addresses?.zipcode || ''
      }]
    });
    setEditMode(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData) {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        addresses: Array.isArray(prevState.addresses) ? prevState.addresses.map((address, index) => 
          index === 0 ? { ...address, [name]: value } : address
        ) : [{ [name]: value }]
      }));
    }
  };
  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/user/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          address: formData.addresses[0],
        }),
      });
  
      if (response.ok) {
        // If the update is successful, fetch the latest Shopify user data
        const shopifyUserData = await fetchShopifyUserData(user.shopifyCustomerId);
        if (shopifyUserData) {
          // Update the formData state with the new Shopify user data
          setFormData({
            ...formData,
            ...shopifyUserData,
            addresses: shopifyUserData.addresses || [],
          });
  
          // Update the UserContext with the new user data
          setUser(prevUser => ({
            ...prevUser,
            ...shopifyUserData,
          }));
        }
        setEditMode(false);
      } else {
        console.error('Failed to fetch updated data from Shopify');
      }
    } catch (error) {
      console.log(error)
      console.error('Failed to update user data');
    }
  };
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="container mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-300 max-w-2xl">
        <h2 className="text-4xl font-bold text-black mb-4">PROFILE <span className='text-red-500'>DETAILS</span></h2>
        <form className="text-black">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="firstName">
                First Name
              </label>
              {editMode ? (
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName || ''}
                  onChange={handleChange}
                />
              ) : (
                <span className="text-black">{user.firstName}</span>
              )}
            </div>
          {/* Last Name Field */}
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="lastName">
                Last Name
              </label>
              {editMode ? (
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName || ''}
                  onChange={handleChange}
                />
              ) : (
                <span className="text-black">{user.lastName}</span>
              )}
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              {editMode ? (
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                />
              ) : (
                <span className="text-black">{user.email}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="phoneNumber">
                Phone Number
              </label>
              {editMode ? (
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  id="phoneNumber"
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber || ''}
                  onChange={handleChange}
                />
              ) : (
                <span className="text-black">{user.phoneNumber}</span>
              )}
            </div>
          </div>
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="address1">
                Street Address 1
              </label>
              {editMode ? (
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  id="address1"
                  type="text"
                  name="address1"
                  value={formData.addresses && formData.addresses[0] ? formData.addresses[0].address1 : ''}
                  onChange={handleChange}
                />
              ) : (
                <span className="text-black">{formData.addresses && formData.addresses[0] ? formData.addresses[0].address1 : 'Not provided'}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="address2">
                Street Address 2
              </label>
              {editMode ? (
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  id="address2"
                  type="text"
                  name="address2"
                  value={formData.addresses && formData.addresses[0] ? formData.addresses[0].address2 : ''}
                  onChange={handleChange}
                />
              ) : (
                <span className="text-black">{formData.addresses && formData.addresses[0] ? formData.addresses[0].address2 : 'Not provided'}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="city">
                City
              </label>
              {editMode ? (
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  id="city"
                  type="text"
                  name="city"
                  value={formData.addresses && formData.addresses[0] ? formData.addresses[0].city : ''}
                  onChange={handleChange}
                />
              ) : (
                <span className="text-black">{formData.addresses && formData.addresses[0] ? formData.addresses[0].city : 'Not provided'}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="province">
                State
              </label>
              {editMode ? (
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  id="province"
                  name="province"
                  value={formData.addresses && formData.addresses[0] ? formData.addresses[0].province : ''}
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
                <span className="text-black">{formData.addresses && formData.addresses[0] ? formData.addresses[0].province : 'Not provided'}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="zip">
                Zipcode
              </label>
              {editMode ? (
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  id="zip"
                  type="text"
                  name="zip"
                  value={formData.addresses && formData.addresses[0] ? formData.addresses[0].zip : ''}
                  onChange={handleChange}
                />
              ) : (
                <span className="text-black">{formData.addresses && formData.addresses[0] ? formData.addresses[0].zip : 'Not provided'}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="country">
                Country
              </label>
              {editMode ? (
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  id="country"
                  name="country"
                  value={formData.addresses && formData.addresses[0] ? formData.addresses[0].country : ''}
                  onChange={handleChange}
                >
                  <option value="">Select a Country</option>
                  <option value="USA">United States</option>
                </select>
              ) : (
                <span className="text-black">{formData.addresses && formData.addresses[0] ? formData.addresses[0].country : 'Not provided'}</span>
              )}
            </div>
            <div className="flex justify-between mt-6">
              {editMode ? (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-black hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
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
  );
}
