import Head from 'next/head'
import Login from '../components/Login'
import Image from 'next/image';

export default function LogIn() {
    return (
      <div className="min-h-screen bg-black-600 flex items-center justify-center">
        <video autoPlay muted loop playsInline className="absolute z-0 w-auto min-w-full min-h-full max-w-none pb-40">
          <source src="https://cdn.shopify.com/videos/c/o/v/592a9b81849447938a3801c8dff21eb0.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
          <Head>
            <title>Login - Forensic Drone</title>
          </Head>
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md z-10 relative">
          <h2 className="text-2xl font-bold text-black mb-6">Login</h2>
          <Login />
        </div>
      </div>
    );
  }