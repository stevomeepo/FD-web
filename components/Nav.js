import Link from 'next/link'
import Image from 'next/image'
import { useContext } from 'react'
import { CartContext } from '../context/shopContext'
import MiniCart from './MiniCart'

export default function Nav() {
  const { cart, cartOpen, setCartOpen } = useContext(CartContext)

  let cartQuantity = 0
  cart.map(item => {
    return (cartQuantity += item?.variantQuantity)
  })

  return (
    <header className="border-b sticky top-0 z-20 bg-white">
      <div className="flex items-center justify-between max-w-6xl pt-4 pb-2 px-4 mx-auto lg:max-w-screen-xl">
        <Link href="/" passHref className="cursor-pointer">
          <Image src="https://cdn.shopify.com/s/files/1/0852/4529/6941/files/Forensic-Drone-Logo.jpg?v=1704444978" 
            width={150}
            height={100}
          />
        </Link>
        <Link href="/products" passHref className="text-md font-bold cursor-pointer">Products</Link>
        <a 
          className="text-md font-bold cursor-pointer"
          onClick={() => setCartOpen(!cartOpen)}
          >
          Cart ({cartQuantity})
        </a>
        <MiniCart cart={cart} />
      </div>
    </header>
  )
}
