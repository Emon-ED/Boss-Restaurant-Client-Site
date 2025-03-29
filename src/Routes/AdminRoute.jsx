import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import { Navigate, useLocation } from "react-router-dom";


const AdminRoute = ({children}) => {
    const location = useLocation();
    const {user,loading}=useContext(AuthContext);
    const [isAdmin,isLoading]=useAdmin();
    if(loading || isLoading){
        return<h1 className="w-screen h-screen"><span className="loading loading-dots loading-lg"></span></h1>
    }
    if(user && isAdmin){
        return children;
    }

    return <Navigate to={'/'} state={{from:location}} replace></Navigate>
};

export default AdminRoute;