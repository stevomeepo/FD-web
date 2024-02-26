import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';
import Head from 'next/head';

export default function Terms () {
    return (
        <div className="mx-auto w-full max-w-4xl p-2">
            <Head>
                <title>Terms & Conditions - Forensic Drone</title>
            </Head>
            <div className="mx-auto w-full max-w-4xl p-2 text-center">
                    <span className="text-4xl font-bold">Terms & Conditions</span>
                    <p className="pt-5">This privacy policy sets out how ForensicDrone uses and protects any information that you give ForensicDrone when you use this website. ForensicDrone is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement. ForensicDrone may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes.</p>
                    <p className="pb-5">Following are the terms and conditions.</p>
            </div>
            <Disclosure as="div" className="mt-2">
                {({ open }) => (
                    <>
                        <Disclosure.Button className="flex justify-between w-full px-4 py-2 font-medium text-left text-black bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75">
                            <span className="font-bold">What we collect</span>
                            <ChevronUpIcon
                                className={`${open ? 'transform rotate-180' : ''
                                    } w-5 h-5 text-red-500`}
                            />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-black">
                            <p className="pb-5">
                                ForensicDrone employs a rate-by-weight system to calculate shipping costs to your area. 
                                To provide you with better service, we collect and use information such as your name, contact details (including email address), demographic information (like postcode, preferences, and interests), and other data relevant to customer surveys and offers. This information aids in internal record keeping, improving our products and services, and tailoring our website to your interests. 
                                We may also send you promotional emails or contact you for market research purposes.
                            </p>
                            <p>
                                We prioritize the security of your information with appropriate physical, electronic, and managerial measures to prevent unauthorized access or disclosure. 
                                Our platform is now hosted on Shopify, a leading e-commerce platform that ensures the secure handling of your data, including secure servers and compliance with PCI-DSS standards for secure credit card processing.
                            </p>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
            <Disclosure as="div" className="mt-2">
                {({ open }) => (
                    <>
                        <Disclosure.Button className="flex justify-between w-full px-4 py-2 font-medium text-left text-black bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75">
                            <span className="font-bold">Experience</span>
                            <ChevronUpIcon
                                className={`${open ? 'transform rotate-180' : ''
                                    } w-5 h-5 text-red-500`}
                            />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-black">
                            <p>ForensicDrone takes great pride and joy in our highly skilled team. 
                Our team has over 20 years of experience in building technical and forensic systems. 
                We have proven our excellent contribution and knowledge to designing forensic hardware, software, and infrastructure.</p>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div>
    )
}