import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const axiosSecure = axios.create({
    baseURL:'https://boss-server-weld.vercel.app'
})
const useAxiosSecure = () => {
    const navigate =useNavigate();
    const {logOut} = useContext(AuthContext);
  
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`;
        return config;
    },
    function(err){
        return Promise.reject(err);
    })


// interceptors 401 and 403 status ----------
    axiosSecure.interceptors.response.use(function(response){
        return response;
    },async(err)=>{
        const status = err.response.status;
        
        if(status===401 || status ===403){
            await logOut();
            navigate('/login')
        }
        return Promise.reject(err);
    })

    return axiosSecure;
};

export default useAxiosSecure;
