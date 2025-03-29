import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../pages/SharedPages/NavBar/NavBar";
import Footer from "../pages/SharedPages/Footer/Footer";


const Main = () => {
    const location = useLocation();
    const noHeadFoot = location.pathname.includes('login')|| location.pathname.includes('signUp');
    return (
        <div>
            <NavBar></NavBar> 
            <Outlet></Outlet>
            {noHeadFoot||<Footer></Footer>}
        </div>
    );
};

export default Main;