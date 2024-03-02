import Link from 'next/link'
import Image from 'next/image'
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Hero() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 flex justify-center items-center relative overflow-hidden">
        <div class="flex flex-col items-center bg-gray-100 p-10 rounded-md mt-10">
          <div class="w-full md:w-500 bg-white border-2 border-gray-300 rounded-lg shadow-md">
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
              <button className="w-full bg-black hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Shop Now!
              </button>
            </Link>
          </div>
        </div>
      </section>
      <section>

      </section>
    </>
  )
}