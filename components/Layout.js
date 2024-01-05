import React from 'react'
import Nav from './Nav'
import Footer from './Footer'
import Newsletter from './Newsletter'

export default function Layout({ children }) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
        <Nav />
        <main>
            {children}
        </main>
        <Newsletter />
        <Footer />
    </div>
  )
}
