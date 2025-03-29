import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/home/Home";
import Menu from "../Layout/Menus/Menu";
import OderFood from "../Layout/OderFoods/OderFood";
import Login from "../pages/Login/Login";
import Register from "../pages/SignUp/Register";
import PrivateRoute from "./PrivateRoute";
import MyCart from "../Layout/DashBord/MyCarts/MyCart";
import Dashboard from "../Layout/DashBord/Dashbord/Dashboard";
import UserHome from "../Layout/DashBord/UserHome/UserHome";
import Reservation from "../Layout/DashBord/Reservation/Reservation";
import PaymentHistory from "../Layout/DashBord/paymentHistory/PaymentHistory";
import AddReview from "../Layout/DashBord/AddReview/AddReview";
import AllUsers from "../Layout/DashBord/Allusers/AllUsers";
import AddItems from "../Layout/DashBord/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItem from "../Layout/DashBord/ManageItems/ManageItem";
import EditItem from "../Layout/DashBord/ManageItems/Edits/EditItem";
import Payment from "../Layout/DashBord/Payment/Payment";
import AdminHome from "../Layout/DashBord/AminHome/AdminHome";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/menu',
            element:<Menu></Menu>
        },
        {
          path:'order/:category',
          element:<OderFood></OderFood>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/signUp',
            element:<Register></Register>
        },
       
      ]
    },
    {
      path:'dashboard',
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
        {
        path:'myCart',
        element:<PrivateRoute><MyCart></MyCart></PrivateRoute>
      },
      {
      path:'addReview',
      element:<AddReview></AddReview>
    },
    {
    path:'userHome',
    element:<UserHome></UserHome>
  },
  {
  path:'reservation',
  element:<Reservation></Reservation>
},
{
path:'paymentHistory',
element:<PaymentHistory></PaymentHistory>
},
{
  path:'payment',
  element:<PrivateRoute><Payment></Payment></PrivateRoute>
},
    // Admin Routes ------------------
      {
        path:'adminHome',
        element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path:'users',
        element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
        {
        path:'addItems',
        element:<AdminRoute><AddItems></AddItems></AdminRoute>
      },
        {
        path:'manageItems',
        element:<AdminRoute><ManageItem></ManageItem></AdminRoute>
      },
      
        {
        path:'editItems/:id',
        element:<AdminRoute><EditItem></EditItem></AdminRoute> ,
        loader:({params})=>fetch(`https://boss-server-weld.vercel.app/menu/${params.id}`)
      },
    ]
    },
  ]);
  export default router;