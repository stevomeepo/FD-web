import React from 'react';
import { Helmet } from 'react-helmet';
import Nav from './Nav';
import Footer from './Footer';
import Newsletter from './Newsletter';
import Loader from './Loader'; 
import { Providers } from '../src/app/providers';

export default function Layout({ children, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }
  
  return (
    <Providers>
      <Helmet>
        <link rel="icon" type="image/svg+xml" href="/forensic-drone.svg" />
      </Helmet>
      <div className="flex flex-col justify-between min-h-screen">
        <Nav />
        <main className="flex-grow mb-8">
          {children}
        </main>
        <Newsletter />
        <Footer />
      </div>
    </Providers>
  );
}