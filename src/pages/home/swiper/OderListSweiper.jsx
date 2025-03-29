import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import img1 from'../../../assets/home/slide1.jpg'
import img2 from'../../../assets/home/slide2.jpg'
import img3 from'../../../assets/home/slide3.jpg'
import img4 from'../../../assets/home/slide4.jpg'
import img5 from'../../../assets/home/slide5.jpg'


// import required modules
import { Pagination } from 'swiper/modules';

const OderListSweiper = () => {
    return (
        <Swiper
        slidesPerView={2}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            
          },
          768: {
            slidesPerView: 3,
            
          },
          1024: {
            slidesPerView: 4,
            
          },
        }}
        modules={[Pagination]}
        className="mySwiper text-white text-border-black w-9/12 my-5"
      >
        <SwiperSlide><img loading="lazy" className="mx-auto shadow-xl" src={img1} alt="" /> 
        <h3 className='font-thin bg-opacity-50 font-serif opacity-80 uppercase text-3xl text-center -mt-12 mb-5'>Salad</h3>
        </SwiperSlide>
        <SwiperSlide><img loading="lazy" className="mx-auto shadow-xl" src={img2} alt="" /> 
       <h3 className='font-thin font-serif opacity-80 uppercase text-3xl text-center -mt-12 mb-5'>soups</h3>
        </SwiperSlide>
        <SwiperSlide><img loading="lazy" className="mx-auto shadow-xl" src={img3} alt="" /> 
       <h3 className='font-thin font-serif opacity-80 uppercase text-3xl text-center -mt-12 mb-5'>pizzas</h3>
        </SwiperSlide>
        <SwiperSlide><img loading="lazy" className="mx-auto shadow-xl" src={img4} alt="" /> 
       <h3 className='font-thin font-serif opacity-80 uppercase text-3xl text-center -mt-12 mb-5'>desserts</h3>
        </SwiperSlide>
        <SwiperSlide><img loading="lazy" className="mx-auto shadow-xl" src={img5} alt="" /> 
       <h3 className='font-thin font-serif opacity-80 uppercase text-3xl text-center -mt-12 mb-5'>Salad</h3>
        </SwiperSlide>
       
      </Swiper>
    );
};

export default OderListSweiper;