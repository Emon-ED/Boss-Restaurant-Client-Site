import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useCarts = () => {
    const axiosSecure = useAxiosSecure();
    const {user,loading} = useContext(AuthContext);
    
 const {refetch,data: cart=[]}=useQuery({
    queryKey:["cart",user?.email],
    enabled:!loading,
    queryFn: async ()=>{
    const res = await axiosSecure.get(`/carts?email=${user?.email}`)
    return res.data;
}
})
 return [cart, refetch];  
};

export default useCarts;