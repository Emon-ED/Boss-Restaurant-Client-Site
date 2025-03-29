import { useContext } from "react";
import img from "../../assets/others/authentication2.png";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FcGoogle } from "react-icons/fc";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Register = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { createUser,googleSignIn } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.pass)
      .then(() => {
          const userInfo = { name: data.name, email: data.email };
          axiosSecure.post("/user", userInfo)
          .then((res) => {
            console.log(res.data.insertedId)
            if (res.data.insertedId) {
              Swal.fire({
                title: "Sign Up Successful !",
                icon: "success",
                draggable: true,
              });
              reset();
              navigate("/");
            }
          
          });
      })
      .catch((err) =>{
        if(err = 'auth/email-already-in-use'){
          Swal.fire({
            icon: "error",
            title: "Email Already Exists",
            text: "Go and Log in"
          });
          
        }
        });
    reset();
  };

  // Sign up With Google -------------------
  const handleGoogleSignIn =()=>{
    googleSignIn()
    .then(res=>{
      const userInfo = {
        email:res.user?.email,
        name:res.user?.displayName,
      }
      axiosPublic.post('/user', userInfo)
      .then(res=>{
        console.log(res.data)
      })
        Swal.fire({
          title: "Sign Up Successful !",
          icon: "success",
          draggable: true,
        });
        reset();
        navigate("/");
     
    })
    .catch(err=>console.log(err))
  }

  return (
    <>
      <Helmet>
        <title>Boss || Sign Up</title>
      </Helmet>
      <div className="pt-16 hero lg:px-7 md:px-5 px-1 bg-white text-black dark:bg-black dark:text-white min-h-screen">
        <div className="hero-content  flex-col lg:flex-row">
          <div className="card lg:w-full w-5/6 md:w-full lg:p-3 mx-auto shadow-lg shadow-black dark:shadow-white">
            <h1 className="text-2xl font-bold text-center">Sign Up now!</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body w-full">
              <div className="form-control">
                <label className="label">
                  <span className="dark:text-white text-black">Name</span>
                </label>
                <input
                  {...register("name", { required: true })}
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="p-2 w-full rounded-lg shadow-2xl bg-slate-100  text-black "
                />
                {errors.name && (
                  <span className="text-red-600">*Name is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="dark:text-white text-black">Email</span>
                </label>
                <input
                  {...register("email", { required: true })}
                  name="email"
                  type="email"
                  placeholder="email"
                  className="p-2 w-full rounded-lg shadow-2xl bg-slate-100  text-black "
                />
                {errors.email && (
                  <span className="text-red-600">*Email is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="dark:text-white text-black">Password</span>
                </label>
                <input
                  {...register("pass", {
                    required: true,
                    minLength: 8,
                    maxLength: 20,
                    pattern:
                      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                  })}
                  name="pass"
                  type="password"
                  placeholder="password"
                  className="p-2 w-full rounded-lg shadow-2xl bg-slate-100 text-black"
                />
                {errors.pass?.type === "required" && (
                  <span className="text-red-600">*Password is required</span>
                )}
                {errors.pass?.type === "minLength" && (
                  <span className="text-red-600">
                    *Password must be 8 characters
                  </span>
                )}
                {errors.pass?.type === "maxLength" && (
                  <span className="text-red-600">
                    *Password must be less than 20 characters
                  </span>
                )}
                {errors.pass?.type === "pattern" && (
                  <span className="text-red-600">
                    *Password must one Uppercase, one Lowercase and Special
                    characters
                  </span>
                )}
              </div>

              <div className="form-control mt-6">
                <input
                  type="submit"
                  value={"Sign Up"}
                  className="btn btn-primary"
                />
              </div>
               <h1 className="divider">OR</h1>
                          <p className="text-center">
                          <button onClick={handleGoogleSignIn} className=" btn lg:btn-wide bg-blue-700"><FcGoogle></FcGoogle>Google</button>
                          </p>
            </form>
            <p className="text-center text-sm">
              Have a Account ?{" "}
              <Link to={"/login"}>
                <button className="btn btn-link">Sign In</button>
              </Link>
            </p>
          </div>
          <div className="text-center sm:w-full lg:text-center  ">
            <img loading="lazy" src={img} alt="Login Image" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
