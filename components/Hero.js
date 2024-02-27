import Link from 'next/link'
import Image from 'next/image'
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Hero() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 flex justify-center items-center relative overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute z-0 w-auto min-w-full min-h-full max-w-none">
          <source src="https://cdn.shopify.com/videos/c/o/v/592a9b81849447938a3801c8dff21eb0.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="container px-4 md:px-6 z-10 relative">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-2 flex flex-col items-center">
              <div className="flex justify-center">
                <Image src="https://cdn.shopify.com/s/files/1/0852/4529/6941/files/Forensic-Drone-Logo.jpg?v=1704444978"
                  alt="Forensic Drone Logo" 
                  width={350}
                  height={350}
                  priority
                  objectFit="contain"
                />
              </div>
              <h1 className="text-3xl font-bold tracking-tighter text-black sm:text-4xl md:text-5xl lg:text-6xl">
                Discover the <span className="text-red-600">Future</span>
              </h1>
            </div>
            <div className="space-x-4">
              <Link
                className="bg-black hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                href="/about-us"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="h-1 bg-red-600 mt-6" />
        </div>
      </section>
    </>
  )
}