import SignUp from '../components/SignUp';
import Image from 'next/image';
import Head from 'next/head'
import Link from 'next/link';

export default function Signup() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center pt-10 pb-10 relative">
      <video autoPlay muted loop playsInline className="absolute z-0 w-auto min-w-full min-h-full max-w-none">
        <source src="https://cdn.shopify.com/videos/c/o/v/592a9b81849447938a3801c8dff21eb0.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        <Head>
          <title>Sign Up - Forensic Drone</title>
        </Head>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md z-10 relative">
        <h2 className="text-2xl font-bold text-black mb-4">Create Account</h2>
        <SignUp />
      </div>
    </div>
  );
}