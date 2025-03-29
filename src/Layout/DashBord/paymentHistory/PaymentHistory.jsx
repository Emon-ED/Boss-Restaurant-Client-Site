import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const PaymentHistory = () => {
    const{user}= useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const {data:payments=[]} = useQuery({
        queryKey:['payment'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/payment/${user.email}`)
            return res.data
        }
    })
    console.log(payments)
    return (
        <div className="h-full">
          <h2 className="font-serif text-center text-2xl">Total Payments: {payments.length}</h2>
          <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Email</th>
        <th>Price</th>
        <th>Transaction Id</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        payments.map((list,index)=>
            <tr key={index}>
        <th>{index+1}</th>
        <td>{list.email}</td>
        <td>{list.price}</td>
        <td>{list.transactionId}</td>
        <td>{list.status}</td>
      </tr>)
      }
     
    </tbody>
  </table>
</div>
        </div>
    );
};

export default PaymentHistory;