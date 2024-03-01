import Link from 'next/link';
import Image from 'next/image';
import { useContext, useState, useRef, useEffect } from 'react';
import { CartContext } from '../context/shopContext';
import MiniCart from './MiniCart';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/outline';
import { Menu } from '@headlessui/react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { AuthContext } from '../context/authContext';
import '../styles/hamburger.css';
import '../styles/homepage.css';
import Loader from './Loader';


export default function Nav() {
  const { cart, cartOpen, setCartOpen } = useContext(CartContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  let cartQuantity = 0;
  cart.map(item => {
    return (cartQuantity += item?.variantQuantity);
  });

  useEffect(() => {
    const fetchAuthState = async () => {
      const res = await fetch('/api/auth', { credentials: 'include' });
      const data = await res.json();
      if (data.isAuthenticated) {
        setUser({ ...data.user, customerAccessToken: data.accessToken });
      } else {
        setUser(null);
      }
    };
  
    fetchAuthState();
  }, [user]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
  
      if (data.success) {
        setUser(null);
        Cookies.remove('accessToken');
        setSidebarOpen(false);
        router.push('/');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
    setIsLoggingOut(false);
  };

  if (isLoggingOut) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} 
              className={`hamburger hamburger--spin ${sidebarOpen ? 'is-active' : ''}`} 
              type="button" 
              style={{ zIndex: 50, transform: 'scale(0.8)' }}>
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
            <div className="logo">
              <Link href="/" passHref className="cursor-pointer">
                <Image src="https://cdn.shopify.com/s/files/1/0852/4529/6941/files/Forensic-Drone-Logo.jpg?v=1704444978"
                  alt="Forensic Drone Logo" 
                  width={120}
                  height={120}
                  priority
                  objectFit="contain"
                />
              </Link>
            </div>
          </div>
          <nav className="hidden lg:flex justify-center space-x-7">
            <Link href="/" passHref className="text-md font-bold cursor-pointer hover:text-red-500 link-underline">Home</Link>
            <Link href="/products" passHref className="text-md font-bold cursor-pointer hover:text-red-500 link-underline">Products</Link>
            <Link href="/training" passHref className="text-md font-bold cursor-pointer hover:text-red-500 link-underline">Training</Link>
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
                    {!user && (
                      <>
                        <Menu.Item>
                          {({ active}) => (
                            <Link
                              href="/signup"
                              passHref
                              className={`${
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                              Sign Up
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/login"
                              passHref
                              className={`${
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                              Login
                            </Link>
                          )}
                        </Menu.Item>
                      </>
                    )}
                    {user && (
                      <>
                        <div className="px-4 py-2">
                          Welcome, {user.firstName}!
                        </div>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/profile"
                                passHref
                                className={`${
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                              >
                                Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/orders"
                                passHref
                                className={`${
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                              >
                                Orders
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/address"
                                passHref
                                className={`${
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                              >
                                Addresses
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              disabled={isLoggingOut}
                              className={`${
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                              {isLoggingOut ? <div className="flex justify-center items-center min-h-screen"><Loader /></div> : 'Logout'}
                            </button>
                          )}
                        </Menu.Item>
                      </>
                    )}
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
      </header>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-20" onClick={() => setSidebarOpen(false)}></div>
      )}
      {sidebarOpen && (
        <div className="sidebar">
          <div className="flex flex-col h-full text-center">
            <nav className="flex flex-col space-y-4 flex-grow">
              <Link href="/" passHref className="text-md font-bold cursor-pointer hover:text-red-500" onClick={() => setSidebarOpen(false)}>Home</Link>
              <Link href="/products" passHref className="text-md font-bold cursor-pointer hover:text-red-500" onClick={() => setSidebarOpen(false)}>Products</Link>
              <Link href="/training" passHref className="text-md font-bold cursor-pointer hover:text-red-500" onClick={() => setSidebarOpen(false)}>Training</Link>
              {!user && (
                <>
                  <Link href="/login" passHref className="text-md font-bold cursor-pointer hover:text-red-500" onClick={() => setSidebarOpen(false)}>Login</Link>
                  <Link href="/signup" passHref className="text-md font-bold cursor-pointer hover:text-red-500" onClick={() => setSidebarOpen(false)}>Signup</Link>
                </>
              )}
              {user && (
                <div onClick={handleLogout} className="text-md font-bold cursor-pointer hover:text-red-500">Logout</div>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
