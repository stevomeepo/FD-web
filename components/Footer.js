import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faTiktok } from '@fortawesome/free-brands-svg-icons';

const navigation = [
    { name: 'About', href: '#' },
    { name: 'Products', href: '/products' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Shipping & Returns', href: "/shipping-and-returns" },
    { name: 'Terms & Conditions', href: '/terms' }

  ]
  
export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center">
          {
            navigation.map((item, i) => (
              <div key={i} className="px-6 py-2">
                <a href={item.href} className="cursor-pointer text-gray-500 hover: footer-underline">
                  {item.name}
                </a>
              </div>
            ))
          }
        </nav>
        <div className="flex justify-center space-x-4 mt-8 text-gray-700">Follow Us!</div>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="https://www.facebook.com/Forensicdrone" className="text-gray-500 hover:text-blue-500" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a href="https://www.linkedin.com/company/forensic-drone/" className="text-gray-500 hover:text-blue-700" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
          <a href="https://www.tiktok.com/@forensic.drone?_t=8k8CLOz1Lv0&_r=1" className="text-gray-500 hover:text-black" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTiktok} size="2x" />
          </a>
        </div>
        <p className="text-xl mt-8 text-center text-gray-500"> Opening Hours</p>
        <p className="mt-3 text-center text-gray-500">Monday-Friday: 8am - 5pm</p>
        <p className="mt-8 text-center text-gray-400">&copy; 2023 Forensic Drone, All right reserved.</p>
      </div>
    </footer>
  );
}