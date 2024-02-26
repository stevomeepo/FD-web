import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';
import Head from 'next/head';

export default function ShippingAndReturns() {
    return (
        <div className="w-full px-4 pt-16">
            <Head>
                <title>Shipping & Returns - Forensic Drone</title>
            </Head>
            <div className="mx-auto w-full max-w-4xl p-2">
                <div className="mx-auto w-full max-w-4xl p-2 text-center">
                    <span className="text-4xl font-bold">Shipping, Return & Refund Policy</span>
                    <p className="pt-5">Thank you for visiting and shopping at ForensicDrone.</p>
                    <p className="pb-5">Following are the terms and conditions that constitute our Shipping Policy.</p>
                </div>
                <Disclosure as="div" className="mt-2">
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-black bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75">
                                <span className="font-bold">Shipment Rate Calculations</span>
                                <ChevronUpIcon
                                    className={`${open ? 'transform rotate-180' : ''
                                        } w-5 h-5 text-red-500`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-black">
                                <p className="pb-5">ForensicDrone uses rate by weight system to calculate how much shipping would cost to ship to your area.
                                    After check out the website's system calculates your order weight.</p>
                                <p>There are three section of calculated shipment. First is the standard shipment of orders that weight less than 20lbs. 
                                    Each will vary of different price depending of the weight of the order - no more than $20. 
                                    Second is the semi heavy shipment for orders that weight more than 20lbs and less than 50. 
                                    Each will vary of different price depending of the weight of the order - no more than $50. 
                                    The last one is the heavy shipment for orders that weight more than 50lbs. Price will vary after that.</p>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                <Disclosure as="div" className="mt-2">
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-black bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75">
                                <span className="font-bold">Shipment Processing Time</span>
                                <ChevronUpIcon
                                    className={`${open ? 'transform rotate-180' : ''
                                        } w-5 h-5 text-red-500`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-black">
                                <p>All orders are processed within 2-5 business days. 
                                    Orders are not shipped or delivered on weekends or holidays. 
                                    If we are experiencing a high volume of orders, shipments may be delayed by a few days. 
                                    Please allow additional days in transit for delivery. 
                                    If there will be a significant delay in shipment of your order, we will contact you via email.</p>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                <Disclosure as="div" className="mt-2">
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-black bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75">
                                <span className="font-bold">Shipment to P.O. boxes or APO/FPO addresses</span>
                                <ChevronUpIcon
                                    className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-red-500`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-black">
                                <p>ForensicDrone ships to addresses within the U.S., U.S. Territories, and APO/FPO/DPO addresses. </p>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                <Disclosure as="div" className="mt-2">
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-black bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75">
                                <span className="font-bold">Shipment confirmation & Order tracking</span>
                                <ChevronUpIcon
                                    className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-red-500`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-black">
                                <p>You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.</p>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                <Disclosure as="div" className="mt-2">
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-black bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75">
                                <span className="font-bold">Customs, Duties and Taxes  </span>
                                <ChevronUpIcon
                                    className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-red-500`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-black">
                                <p>ForensicDrone is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).</p>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                <Disclosure as="div" className="mt-2">
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-black bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75">
                                <span className="font-bold">Damages</span>
                                <ChevronUpIcon
                                    className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-red-500`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-black">
                                <p>ForensicDrone is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim. Please save all packaging materials and damaged goods before filing a claim.</p>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                <Disclosure as="div" className="mt-2">
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-black bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75">
                                <span className="font-bold">International Shipping Policy</span>
                                <ChevronUpIcon
                                    className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-red-500`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-black">
                                <p>We currently do not ship outside the U.S.</p>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                <Disclosure as="div" className="mt-2">
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-black bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75">
                                <h1 className="font-bold">Return & Refund Policy</h1>
                                <ChevronUpIcon
                                    className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-red-500`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-black">
                                <p className="pb-5">You have 30 days to return an item from the date you received it. 
                                    To be eligible for a return, your item must be unused and in the same condition that you received it. 
                                    Your item must be in the original packaging. Your item needs to have the proof of purchase.</p>
                                <p>Once we receive your item, we will inspect it and notify you that we have received your returned item. 
                                    We will immediately notify you on the status of your refund after inspecting the item. 
                                    If your return is approved, we will initiate a refund to your credit card (or original method of payment). 
                                    You will receive the credit within a certain amount of days, depending on your card issuer's policies.</p>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>
        </div>
    );
}