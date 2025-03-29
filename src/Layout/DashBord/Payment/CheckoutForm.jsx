import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { FaArrowRight, FaRegCheckCircle } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import useCarts from "../../../hooks/useCarts";
import Swal from "sweetalert2";


const CheckoutForm = () => {
  const [error  ,setError] = useState('');
  const [clientSecret,setClientSecret] = useState('');
  const [transactionId,setTransactionId] = useState('');  
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [cart,refetch] = useCarts();
    const {user} = useContext(AuthContext);
    const totalPrice = cart.reduce((total,item)=> total+item.price,0);
    console.log('totalPrice',totalPrice);
    useEffect(()=>{
     if(totalPrice>0){
      axiosSecure.post('/create-payment-intent',{price:totalPrice})
      .then(res=>{
        console.log(res.data.clientSecret)
      setClientSecret(res.data.clientSecret )
      })
      .catch(err=>console.log(err))
     }
    },[])

    const handleSubmit = async(event)=>{
        event.preventDefault();
      if(!stripe || !elements){
        return;
      }
      const card = elements.getElement(CardElement);
       if(card === null){
        return;
       }
       const {error,paymentMethod}= await stripe.createPaymentMethod({
        type: 'card',
        card,
       });
       if(error){
        console.log('payment error',error);
        setError(error.message);
       }else{
        console.log('paymentMethod',paymentMethod);
        setError('');
       }
// Confirm Payment-------------------
       const {paymentIntent ,error:confirmError}= await stripe.confirmCardPayment(clientSecret,{
       payment_method:{
        card:card,
        billing_details:{
          name:user?.name|| 'anonymous',
          email:user?.email|| 'anonymous'
       }
        }
       });
       if(confirmError){
        console.log('confirmError',confirmError);
        setError(confirmError.message);
        setTransactionId('');
       }
       else if(paymentIntent && paymentIntent.status ==='succeeded'){
        console.log('paymentIntent',paymentIntent);
        setError('');
        setTransactionId(paymentIntent.id);
        // send data to server ----------------
        const payment = {
          email: user?.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(),
          cartIds: cart.map(item=>item._id),
          menuIds:cart.map(item=>item.menuId),
          status:'Pending'


        }
        const res = await axiosSecure.post('/payment',payment)
        refetch();
        if(res?.data?.paymentResult.insertedId){
          Swal.fire({
            position: "Center",
            icon: "success",
            title: "Thank you for your payment",
            text: `Total Amount:${totalPrice} $`,
            showConfirmButton: false,
            timer: 1500
          });
        }

       }

    }
    return (
         <form onSubmit={handleSubmit} >
          {transactionId ? <div
           className=" flex gap-3 
           mb-8 justify-center 
           items-center 
           text-green-500 text-2xl  
           font-bold font-serif"><FaRegCheckCircle></FaRegCheckCircle>Payment Succeeded </div>
          :<div
           className="text-2xl text-center mb-8">Total Amount: <span className="text-green-500">{totalPrice}</span> $</div>}
                <CardElement
                options={{
                    style:{ 
                      base:{
                        fontSize:'16px',
                        color:'#0000ff',
                        '::placeholder':{
                          color:'#aab7c4',
                        
                            },
                           
                        },
                        invalid:{
                            color:'#9e2146'
                        }
                    }
                }}
                ></CardElement>
              <button className="mt-5 flex items-center justify-center text-sm font-bold gap-3 px-5 py-2 rounded-md hover:rounded-3xl bg-blue-500 hover:text-blue-900 text-black duration-100 hover:border-blue-500 hover:bg-transparent border-2 " type="submit" disabled={!stripe|| !clientSecret}>
              Pay <FaArrowRight></FaArrowRight></button>
              <div>
                {error && <div className="text-red-700 font-serif font-bold text-center">{'*'+error}</div>}
              </div>
              <div>
                {transactionId && <div className="text-green-700 font-serif font-bold text-center">Transaction id: {transactionId}</div>}
              </div>
            </form>   
    );
};

export default CheckoutForm;