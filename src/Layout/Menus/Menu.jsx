import { Helmet } from 'react-helmet-async';
import Cover from '../../pages/SharedPages/Covers/Cover';
import coverImg from '../../assets/menu/banner3.jpg';
import dessertImg from '../../assets/menu/dessert-bg.jpeg';
import pizzaImg from '../../assets/menu/pizza-bg.jpg';
import saladImg from '../../assets/menu/salad-bg.jpg';
import soupImg from '../../assets/menu/soup-bg.jpg';
import PopularMenu from '../../pages/home/Popularmenu/PopularMenu';
import SectionTitles from '../../pages/SharedPages/sectiontitles/SectionTitles';
import useMenu from '../../hooks/useMenu';
import MenuItem from '../../pages/SharedPages/Menuitems/MenuItem';

const Menu = () => {
     const[items] = useMenu();
    const today = items.filter(item=> item.category=== 'offered' )
    const dessert = items.filter(item=> item.category=== 'dessert' )
    const pizza = items.filter(item=> item.category=== 'pizza' )
    const salad = items.filter(item=> item.category=== 'salad' )
    const soup = items.filter(item=> item.category=== 'soup' )
    return (
        <div>
              <Helmet>
        <title>Boss | Menu</title>
    
      </Helmet>
      <Cover img={coverImg} head={'Our menu'} subHead={'Would you like to try a dish?'}></Cover>
      <SectionTitles heading={"today's offer"} subHeading={"Don't Miss"}></SectionTitles>
      <div className="lg:w-11/12 mx-auto">
            
            <div className="grid md:grid-cols-2 gap-10 my-10">
               {
                       today.map(item=><MenuItem key={item._id} item={item}></MenuItem>)
               }
            </div>
           </div>
       
      <Cover img={dessertImg} head={'dessert'} subHead={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}></Cover>
      <PopularMenu listData={dessert}></PopularMenu>
    
      <Cover img={pizzaImg} head={'pizza'} subHead={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}></Cover>
      <PopularMenu listData={pizza}></PopularMenu>
      
      <Cover img={saladImg} head={'salad'} subHead={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}></Cover>
      <PopularMenu listData={salad}></PopularMenu>
      
      <Cover img={soupImg} head={'soup'} subHead={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}></Cover>
      <PopularMenu listData={soup}></PopularMenu>
      
        </div>
    );
};

export default Menu;