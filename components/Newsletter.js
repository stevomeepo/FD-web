import Airtable from 'airtable';
import React, { useState } from 'react';

const base = new Airtable({apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);

export default function Newsletter() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.elements[0].value;
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email.");
      setShowMessage(true);
      return;
    }
  
    // Check if email already exists in Airtable
    base('Email').select({
      filterByFormula: `{Email} = '${email}'`,
    }).firstPage((err, records) => {
      if (err) {
        console.error('Error fetching records:', err);
        setMessage('Error submitting form. Please try again.');
        setIsLoading(false);
        setShowMessage(true);
        return;
      }
      if (records.length > 0) {
        setMessage('This email is already subscribed.');
        setIsLoading(false);
        setShowMessage(true);
        return;
      }
  
      base('Email').create([
        {
          "fields": {
            "Email": email
          }
        }
      ], function(err, records) {
        if (err) {
          console.error('Error creating record:', err);
          setMessage('Error submitting form. Please try again.');
          setIsLoading(false);
          setShowMessage(true);
          return;
        }
        setMessage('Thanks for joining!');
        setIsLoading(false);
        setIsSubmitted(true);
        setShowMessage(true);
      });
    });
  };
  
    return (
      <div className="newsletter bg-gray-100 p-10 rounded-md mt-10">
        <h2 className="text-2xl font-bold mb-2">Newsletters</h2>
        <p className="text-gray-700 mb-5">Sign up to receive updates on new arrivals and special offers.</p>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="flex">
            <input input type="email" placeholder="Your email" className="flex-grow max-w-lg rounded-l-md p-2 border-t mr-0 border-b border-l border-gray-200 focus:outline-none focus:border-blue-500" />
            <button type="submit" className="px-8 rounded-r-md bg-black hover:hover:bg-red-500 text-white hover:text-white font-bold p-2 uppercase border-red border-t border-b border-r">Subscribe</button>
          </form>
        ) : null}
        <p className={`transition duration-2000 ${showMessage ? 'opacity-100' : 'opacity-0'}`}>{message}</p>
      </div>
    )
  }