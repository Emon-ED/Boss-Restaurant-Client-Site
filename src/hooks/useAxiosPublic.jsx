import axios from "axios";

const axiosPublic = axios.create({
baseURL:'https://boss-server-weld.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;