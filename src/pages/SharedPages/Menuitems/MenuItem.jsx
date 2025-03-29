
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from "react";


const MenuItem = ({item}) => {
    const {image,name,price}=item;
 // animation ---------------
 useEffect(()=>{
    AOS.init()
  },[])
    return (
   
         <div data-aos='fade-up' className=" flex gap-3 shadow-lg shadow-black dark:shadow-white items-center rounded-2xl p-3">
        
          <img loading="lazy" style={{borderRadius:'0px 400px 400px 400px'}} className="lg:w-28 md:w-28 w-16 md:h-full lg:h-full h-16 " src={image} alt="" />
         
           <div >
            <h1 className="uppercase">{name}------------</h1>
          
           </div>
           <div className="text-yellow-500">
            ${price}
           </div>
           
        </div>
      
      
    );
};

export default MenuItem;