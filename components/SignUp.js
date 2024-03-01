import React, { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthContext } from '../context/authContext';
import { Switch } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


export default function SignUpForm() {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [acceptsTerms, setAcceptsTerms] = useState(false);
  const [acceptsMarketing, setAcceptsMarketing] = useState(false);
  const [message, setMessage] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const router = useRouter();

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

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    if (!/(?=.*[A-Z])(?=.*[0-9])/.test(password)) {
      setMessage('Password must contain at least one uppercase letter and one number.');
      return;
    }

    if (!acceptsTerms) {
      setMessage('You must accept the terms and conditions to sign up.');
      return;
    }

    const customerInput = 
    { 
      email, 
      password, 
      firstName, 
      lastName, 
      acceptsMarketing 
    };

      try {
          const response = await fetch('/api/signup', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(customerInput),
          });
          const result = await response.json();

          if (result.errors) {
              setMessage('Error: ' + result.errors[0].message);
              setIsLoading(false);
          } else {
            setUser({ ...result.user, customerAccessToken: result.accessToken });
            setMessage('Signed up successfully!');
            setEmail('');
            setPassword('');
            setFirstName('');
            setLastName('');
            setConfirmPassword('');
            router.push('/');
          }
      } catch (error) {
          console.error('Sign up failed:', error);
          setMessage('Sign up failed. Please try again.');
          setIsLoading(false);
      }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="block text-black text-sm mb-4">
      Creating an account with our store enhances your shopping experience by enabling faster checkout, the ability to store shipping addresses, and the convenience of viewing and tracking your orders—all in one place.
      </div>
      <div className="mb-6">
        <label className="block text-black text-sm font-bold mb-2" htmlFor="firstName">
          First Name
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
      </div>
      <div className="mb-6">
        <label className="block text-black text-sm font-bold mb-2" htmlFor="lastName">
          Last Name
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      </div>
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
      </div>
      <div className="mb-6">
        <label className="block text-black text-sm font-bold mb-2" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline" id="confirmPassword" type="password" placeholder="********" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <p className={`transition duration-2000 text-red-500 font-bold ${message ? 'opacity-100' : 'opacity-0'}`}>{message}</p>
      </div>
      <div className="mb-6">
        <label className="flex items-center text-black text-sm font-bold mb-2" htmlFor="acceptsTerms">
          <Switch
            checked={acceptsTerms}
            onChange={setAcceptsTerms}
            className={`${acceptsTerms ? 'bg-red-500' : 'bg-gray-300'
            } relative inline-flex align-middle h-6 w-11 items-center rounded-full mr-4`}
          >
            <span
              className={`${acceptsTerms ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition flex justify-center items-center`}
            >
            {acceptsTerms && (
              <FontAwesomeIcon icon={faCheck} className="text-red-500" style={{ fontSize: '1em', width: '16px', height: '16px' }} />
            )}
            </span>
          </Switch>
          Accept Terms & Conditions
        </label>
      </div>
      <div className="mb-6">
        <label className="grid grid-cols-[auto,1fr] items-center gap-4 text-black text-sm font-bold mb-2" htmlFor="acceptsMarketing">
          <Switch
            checked={acceptsMarketing}
            onChange={setAcceptsMarketing}
            className={`${acceptsMarketing ? 'bg-red-500' : 'bg-gray-300'
            } relative h-6 w-11 rounded-full`}
          >
            <span
              className={`${acceptsMarketing ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition flex justify-center items-center`}
            >
              {acceptsMarketing && (
                <FontAwesomeIcon icon={faCheck} className="text-red-500" style={{ fontSize: '1em', width: '16px', height: '16px' }} />
              )}
            </span>
          </Switch>
          <span>I wish to keep updated on Forensic Drone products!</span>
        </label>
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
          objectFit="contain"
          className="mr-4"
        />
      </div>
      <p className="mt-4 text-center">Already have an account? <Link href="/login" className="text-red-500 font-bold hover:text-red-600 cursor-pointer">Login Here!</Link></p>
    </form>
  );
}