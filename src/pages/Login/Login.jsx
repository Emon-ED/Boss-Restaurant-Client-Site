import { useContext, useEffect, useRef, useState } from "react";
import img from "../../assets/others/authentication2.png";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const { signInUser,googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const pass = form.pass.value;

    signInUser(email, pass)
      .then((user) => {
        if (user) {
          Swal.fire({
            title: "Log In !",
            icon: "success",
            draggable: true,
          });
          navigate(from, { replace: true }  );
        }
      })
      .catch((err) => {
        
        if(err = ' auth/invalid-credential'){
          Swal.fire({
            title: "Password or Email is incorrect!",
            icon: "error",
            draggable: true,
          });
        }
      });
    form.reset();
  };

  useEffect(() => {
    loadCaptchaEnginge(6);
  });

  const handleCaptcha = (e) => {
    const captcha = e.target.value;
    if (validateCaptcha(captcha)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
// Sign in With Google -------------------
const handleGoogleSignIn =()=>{
  googleSignIn()
  .then(res=>{
    Swal.fire({
      title: "Log In !",
      icon: "success",
      draggable: true,
    });
    navigate(from, { replace: true }  );
  })
  .catch(err=>console.log(err))
}
  return (
    <>
      <Helmet>
        <title>Boss || Log In</title>
      </Helmet>
      <div className="hero pt-16 lg:px-7 md:px-5 px-1 bg-white text-black dark:bg-black dark:text-white min-h-screen">
        <div className="hero-content  flex-col-reverse lg:flex-row ">
          <div className="text-center lg:text-center  ">
            <img loading="lazy" src={img} alt="Login Image" />
          </div>
          <div className="card md:w-full lg:w-full w-5/6 pt-3 max-w-sm shrink-0 shadow-lg shadow-black dark:shadow-white">
            <h1 className="text-3xl font-bold text-center">Login now!</h1>
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control -my-1">
                <label className="label">
                  <span className="dark:text-white text-black">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="email"
                  className="p-2 rounded-lg shadow-2xl bg-slate-300  text-black "
                  required
                />
              </div>
              <div className="form-control -my-1">
                <label className="label">
                  <span className="dark:text-white text-black">Password</span>
                </label>
                <input
                  name="pass"
                  type="password"
                  placeholder="password"
                  className="p-2 rounded-lg shadow-2xl bg-slate-300 text-black"
                  required
                />
              </div>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover -mb-2">
                  Forgot password? <br />
                </a>
              </label>
              <div>
                <input
                  onBlur={handleCaptcha}
                  placeholder="Type the text below"
                  className=" p-1 w-full rounded-lg shadow-2xl bg-slate-300 text-black shadow-black my-2"
                  type="text"
                />
                <LoadCanvasTemplate />
              </div>
              <div className="form-control -my-1">
                <button
                  // disabled={disabled}
                  className="btn text-slate-900 btn-primary"
                >
                  Login
                </button>
              </div>
            <h1 className="divider">OR</h1>
            <p className="text-center">
            <button onClick={handleGoogleSignIn} className=" btn lg:btn-wide bg-blue-700"><FcGoogle></FcGoogle>Google</button>
            </p>
            </form>
            <p className="text-center text-sm">
              Haven't Account ?{" "}
              <Link to={"/signUp"}>
                <button className="btn btn-link">Sign Up</button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
