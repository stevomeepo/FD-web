import ProductCard from './ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';


SwiperCore.use([Navigation]);

const RecommendedList = ({ products, current }) => {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
          Recommended Products
        </h2>
        <Swiper
          slidesPerView={4}
          spaceBetween={10}
          navigation={true}
          className="mySwiper"
        >
          {products.map(product => (
            product.node.id === current ? null : 
            <SwiperSlide key={product.node.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
export default RecommendedList