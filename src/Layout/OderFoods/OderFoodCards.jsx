import { useState } from "react";
import Card from "../../pages/SharedPages/Cards/Card";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

const OderFoodCards = ({ items }) => {
  // -----------------------------------------------------
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };
  // -----------------------------------------------------
  // paginaton start -------------------------------------
  const [page, setPage] = useState(1);

  const itemPerPage = 6;
  const totalPage = Math.ceil(items.length / itemPerPage);
  const currentPage = items.slice((page - 1) * itemPerPage, page * itemPerPage);
  const handlePageChange = (p) => {
    if (p >= 1 && p <= totalPage) {
      setPage(p);
    }
  };

  return (
    <Swiper pagination={pagination} modules={[Pagination]} className="mySwiper ">
      <SwiperSlide>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 m-5">
          {currentPage.map((item) => (
            <Card key={item._id} item={item}></Card>
          ))}
        </div>
      </SwiperSlide>

      {/* pagination */}
      <div className="flex my-4 justify-center ">
        <button
          className="btn font-bold dark:shadow-slate-500 shadow-black shadow-md btn-outline text-sky-600"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPage }, (_, i) => {
          return (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 m-2 duration-70 ${
                page === i + 1
                  ? "dark:shadow-blue-500 shadow-black shadow-md bg-gray-500 text-white rounded-full"
                  : "dark:shadow-slate-500 shadow-black shadow-md bg-blue-500 rounded-md  text-black"
              }`}
            >
              {i + 1}
            </button>
          );
        })}

        <button
          className="btn font-bold dark:shadow-slate-500 shadow-black shadow-md btn-outline text-sky-600"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPage}
        >
          Next{" "}
        </button>
      </div>
    </Swiper>
  );
};

export default OderFoodCards;
