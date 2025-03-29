import { Link } from "react-router-dom";
import MenuItem from "../../SharedPages/Menuitems/MenuItem";
import MenuButton from "../../SharedPages/MenuButtons/MenuButton";

const PopularMenu = ({listData}) => {
return (
        <div className="lg:w-11/12 mx-auto">
            
             <div className="grid md:grid-cols-2 gap-10 my-10">
                {
                        listData.map(item=><MenuItem key={item._id} item={item}></MenuItem>)
                }
             </div>
             <Link to={`/order/${listData[0]?.category}`}><MenuButton menuButton={'oder your favorite food'}></MenuButton></Link>
        </div>
    );
};

export default PopularMenu;