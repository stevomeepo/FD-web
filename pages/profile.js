import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import { useRouter } from 'next/router';

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
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
                setFormData(data.user);
            } else {
                console.error('Authentication check failed', response.status);
                // router.push('/login');
            }
        } catch (error) {
            console.error('Error during authentication check', error);
            // router.push('/login');
        }
    };

    if (!user) {
      checkUserAuthentication();
    } else {
      setFormData({ ...user });
    }
  }, [user, setUser, router]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setFormData({ ...user });
    setEditMode(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    // Update user data in your database
    // ...

    // Update user data in context
    setUser(formData);

    setEditMode(false);
  };

  if (!user) {
    // Render nothing or a loading spinner until we have user data
    return null;
  }

  return (
    <div>
      <h1>Profile</h1>
      <div>
        <label>First Name:</label>
        {editMode ? (
          <input
            type="text"
            name="firstName"
            value={formData.firstName || ''}
            onChange={handleChange}
          />
        ) : (
          <span>{user.firstName}</span>
        )}
      </div>
      <div>
        <label>Last Name:</label>
        {editMode ? (
          <input
            type="text"
            name="lastName"
            value={formData.lastName || ''}
            onChange={handleChange}
          />
        ) : (
          <span>{user.lastName}</span>
        )}
      </div>
      <div>
        <label>Email:</label>
        {editMode ? (
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
          />
        ) : (
          <span>{user.email}</span>
        )}
      </div>
      <div>
        <label>Phone Number:</label>
        {editMode ? (
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber || ''}
            onChange={handleChange}
          />
        ) : (
          <span>{user.phoneNumber}</span>
        )}
      </div>
      <div>
        <label>Shipping Address:</label>
        {editMode ? (
          <input
            type="text"
            name="shippingAddress"
            value={formData.shippingAddress || ''}
            onChange={handleChange}
          />
        ) : (
          <span>{user.shippingAddress}</span>
        )}
      </div>
      {editMode ? (
        <div>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <button onClick={handleEdit}>Edit</button>
      )}
    </div>
  );
}