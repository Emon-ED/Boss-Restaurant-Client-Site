import './Bistro.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from "react";

const BistroBoss = () => {
   // animation ---------------
    useEffect(()=>{
      AOS.init()
    },[])
    return (
        <div className='bistro bg-fixed lg:py-20 sm:w-full md:py-20' >
          <div className='bg-white text-black dark:bg-black dark:text-white dark:bg-opacity-40 bg-opacity-40 rounded lg:my-30 md:my-30 lg:mx-40 md:mx-40  shadow-xl' data-aos='zoom-in'>
          <div className='text-center p-20'>
            <h1 className="text-4xl  font-serif">Boss Restaurant</h1>
            <p className="text-sm">Savor a delightful culinary experience at Boss-Restaurant, where fresh ingredients meet creative flavors. Enjoy a warm, inviting atmosphere with exceptional service. From signature  dishes to indulgent desserts, every bite is crafted to tantalize your taste buds.</p>
            </div>
          </div>
        </div>
    );
};

export default BistroBoss;