import { useState, Fragment } from 'react';
import Image from 'next/image';
import { PhoneIcon, LocationMarkerIcon } from '@heroicons/react/outline';
import Head from 'next/head'
import { Dialog, Transition } from '@headlessui/react';
import '../styles/global.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        setError('Please fill in all fields.');
        return;
      }

      setIsSubmitting(true);

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
        setIsModalOpen(true);
      } catch (error) {
        console.error(error);
        setError('Failed to submit form.');
      } finally {
        setIsSubmitting(false);
      }
    };

  return (
    <div className="bg-black-600 min-h-screen flex items-center justify-center">
      <Head>
        <title>Contact Us - Forensic Drone</title>
      </Head>
      <div className="container mx-auto p-4 flex flex-wrap items-start">
        <div className="w-full lg:w-1/2 p-4">
          <h2 className="text-4xl font-bold text-black mb-4">CONTACT <span className='text-red-500'>US</span></h2>
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
              <p></p>
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
                <div className="flex justify-center">
                <button type="submit" className="contact-submit-button bg-black hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center" onClick={handleSubmit}>
                  <div className={`svg-wrapper ${isSubmitting ? 'icon-animating' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="fill-current">
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                    </svg>
                  </div>
                  <span className={`submit-text ${isSubmitting ? 'submit-text-animating' : ''}`}>Submit</span>
                </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 backdrop-blur-md" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all animate-circular-shake">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    ✅ Thanks for your inquiry!
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your message has been successfully submitted. We will get back to you as soon as possible.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}