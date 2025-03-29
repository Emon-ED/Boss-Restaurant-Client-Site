import React from 'react';
import SectionTitles from '../../../pages/SharedPages/sectiontitles/SectionTitles';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageUploadApi =`https://api.imgbb.com/1/upload?key=${imageHostingKey}`;
const AddItems = () => {
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosPrivate = useAxiosSecure();
    const onSubmit =async (data) => {
        // console.log(data);
      // upload image imgbb and get url ---------------
      const imageFile = {image:data.image[0]};
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
        console.log(item)
        const result = await axiosPrivate.post('/menu',item);
        if(result.data.insertedId){
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
          form.reset();
        }
      }
   
    }
    return (
       
  <div className=' dark:border-white shadow-lg dark:shadow-white shadow-black border-black border-2 p-5 rounded-lg'>
            <SectionTitles subHeading={"What's new?"} heading={'add items'}></SectionTitles>
  <form onSubmit={handleSubmit(onSubmit)} className=' space-y-5 pb-3'>
      <input {...register("name")} placeholder='Recipe name *' className='bg-transparent w-full p-3 shadow-md  shadow-black dark:shadow-white rounded-md'/>
<div className='flex gap-4'>
<select defaultValue={"null"} {...register('category')}
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
<input {...register("price")} placeholder='Price *' className='bg-transparent w-full p-3 shadow-md  shadow-black dark:shadow-white rounded-md'/>
</div>
<textarea {...register("recipe")} className="textarea bg-transparent shadow-md  shadow-black dark:shadow-white w-full" placeholder="Recipe Description *"></textarea>

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

export default AddItems;