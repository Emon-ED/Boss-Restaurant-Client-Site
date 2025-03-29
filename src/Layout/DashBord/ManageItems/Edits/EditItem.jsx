import { useLoaderData } from "react-router-dom";
import SectionTitles from "../../../../pages/SharedPages/sectiontitles/SectionTitles";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageUploadApi =`https://api.imgbb.com/1/upload?key=${imageHostingKey}`;



const EditItem = () => {
  const item = useLoaderData();
  console.log(item);
  const { name, recipe, category, price, _id,image} = item;
   const { register, handleSubmit } = useForm();
   const axiosPublic = useAxiosPublic();
   const axiosPrivate = useAxiosSecure();

   const onSubmit =async (data) => {

     // upload image imgbb and get url ---------------
     const imageFile = data.image[0]? {image:data.image[0]} : {image:image};
     const res = await axiosPublic.post(imageUploadApi,imageFile,{
       headers:{
         'Content-Type':'multipart/form-data'
       },
     });
     if(res.data.success){
       const item = {
         name:data.name,
         recipe:data.recipe,
         image:res.data.data.display_url,
         category:data.category,
         price:parseInt(data.price)
       }
       const result = await axiosPrivate.patch(`/menu/${_id}`,item);
       console.log(result.data)
       if(result.data.modifiedCount){
         Swal.fire({
           position: "top-end",
           icon: "success",
           title: `${item.name} has been saved`,
           showConfirmButton: false,
           timer: 1500
         });
       }
     }
  
   }



  return (
    <div className='h-full dark:border-white shadow-lg dark:shadow-white shadow-black border-black border-2 p-5 rounded-lg'>
    <SectionTitles subHeading={"Update Item"} heading={'Refresh Item'}></SectionTitles>
<form onSubmit={handleSubmit(onSubmit)} className=' space-y-5 pb-3'>
<input {...register("name")} defaultValue={name} placeholder='Recipe name *' className='bg-transparent w-full p-3 shadow-md  shadow-black dark:shadow-white rounded-md'/>
<div className='flex gap-4'>
<select defaultValue={category} {...register('category')}
className="select bg-transparent shadow-md  shadow-black dark:shadow-white w-full ">
<option disabled value={'null'}>Select Category *</option>
<option className='text-black' value="dessert">Dessert</option>
<option className='text-black' value="soup">Soup</option>
<option className='text-black' value="salad">Salad</option>
<option className='text-black' value="pizza">Pizza</option>
<option className='text-black' value="drinks">Drinks</option>
<option className='text-black' value="popular">Popular</option>
<option className='text-black' value="offered">Offered</option>
</select>
<input {...register("price")} defaultValue={price} placeholder='Price *' className='bg-transparent w-full p-3 shadow-md  shadow-black dark:shadow-white rounded-md'/>
</div>
<textarea {...register("recipe")} defaultValue={recipe} className="textarea bg-transparent shadow-md  shadow-black dark:shadow-white w-full" placeholder="Recipe Description *"></textarea>

<label className="form-control w-1/3 ">
<div className="label">
<span className="label-text bg-transparent  ">Upload Recipe Image *</span>

</div>
<input {...register("image")} type="file" className="bg-transparent file-input file-input-bordered shadow-md shadow-black dark:shadow-white " />

</label>

<input className='btn hover:bg-orange-400 hover:text-black shadow-md dark:text-white text-black shadow-black dark:shadow-white p-4 bg-transparent border-blue-400' type="submit" />
</form>
</div>
 );
};

export default EditItem;
