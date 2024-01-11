import SignUp from '../components/SignUp';
import Image from 'next/image';

export default function Signup() {
  return (
    <div className="min-h-screen bg-black-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-black mb-6">Sign Up</h2>
        <SignUp />
      </div>
    </div>
  );
}