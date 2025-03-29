import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import { FaShoppingCart } from "react-icons/fa";
import useCarts from "../../../hooks/useCarts";
import useAdmin from "../../../hooks/useAdmin";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCarts();
  const isAdmin = useAdmin();
  const handleLogOut = () => {
    logOut()
      .then((res) => {
        Swal.fire({
          title: "Log Out!",
          icon: "success",
          draggable: true,
        });
      })
      .catch((err) => console.log(err));
  };
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const mode =<div className="flex justify-center">
          {theme === "light" ? (
            <>
              <p className="flex justify-center items-center" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              MODE
                <svg
                  className=" swap-off h-10 w-7 fill-current text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </p>
            </>
          ) : (
            <>
              <p className="flex gap-2 items-center" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              MODE
                <svg
                  className=" swap-on h-10 w-7 fill-current "
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>
              </p>
            </>
          )}
  </div>

  const users = (
    <div className="flex items-center">

      {user ? (
        <p
          onClick={handleLogOut}
          className="dark:border-white text-sm
          px-2 py-2 rounded-lg
           border-black
            dark:bg-black
             dark:text-white
              text-black bg-white 
              "
        >
          Logout
        </p>
      ) : (
        <ul className="flex gap-3">
        <li>
        <Link
            to={"/login"}
            className="dark:border-white text-sm
            px-2 py-2 rounded-lg 
            border-black
             dark:bg-black
              dark:text-white
               text-black 
               bg-white "
          >
            Login
          </Link>
        </li>

         <li>
         <Link
            to={"/signUp"}
            className="dark:border-white text-sm
          px-2 py-2 rounded-lg
           border-black
            dark:bg-black
             dark:text-white
              text-black bg-white  "
          >
            Register
          </Link>
         </li>
        </ul>
      )}
    </div>
  );


  const navOption = (
    <>
      <li>
        <button className="btn btn-ghost">  <Link to={"/"}>Home</Link></button>
      </li>
      <li>
        
        {
          isAdmin ?<button className="btn btn-ghost">  <Link to={"dashboard/adminHome"}>
            Admin DashBoard</Link></button>
          :<button className="btn btn-ghost">  <Link to={"dashboard/userHome"}>DashBoard</Link></button>
        
        }
      </li>
      <li>
        <button className="btn btn-ghost"> <Link to={"/menu"}>Our Menu</Link></button>
      </li>
      <li>
        <button className="btn btn-ghost">  <Link to={"order/salad"}>Order Food</Link></button>
      </li>
      <li>
      {mode}
      </li>
      <li>
      {users}
      </li>
    </>
  );
  



  return (
    <div className="navbar bg-black h-2 bg-opacity-30 text-white fixed z-10 max-w-screen-xl mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] -mt-5 w-40 p-1 shadow-md shadow-black dark:shadow-white"
          >
            {navOption}
          </ul>
        </div>
        <a className=" btn btn-ghost text-xl"> Boss Restaurant</a>
      </div>
      <div className="navbar-center hidden md:hidden lg:flex ">
        <ul className="flex justify-between items-center menu menu-horizontal  px-1">{navOption}</ul>
      </div>
      <div className="navbar-end">
        <div className="flex items-center px-3">
          <button className="flex btn-ghost ms-4">
            <Link to={"/dashboard/myCart"}>
              {" "}
              <FaShoppingCart className="text-slate-400 text-3xl "></FaShoppingCart>
            </Link>
            <span className="badge badge-ghost
             dark:bg-black bg-white
              text-pink-600 
              sm:mt-0 sm:ms-0 -mt-2 -ms-3">
              + {cart.length >= 9 ? 9 : cart.length}
            </span>
          </button>
      
        </div>
        
      </div>
    </div>
  );
};

export default NavBar;
