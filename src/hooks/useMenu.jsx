
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useMenu = ()=>{
    const axiosPublic = useAxiosPublic();
    // const [menu,setMenu]=useState([]);
    // const [loading,setLoad]=useState(true);
    
    // useEffect(()=>{
    //     fetch('https://boss-server-weld.vercel.app/menu')
    //     .then(res=>res.json())
    //     .then(data=>{
    //         setMenu(data);
    //         setLoad(false)
    //     })
    // },[])

  const {data: menu=[],isLoading:loading, refetch}=useQuery({
    queryKey:['menu'],
    queryFn:async()=>{
        const res =await axiosPublic.get('/menu');
        return res.data;
    }
  });

return [menu,loading, refetch]
};
export default useMenu;