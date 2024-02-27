import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuthState = async () => {
      setIsLoading(true);
      const res = await fetch('/api/auth');
      const data = await res.json();
      console.log("Loaded data:", data);
      if (data.isAuthenticated) {
        setUser({ ...data.user, customerAccessToken: data.accessToken });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };
    fetchAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
