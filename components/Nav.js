import Link from 'next/link';
import Image from 'next/image';
import { useContext, useState, useRef, Fragment } from 'react';
import { CartContext } from '../context/shopContext';
import MiniCart from './MiniCart';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon, ShoppingCartIcon } from '@heroicons/react/outline'; // Import the shopping cart icon

export default function Nav() {
  const { cart, cartOpen, setCartOpen } = useContext(CartContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const cancelButtonRef = useRef(null);

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
            width={150}
            height={100}
          />
        </Link>
        <nav className="hidden lg:flex justify-center space-x-7">
          <Link href="/products" passHref className="text-md font-bold cursor-pointer">Products</Link>
        </nav>
        <div className="relative">
          <button
            type="button"
            className="group -m-2 p-2 flex items-center"
            onClick={() => setCartOpen(!cartOpen)}
          >
            <ShoppingCartIcon
              className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cartQuantity}</span>
            <span className="sr-only">items in cart, view bag</span>
          </button>
          {cartOpen && <MiniCart cart={cart} />}
        </div>
      </div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
      </Transition.Root>
    </header>
  );
}
