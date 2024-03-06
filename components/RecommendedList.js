import ProductCard from './ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

const RecommendedList = ({ products, current }) => {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
          Recommended Products
        </h2>
        <Swiper
          modules={[Navigation]}
          slidesPerView={4}
          spaceBetween={24}
          loop={true}
          style={{ '--swiper-navigation-color': '#000', '--swiper-pagination-color': '#000' }}
          navigation
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