import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';
import useMenu from '../../../hooks/useMenu';
import Card from './Card';



const CardsSweppers = () => {
    const [menu] = useMenu();
    const items = menu.filter(dish=>dish.category ===  'popular');
  
    return (
    
                <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    
                  },
                  768: {
                    slidesPerView:2,
                    
                  },
                  1024: {
                    slidesPerView: 3,
                    
                  },
                }}
                modules={[Pagination]}
                className="mySwiper text-white sm:w-full w-11/12 mx-auto"
              >
               {
                   items.map(item=><SwiperSlide key={item._id}><Card  item={item}></Card>  </SwiperSlide>)
                }
              </Swiper>


    );
};

export default CardsSweppers;