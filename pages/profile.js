import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import { useRouter } from 'next/router';

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    streetAddress1: '',
    streetAddress2: '',
    country: 'United States',
    state: '',
    city: '',
    zipcode: ''
  });
  const router = useRouter();

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
                setFormData({
                  ...data.user,
                  streetAddress1: data.user.address?.streetAddress1 || '',
                  streetAddress2: data.user.address?.streetAddress2 || '',
                  country: data.user.address?.country || 'United States',
                  state: data.user.address?.state || '',
                  city: data.user.address?.city || '',
                  zipcode: data.user.address?.zipcode || ''
                });
            } else {
                console.error('Authentication check failed', response.status);
                // router.push('/login');
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
        ...formData,
        phoneNumber: user.phoneNumber,
        streetAddress1: user.address?.streetAddress1 || '',
        streetAddress2: user.address?.streetAddress2 || '',
        country: user.address?.country || 'United States',
        state: user.address?.state || '',
        city: user.address?.city || '',
        zipcode: user.address?.zipcode || ''
      });
    }
  }, [user, setUser, router]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setFormData({
      ...user,
      streetAddress1: user.address?.streetAddress1 || '',
      streetAddress2: user.address?.streetAddress2 || '',
      country: user.address?.country || 'United States',
      state: user.address?.state || '',
      city: user.address?.city || '',
      zipcode: user.address?.zipcode || ''
    });
    setEditMode(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/user/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          phoneNumber: formData.phoneNumber,
          streetAddress1: formData.streetAddress1,
          streetAddress2: formData.streetAddress2,
          country: formData.country,
          state: formData.state,
          city: formData.city,
          zipcode: formData.zipcode
        }),
      })

      if (response.ok) {
        setUser({ ...user, ...formData });
        setEditMode(false);
      } else {
        const errorData = await response.json();
        console.error('Error updating profile:', errorData.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!user) {
    // Render nothing or a loading spinner until we have user data
    return null;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="container mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-300 max-w-2xl">
        <h2 className="text-4xl font-bold text-black mb-4">PROFILE <span className='text-red-500'>DETAILS</span></h2>
        <form className="text-black">
          <div className="mb-4">
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
          <div className="mb-4">
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
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="streetAddress1">
                Street Address 1
              </label>
              {editMode ? (
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  id="streetAddress1"
                  type="text"
                  name="streetAddress1"
                  value={formData.streetAddress1 || ''}
                  onChange={handleChange}
                />
              ) : (
                <span className="text-black">{user.address?.streetAddress1}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="streetAddress1">
                Street Address 2
              </label>
              {editMode ? (
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  id="streetAddress2"
                  type="text"
                  name="streetAddress2"
                  value={formData.streetAddress2 || ''}
                  onChange={handleChange}
                />
              ) : (
                <span className="text-black">{user.address?.streetAddress2}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="streetAddress1">
                City
              </label>
              {editMode ? (
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  id="city"
                  type="text"
                  name="city"
                  value={formData.city || ''}
                  onChange={handleChange}
                />
              ) : (
                <span className="text-black">{user.address?.city}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="state">
                State
              </label>
              {editMode ? (
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  id="state"
                  name="state"
                  value={formData.state || ''}
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
                <span className="text-black">{user.address?.state}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="zipcode">
                Zipcode
              </label>
              {editMode ? (
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  id="zipcode"
                  type="text"
                  name="zipcode"
                  value={formData.zipcode || ''}
                  onChange={handleChange}
                />
              ) : (
                <span className="text-black">{user.address?.zipcode}</span>
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
                  value={formData.country || ''}
                  onChange={handleChange}
                >
                  <option value="">Select a Country</option>
                  <option value="USA">United States</option>
                </select>
              ) : (
                <span className="text-black">{user.address?.country}</span>
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
