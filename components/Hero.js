import Link from 'next/link'
import Image from 'next/image'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 flex justify-center items-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter text-black sm:text-4xl md:text-5xl lg:text-6xl">
              Discover the Future of Forensic Technology
            </h1>
          </div>
          <Carousel autoPlay infiniteLoop showStatus={false} showIndicators={false}>
            <div>
              <Image 
                src="https://cdn.shopify.com/s/files/1/0852/4529/6941/files/faraday_tent.png?width=150"
                alt="FD-FT8 Signal Armor Faraday Tent"
                width={150}
                height={150}
                objectFit="contain"
                />
              <p>FD-FT8 Signal Armor Faraday Tent</p>
            </div>
          </Carousel>
          <div className="space-x-4">
            <Link
              className="px-8 rounded-r-md bg-black hover:bg-red-500 text-white hover:text-white font-bold p-2 uppercase border-red border-t border-b border-r"
              href="/about-us"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="h-1 bg-red-600 mt-6" />
      </div>
    </section>
  )
}