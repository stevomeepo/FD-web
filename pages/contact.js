import { useState } from 'react';
import Image from 'next/image';
import { PhoneIcon, LocationMarkerIcon } from '@heroicons/react/outline';
import Head from 'next/head'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        setError('Please fill in all fields.');
        return;
      }

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Failed to submit form.');
    }
  };

  return (
    <div className="bg-black-600 min-h-screen flex items-center justify-center">
      <Head>
        <title>Contact Us - Forensic Drone</title>
      </Head>
      <div className="container mx-auto p-4 flex flex-wrap items-start">
        <div className="w-full lg:w-1/2 p-4">
          <h2 className="text-4xl font-bold text-black mb-4">CONTACT US</h2>
          <div className="text-black">
            <p className="flex items-center">
              <LocationMarkerIcon className="h-5 w-5 mr-2" />
              1200 N. Van Buren St. STE A, Anaheim, CA 92807
            </p>
            <p className="my-4 flex items-center">
              <PhoneIcon className="h-5 w-5 mr-2" />
              Call us (714)-238-8888
            </p>
          </div>
          <div className="mt-8">
            <Image src="https://cdn.shopify.com/s/files/1/0852/4529/6941/files/IMG_0649.jpg?v=1704874587" width={550} height={550}/>
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300">
            {submitted ? (
              <p>Thanks for your inquiry!</p>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input type="text" name="name" placeholder="Name" className="w-full p-2 border border-gray-300 rounded" onChange={handleChange} />
                </div>
                <div className="mb-4">
                  <input type="email" name="email" placeholder="Email" className="w-full p-2 border border-gray-300 rounded" onChange={handleChange} />
                </div>
                <div className="mb-4">
                  <input type="text" name="subject" placeholder="Subject" className="w-full p-2 border border-gray-300 rounded" onChange={handleChange} />
                </div>
                <div className="mb-4">
                  <textarea name="message" placeholder="Type your message here..." className="w-full p-2 border border-gray-300 rounded h-32" onChange={handleChange}></textarea>
                </div>
                {error && <p>{error}</p>}
                <button type="submit" className="w-full p-3 bg-black text-white rounded hover:bg-red-500">Submit</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}