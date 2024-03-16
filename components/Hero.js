import React, { useEffect, useState } from 'react';
import { getFeaturedCollection } from '../lib/shopify';
import Link from 'next/link';
import Image from 'next/image';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Scrollbar } from 'swiper/modules';
import { useRouter } from 'next/router';

export default function Hero() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const router = useRouter();

  const handleProductClick = (handle) => {
    router.push(`/products/${handle}`);
  };

  useEffect(() => {
    const fetchFeaturedCollection = async () => {
      const featured = await getFeaturedCollection();
      setFeaturedProducts(featured.products.edges.map(edge => edge.node));
    };

    fetchFeaturedCollection();
  }, []);

  return (
    <>
      <section 
        className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 flex justify-center items-center relative overflow-hidden"
      >
        <div class="flex flex-col items-center bg-gray-100 p-10 rounded-md mt-10">
          <div 
            class="w-full md:w-500 bg-white border-2 border-gray-300 rounded-lg shadow-md"
            data-aos="fade-down"
            >
            <div class="container">
              <div class="content">
                <div class="content__container">
                  <p class="content__container__text">
                    DISCOVER
                  </p>
                
                  <ul class="content__container__list">
                    <li class="content__container__list__item">FORENSIC</li>
                    <li class="content__container__list__item">TRAINING</li>
                    <li class="content__container__list__item">TECH</li>
                    <li class="content__container__list__item">FARADAY</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-8">
            <Link href="/products" passHref>
              <button 
                className="w-full bg-black hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                data-aos="fade-up"
              >
                Shop Now!
              </button>
            </Link>
          </div>
        </div>
      </section>
      <section className="flex w-full items-center">
        <div className="w-1/2 flex flex-col justify-center items-start p-4">
          <h2 className="text-2xl font-bold mb-4">Your Product Title</h2>
          <p className="mb-4">Here's a short description of your product. Highlight the key features and benefits to entice viewers.</p>
          <a href="/your-link" className="inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors">Learn More</a>
        </div>
      </section>
      <section  
      >
        <div>
          <h2 
            className="text-4xl font-bold text-black p-8"
            data-aos="fade-left"
          >
              BEST SELLING <span className='text-red-500'>PRODUCTS</span></h2>
          <Swiper
            slidesPerView={3} // Number of slides per view
            spaceBetween={30} // Space between slides
            loop={true} // Enable infinite looping
            autoplay={{ // Enable and configure autoplay
              delay: 2000, // Delay between transitions (in ms)
              disableOnInteraction: false, // Continue autoplay when interacting with controls
            }}
            scrollbar={{
              hide: false, // Set to true if you want the scrollbar to hide automatically
            }}
            modules={[ Autoplay, Scrollbar]} // Add Autoplay to the modules
            className="mySwiper"
          >
            {featuredProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <div 
                  className='hover:text-red-500'
                  style={{ 
                    width: '100%', 
                    height: 'auto',
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    cursor: 'pointer' // Change cursor to indicate clickable
                  }}
                  onClick={() => handleProductClick(product.handle)} // Add click handler
                >
                  <img
                    src={product.images.edges[0].node.src}
                    alt={product.images.edges[0].node.altText}
                    style={{ maxWidth: '100%', height: '300px', objectFit: 'contain' }}
                  />
                  <p style={{ 
                    marginTop: '10px',
                    textAlign: 'center', 
                    width: '90%', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis', 
                    whiteSpace: 'nowrap'
                  }}>
                    <span className='font-bold'>{product.title}</span>
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  )
}