const navigation = [
    { name: 'About', href: '#' },
    { name: 'Products', href: '/products' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Shipping & Returns', href: "/shipping-and-returns" },
    { name: 'Terms and Conditions', href: '#' }

  ]
  
  export default function Footer() {
    return (
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav className="flex flex-wrap justify-center">
            {
              navigation.map((item, i) => (
                <div key={i} className="px-6 py-2">
                  <a href={item.href} className="text-gray-500 hover:text-gray-900">
                    {item.name}
                  </a>
                </div>
              ))
            }
          </nav>
          <p className="text-xl mt-8 text-center text-gray-500"> Opening Hours</p>
          <p className="mt-3 text-center text-gray-500">Monday-Friday: 8am - 5pm</p>
          <p className="mt-8 text-center text-gray-400">&copy; 2023 Forensic Drone, All right reserved.</p>
        </div>
      </footer>
    )
  }