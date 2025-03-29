import SectionTitles from '../../SharedPages/sectiontitles/SectionTitles';
import './Check.css';
import img from'../../../assets/home/featured.jpg';
import MenuButton from '../../SharedPages/MenuButtons/MenuButton';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from "react";
const Check = () => {
     // animation ---------------
  useEffect(()=>{
    AOS.init()
  },[]);
    return (
        <div className='check bg-fixed  font-semibold'>
           <div className='sm:text-black'> <SectionTitles heading={'from our menu'} subHeading={'Check it out'}></SectionTitles></div>
            <div className='md:flex justify-center items-center gap-10 lg:px-24 md:px-24 lg:pb-16 md:pb-16'>
                <div data-aos='fade-right'>
                    <img loading="lazy" src={img} alt="" />
                </div>
                <div data-aos='fade-left' className='bg-white text-black dark:bg-black dark:text-white dark:bg-opacity-40 bg-opacity-40 p-5 rounded-xl'>
               <h1 className='text-lg'> December 29, 2024 <br />
               WHERE CAN I GET SOME?</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                <MenuButton menuButton={'oder now'}></MenuButton>
                </div>
            </div>
        </div>
    );
};

export default Check;