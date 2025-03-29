import SectionTitles from "../../SharedPages/sectiontitles/SectionTitles";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { FaQuoteLeft } from "react-icons/fa";
const Review = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://boss-server-weld.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);

  return (
    <section className="my-10">
      <SectionTitles
        heading={"TESTIMONIALS"}
        subHeading={"What Our Clients Say"}
      ></SectionTitles>
              
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
 
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="my-10 mx-24 flex flex-col items-center">
            <FaQuoteLeft className="text-4xl text-black text-center my-3" />
              <Rating
                style={{ maxWidth: 180 }}
                value={review.rating}
                readOnly
              />
              <p className="lg:py-5 md:py-5 sm:p-1">{review.details}</p>
              <h1 className="text-2xl text-orange-600">{review.name}</h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Review;
