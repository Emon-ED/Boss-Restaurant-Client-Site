
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from "react";

const SectionTitles = ({heading,subHeading}) => {
     // animation ---------------
  useEffect(()=>{
    AOS.init()
  },[])
    return (
        <div data-aos='fade' className="mx-auto text-center bg-black bg-opacity-30 lg:w-4/12 md:w-4/12 sm:w-full mt-5 lg:mb-12 md:mb-12 font-serif">
            <p className="text-yellow-600 mb-2">--- {subHeading} ---</p>
            <h2 className="text-4xl dark:text-white text-black dark:bg-opacity-40 uppercase border-y-2 py-1  mb-5">{heading}</h2>
        </div>
    );
};

export default SectionTitles;