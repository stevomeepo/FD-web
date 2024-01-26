import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { UserContext } from '../context/userContext';
import Cookies from 'js-cookie';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const { setUser } = useContext(UserContext);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      setShowMessage(true);
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Password does not match. Please retry.");
      setShowMessage(true);
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d{2,}).{8,}$/;
    if (!passwordRegex.test(password)) {
      setMessage("Password must be at least 8 characters, include at least one uppercase letter, and include at least two numbers.");
      setShowMessage(true);
      return;
    }

    const response = await fetch('/api/SignUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setUser({ email: data.data.email, firstName: data.data.firstName });
      Cookies.set('user', JSON.stringify({ email: data.data.email, firstName: data.data.firstName }));
      setMessage("User created successfully!")
      setShowMessage(true);
      router.push("/");
    } else {
      const errorData = await response.json();
      console.log('Error submitting form:', errorData);
      setMessage(errorData.message);
      setShowMessage(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label className="block text-black text-sm font-bold mb-2" htmlFor="firstName">
          First Name
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </div>
      <div className="mb-6">
        <label className="block text-black text-sm font-bold mb-2" htmlFor="lastName">
          Last Name
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
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
        <p className={`transition duration-2000 text-red-500 font-bold ${showMessage ? 'opacity-100' : 'opacity-0'}`}>{message}</p>
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-black hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Sign Up
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
      <p className="mt-4 text-center">Already have an account? <Link href="/login" className="text-red-500 font-bold">Login Here!</Link></p>
    </form>
  );
}