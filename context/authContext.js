import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    const fetchAuthState = async () => {
      const res = await fetch('/api/auth');
      const data = await res.json();
      console.log('Data from /api/auth:', data);
      if (data.isAuthenticated) {
        setUser({ ...data.user, accessToken: data.accessToken });
        console.log('User set in AuthContext:', { ...data.user, accessToken: data.accessToken });
      } else {
        setUser(null);
      }
    };

    fetchAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
