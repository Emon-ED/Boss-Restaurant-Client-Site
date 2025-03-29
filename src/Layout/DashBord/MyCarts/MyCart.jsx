import React from "react";
import useCarts from "../../../hooks/useCarts";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const MyCart = () => {
  const [cart, refetch] = useCarts();
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const axiosSecure = useAxiosSecure();
  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/cart/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
              refetch();
          }
        });
      }
    });
  };
  return (
    <>
      <div
        className="flex w-full flex-col lg:justify-evenly
             items-center gap-2 mb-3"
      >
        <h2 className="text-xl uppercase font-serif font-bold">
          Total orders: {cart.length}{" "}
        </h2>
        <h2 className="text-xl uppercase font-serif font-bold">
          Total price: {total}{" "}
        </h2>
        {
          cart.length>0?<Link to={'/dashboard/payment'}>
          <h2 className="btn btn-primary uppercase font-serif font-bold">Pay </h2>
          </Link>
          :<button disabled className="btn btn-primary uppercase font-serif font-bold">Pay </button>
        }
      </div>
      <div className="overflow-x-auto w-full ">
        <table className="table w-full">
          {/* head */}
          <thead className="bg-orange-500 w-full text-black ">
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Price</th>

              <th></th>
            </tr>
          </thead>
          <tbody className="w-full">
            {cart.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={item.image} alt="items image" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.name}</div>
                    </div>
                  </div>
                </td>
                <td>{item.price}</td>
                <th>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-ghost text-red-600"
                  >
                    <FaTrash></FaTrash>
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </>
  );
};

export default MyCart;
