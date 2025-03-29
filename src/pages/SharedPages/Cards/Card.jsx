import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCarts from "../../../hooks/useCarts";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from "react";


const Card = ({item}) => {
 // animation ---------------
 useEffect(()=>{
  AOS.init()
},[])

    const {image,name,recipe,price,_id}=item;
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure()
    const [, refetch]= useCarts();
    const handleAddCard = () => {
       
        if(user && user.email){
         
          const addItem ={
            menuId:_id,
            email: user.email,
            name,image,price
          }
          axiosSecure.post('/cart',addItem)
          .then(res=>{
            console.log(res.data);
            if(res.data.insertedId){
              Swal.fire({
                position: "top-end",
                background: "#f1f1f1",
                title: `${name} Added to Cart!`,
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              });
              refetch();
            }
          
          })
        }
        else{
          Swal.fire({
            title: "Please Login !",
            text: "You need to login to add items to cart",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Want to Login?",
          }).then((result) => {
            if (result.isConfirmed) {
             navigate('/login',{state:{from:location}});            }
          });
        }
    };
    return (
        <div data-aos='zoom-in-up' className="lg:my-8 md:my-4 my-2 w-60 md:w-72 lg:w-80 card card-compact dark:bg-slate-900 dark:text-white bg-slate-200 text-black mx-auto  shadow-lg shadow-black dark:shadow-white">
        <figure className="h-[200px]">
          <img loading="lazy" className="w-full "
            src={image}
            alt="Items" />
        </figure>
        <p className="absolute right-0 mr-3 mt-3 px-2 rounded bg-slate-900 text-white">{price} $</p>
        <div className="card-body flex flex-col items-center space-y-4">
          <h2 className="card-title ">{name}</h2>
          <p>{recipe}</p>
          
          <div className="card-actions justify-center">
          <div className='my-4 text-center'>
        <button onClick={handleAddCard} className="uppercase btn btn-outline rounded-xl text-orange-700 bg-white shadow-lg border-b-4 border-orange-700 dark:border-orange-700">Add to Card</button>
    </div>
          </div>
        </div>
      </div>
    );
};

export default Card;