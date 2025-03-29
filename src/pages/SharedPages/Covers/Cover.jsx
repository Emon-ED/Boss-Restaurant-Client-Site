import { Parallax } from "react-parallax";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from "react";


const Cover = ({img,head,subHead}) => {
   // animation ---------------
   useEffect(()=>{
    AOS.init()
  },[])
    return (
        <Parallax
        blur={{ min: -25, max: 25 }}
        bgImage={img}
        bgImageAlt="the menu"
        strength={0}
    >
              <div data-aos='zoom-in' className="hero w-screen h-[300px] md:h-[350px] lg:h-[600px]">
  <div  className="hero-overlay rounded bg-white text-black dark:bg-black dark:text-white lg:w-3/5 md:w-3/5 sm:w-full h-3/5 bg-opacity-40 dark:bg-opacity-40 "></div>
  <div className="hero-content text-center">
    <div className="max-w-md font-serif">
      <h1 className="mb-5 text-5xl uppercase font-bold">{head}</h1>
      <p className="mb-5 uppercase">
       {subHead}
      </p>
    </div>
  </div>
</div>
    </Parallax>

    );
};

export default Cover;