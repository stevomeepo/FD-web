import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';
import Head from 'next/head';

export default function Terms () {
    return (
        <div className="w-full px-4 pt-16">
            <Head>
                <title>Terms & Conditions - Forensic Drone</title>
            </Head>
            <div className="mx-auto w-full max-w-4xl p-2 text-center">
                    <span className="text-4xl font-bold">Terms & Conditions</span>
                    <p className="pt-5">This privacy policy sets out how ForensicDrone uses and protects any information that you give ForensicDrone when you use this website. ForensicDrone is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement. ForensicDrone may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes.</p>
                    <p className="pb-5">Following are the terms and conditions.</p>
            </div>
            <p className="text-xl font-bold">What we collect</p>
                We may collect the following information:
                name
                contact information including email address
                demographic information such as postcode, preferences and interests
                other information relevant to customer surveys and/or offers
                What we do with the information we gather
                We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:
                Internal record keeping.
                We may use the information to improve our products and services.
                We may periodically send promotional emails about new products, special offers or other information which we think you may find interesting using the email address which you have provided.
                From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone, fax or mail. We may use the information to customize the website according to your interests.
                Security
                We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure, we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.
                Our company is hosted on the Wix.com platform. Wix.com provides us with the online platform that allows us to sell our products and services to you. Your data may be stored through Wix.com’s data storage, databases and the general Wix.com applications. They store your data on secure servers behind a firewall. 
                All direct payment gateways offered by Wix.com and used by our company adhere to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, MasterCard, American Express and Discover. PCI-DSS requirements help ensure the secure handling of credit card information by our store and its service providers.
            <h2 className="text-4xl font-bold pb-7">Experience</h2>
            <p>ForensicDrone takes great pride and joy in our highly skilled team. 
                Our team has over 20 years of experience in building technical and forensic systems. 
                We have proven our excellent contribution and knowledge to designing forensic hardware, software, and infrastructure.</p>
        </div>
    )
}