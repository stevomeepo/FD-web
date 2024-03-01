import Head from 'next/head'
import Login from '../components/Login'
import Image from 'next/image';

export default function LogIn() {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <Head>
            <title>Login - Forensic Drone</title>
          </Head>
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-black mb-6">Login</h2>
          <Login />
        </div>
      </div>
    );
  }