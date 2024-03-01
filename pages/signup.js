import SignUp from '../components/SignUp';
import Image from 'next/image';
import Head from 'next/head'
import Link from 'next/link';

export default function Signup() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center pt-10 pb-10">
        <Head>
          <title>Sign Up - Forensic Drone</title>
        </Head>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-black mb-4">Create Account</h2>
        <SignUp />
      </div>
    </div>
  );
}