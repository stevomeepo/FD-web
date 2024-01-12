import React from 'react'
import Nav from './Nav'
import Footer from './Footer'
import Newsletter from './Newsletter'
import { Providers } from '../src/app/providers' 

export default function Layout({ children }) {
  return (
    <Providers>
      <div className="flex flex-col justify-between min-h-screen">
          <Nav />
          <main>
              {children}
          </main>
          <Newsletter />
          <Footer />
      </div>
    </Providers>
  )
}
