import Link from 'next/link';
import Image from 'next/image';
import { useContext, useState, useRef } from 'react';
import { CartContext } from '../context/shopContext';
import MiniCart from './MiniCart';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/outline';
import { Menu } from '@headlessui/react';

export default function Nav() {
  const { cart, cartOpen, setCartOpen } = useContext(CartContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  let cartQuantity = 0;
  cart.map(item => {
    return (cartQuantity += item?.variantQuantity);
  });

  return (
    <header className="border-b sticky top-0 z-20 bg-white">
      <div className="flex items-center justify-between max-w-6xl pt-4 pb-2 px-4 mx-auto lg:max-w-screen-xl">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
          <Image src="https://cdn.shopify.com/s/files/1/0852/4529/6941/files/menu.png?v=1704455760" alt="Menu" width={20} height={20} />
        </button>
        <Link href="/" passHref className="cursor-pointer">
          <Image src="https://cdn.shopify.com/s/files/1/0852/4529/6941/files/Forensic-Drone-Logo.jpg?v=1704444978"
            alt="Forensic Drone Logo" 
            width={150}
            height={100}
            priority
            objectFit="contain"
          />
        </Link>
        <nav className="hidden lg:flex justify-center space-x-7">
          <Link href="/" passHref className="text-md font-bold cursor-pointer hover:text-red-500">Home</Link>
          <Link href="/products" passHref className="text-md font-bold cursor-pointer hover:text-red-500">Products</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-gray-500 focus:outline-none">
              <UserIcon className="h-6 w-6" aria-hidden="true" />
            </Menu.Button>
            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active}) => (
                      <Link
                        href="/signup"
                        passHref
                        className={`${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        Signup
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        <div className="relative flex items-center">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
            onClick={() => setCartOpen(!cartOpen)}
          >
            <ShoppingCartIcon
              className="h-6 w-6"
              aria-hidden="true"
            />
            <span className="ml-2 text-sm font-medium group-hover:text-gray-800">{cartQuantity}</span>
            <span className="sr-only">items in cart, view bag</span>
          </button>
          {cartOpen && <MiniCart cart={cart} />}
        </div>
      </div>
    </div>
      {sidebarOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col p-8">
          <button onClick={() => setSidebarOpen(false)} className="mb-4 self-end">
            <XIcon className="h-6 w-6" />
          </button>
          <nav className="flex flex-col space-y-4">
            <Link href="/" passHref className="text-md font-bold cursor-pointer" onClick={() => setSidebarOpen(false)}>Home</Link>
            <Link href="/products" passHref className="text-md font-bold cursor-pointer" onClick={() => setSidebarOpen(false)}>Products</Link>
            <Link href="/signup" passHref className="text-md font-bold cursor-pointer hover:text-red-500" onClick={() => setSidebarOpen(false)}>Signup</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
