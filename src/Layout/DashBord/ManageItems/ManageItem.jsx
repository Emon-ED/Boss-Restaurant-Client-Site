import React from 'react';
import useMenu from '../../../hooks/useMenu';
import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import SectionTitles from '../../../pages/SharedPages/sectiontitles/SectionTitles';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const ManageItem = () => {

    const [menu,loading,refetch]=useMenu();
    const axiosSecure = useAxiosSecure();
    // handle delete button ---------------------------------
    const handleDelete = (id) => {
        console.log(id);

        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
          
        const res = await axiosSecure.delete(`/menu/${id}`)
        if (res.data.deletedCount>0){
          if (result.isConfirmed) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          }
        }
         
        });


    }


    return (
        <div className='h-full'>
            <SectionTitles heading={'manage all items'} subHeading={'Hurry Up'}></SectionTitles>
            <div className='flex justify-between items-center my-2'>
                <h1 className='text-3xl font-serif'>Total Items: {menu.length}</h1>
                <p>
  <input type="search" className='dark:bg-white 
  bg-black text-white
   dark:text-black p-2
    mr-2 dark:shadow-white shadow-black shadow-md 
    rounded-3xl' required placeholder="Search"/>
  <input className='btn btn-sm btn-primary shadow-md shadow-blue-500' type="submit" />
</p>
            </div>
            <div className="w-full overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Recipe Image</th>
        <th>Recipe Name</th>
        <th>Recipe Category</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
    {menu.map((item,index)=>
      <tr key={index}>
      <th>
       {index+1}
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img
                src={item.image}
                alt="Recipe Image" />
            </div>
          </div>
         
        </div>
      </td>

        <td>{item.name}</td>
        <td>{item.category}</td>
      <th>
      <Link to={`/dashboard/editItems/${item._id}`}>
      <button className="btn bg-orange-400 text-black hover:text-orange-400 hover:border-orange-400 "><FaEdit></FaEdit></button>
      </Link>
      </th>
      <th>
        <button
        onClick={()=>handleDelete(item._id)}
        className="btn bg-red-500 text-black hover:text-red-500 hover:border-red-500  "><FaDeleteLeft></FaDeleteLeft></button>
      </th>
    </tr>
    )}
    </tbody>
  </table>
</div>
        </div>
    );
};

export default ManageItem;