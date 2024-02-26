import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../context/authContext';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    if (user?.customerAccessToken) {
      router.push('/profile').then(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [user, router]);

  const handleSubmit = async (event) => {
      event.preventDefault();
      setIsLoading(true);

      try {
          const response = await fetch('/api/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password }),
          });
          const result = await response.json();

          if (result.error) {
              setMessage('Failed to login: ' + result.error);
          } else {
              setMessage('Login successful!');
              // Redirect or do something upon successful login
              setUser({ ...result.user, customerAccessToken: result.accessToken });
              router.push('/'); // Redirect to home or dashboard
          }
      } catch (error) {
          console.error('Login failed:', error);
          setMessage('Login failed. Please try again.');
      }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="mb-6">
        <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
        {message && <p className="text-red-500 font-bold">{message}</p>}
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-black hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" disabled={isLoading}>
          {isLoading ? (
            <div className="spinner"></div>
          ) : (
            "Create"
          )}
        </button>
        <Image 
          src="https://cdn.shopify.com/s/files/1/0852/4529/6941/files/Forensic-Drone-Logo.jpg?v=1704444978"
          alt="Forensic Drone Logo" 
          width={100}
          height={100}
          priority
          objectFit="cover"
          className="mr-4"
        />
      </div>
      <p className="mt-4 text-center">Don't have an account? <Link href="/signup" className="text-red-500 font-bold">Sign Up Here!</Link></p>
    </form>
  );
}