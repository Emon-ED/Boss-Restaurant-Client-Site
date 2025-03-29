import Slider from "../../Layout/banner/Slider";
import SectionTitles from "../SharedPages/sectiontitles/SectionTitles";
import OderListSweiper from "./swiper/OderListSweiper";
import Chef from "./ChefRecommad/Chef";
import Check from "./CheckIt/Check";
import Review from "./Reviews/Review";
import { Helmet } from "react-helmet-async";
import useMenu from "../../hooks/useMenu";
import BistroBoss from "./bistroBoss/BistroBoss";
import MenuItem from "../SharedPages/Menuitems/MenuItem";
import { Link } from "react-router-dom";
import MenuButton from "../SharedPages/MenuButtons/MenuButton";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from "react";

const Home = () => {
  const[items] = useMenu();
  const popular = items.filter(item=> item.category=== 'popular' )
  // animation ---------------
  useEffect(()=>{
    AOS.init()
  },[])
    return (
        <div>
               <Helmet>
                  <title>Boss | Home</title>
              
                </Helmet>
          <Slider ></Slider>
         <SectionTitles heading={'oder list'} subHeading={'From 11.00am to 10.00pm'}></SectionTitles>
          <OderListSweiper></OderListSweiper>
        <BistroBoss ></BistroBoss>
        <SectionTitles heading={'for our menu'} subHeading={'Check it out'}></SectionTitles>
        <div className="lg:w-11/12 mx-auto">
            
            <div data-aos='fade-up' className="grid md:grid-cols-2 gap-10 my-10">
               {
                       popular.map(item=><MenuItem key={item._id} item={item}></MenuItem>)
               }
            </div>
            <Link to={'order/salad'}><MenuButton menuButton={'Order Food'}></MenuButton></Link>
           </div>
        <div className="bg-black text-center">
          <h1 className="text-5xl text-white py-16">Call us: +123456789</h1>
        </div>
        <Chef></Chef>
        <Check></Check>
        <Review></Review>
        </div>
    );
};

export default Home;