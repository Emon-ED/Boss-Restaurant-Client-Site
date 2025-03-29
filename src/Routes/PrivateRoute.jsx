import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate,  useLocation } from "react-router-dom";


const PrivateRoute = ({children}) => {
    const location = useLocation();
    const {user,loading} = useContext(AuthContext);
    if(loading){
        return<h1 className="w-screen h-screen"><span className="loading loading-dots loading-lg"></span></h1>
    }

    if(user){
        return children;
    }
    return <Navigate to={'/login'} state={{from:location}} replace ></Navigate>
};

export default PrivateRoute;