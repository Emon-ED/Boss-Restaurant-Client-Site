import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: user = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user");
      return res.data;
    },
  });
  // Delete User --------------------------
  const handleDeleteUser = (user) => {
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
        axiosSecure.delete(`/user/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  // Make Role ------------------------
  const handleRole = (user) => {
    Swal.fire({
      title: "Are you sure to make Admin?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/user/admin/${user._id}`)
        .then((res) => {
          console.log(res.data)
          if (res.data.modifiedCount > 0) {
            refetch()
            Swal.fire({
              title: "Successful!",
              text: `${user.name} is Admin now !`,
              icon: "success",
            });
          }
        })
        .catch(err=>{
          Swal.fire({
            title: "Error!",
            text: "Something went wrong. Please try again.",
            icon: "error",
          });
        })
        
      }
    });
  };
  return (
    <>
      <div className="flex justify-between">
        <div className="text-2xl">All Users</div>
        <div className="text-2xl">Total Users: {user.length}</div>
      </div>
      <div className="divider divider-accent"></div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="dark:text-white text-black font-serif">
            <tr>
              <th>No</th>
              <th>User name</th>
              <th>User Email</th>
              <th>Role</th>
              <th>Delete User</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === 'admin' ? 'Admin':
                    <button
                    onClick={() => handleRole(user)}
                    className="text-black btn btn-outline hover:bg-orange-600 bg-orange-500 "
                  >
                    <FaUsers></FaUsers>{" "}
                  </button>}
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-outline hover:bg-red-400 text-red-600"
                  >
                    <RiDeleteBinLine></RiDeleteBinLine>{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllUsers;
