import ProductCard from './ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

const RecommendedList = ({ products, current }) => {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold text-black mb-8">
          Recommended <span className='text-red-500'>Products</span>
        </h2>
        <Swiper
          modules={[Navigation]}
          slidesPerView={4} // Default to 4 slides per view
          spaceBetween={24}
          loop={true}
          navigation
          className="mySwiper"
          style={{ '--swiper-navigation-color': '#000', '--swiper-pagination-color': '#000' }}
          breakpoints={{
            // When the viewport width is >= 640px (sm breakpoint in Tailwind)
            640: {
              slidesPerView: 4,
            },
            // For smaller viewports
            0: {
              slidesPerView: 2,
            },
          }}
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
export default RecommendedList;