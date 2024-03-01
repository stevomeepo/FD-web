import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../context/authContext';
import Image from 'next/image';
import Link from 'next/link';
import { recoverCustomerPassword } from '../lib/customer';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const router = useRouter();
  const { user, setUser } = useContext(AuthContext);

  const handlePasswordRecovery = async () => {
    setIsLoading(true);
    const result = await recoverCustomerPassword(resetEmail); // Use resetEmail here
    if (result.success) {
        setMessage('If an account exists for this email, a password reset email has been sent.');
        setShowResetModal(false); // Close the modal on success
    } else {
        setMessage(result.error || 'Failed to initiate password recovery.');
    }
    setIsLoading(false);
  };

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
              setIsLoading(false);
          } else {
              setMessage('Login successful!');
              setUser({ ...result.user, customerAccessToken: result.accessToken });
              router.push('/');
          }
      } catch (error) {
          console.error('Login failed:', error);
          setMessage('Login failed. Please try again.');
          setIsLoading(false);
      }
  };

  return (
    <>
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
              "Sign In"
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
        <a
          onClick={() => setShowResetModal(true)}
          className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-red-600 cursor-pointer"
        >
            Forgot Password?
        </a>
        <p className="mt-4 text-center">Don't have an account? <Link href="/signup" className="text-red-500 font-bold hover:text-red-600 cursor-pointer">Sign Up Here!</Link></p>
      </form>
      {showResetModal && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-4">Reset your password</h2>
                <p className="mb-4">We will send you an email to reset your password.</p>
                <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline mb-4"
                />
                <div className="flex justify-end space-x-2 mt-4">
                <button onClick={() => setShowResetModal(false)} className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded border border-black focus:outline-none focus:shadow-outline">Cancel</button>
                    <button onClick={handlePasswordRecovery} className="bg-black hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Send</button>
                </div>
            </div>
        </div>
      )}
    </>
  );
}