import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useContext(AuthContext);

    const { data: isAdmin, isLoading, error } = useQuery({
        queryKey: [user?.email, "isAdmin"],
        enabled: !loading ,
         queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            // console.log(res.data);
            return res.data.admin;
        },
       
    });

    return [isAdmin, isLoading, error];
};

export default useAdmin;