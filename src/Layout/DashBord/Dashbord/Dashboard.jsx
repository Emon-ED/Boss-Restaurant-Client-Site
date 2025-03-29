import {
  FaHome,
  FaShoppingCart,
  FaCalendar,
  FaWallet,
  FaComment,
  FaCalendarCheck,
  FaSearch,
  FaMobile,
  FaUsers,
  FaBook,
  FaList,
  FaPlus,
} from "react-icons/fa";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import useCarts from "../../../hooks/useCarts";
import useAdmin from "../../../hooks/useAdmin";

const Dashboard = () => {
  const [cart] = useCarts();
  const [isAdmin] = useAdmin();
  console.log(isAdmin)

  return (
    <div className="w-full h-full ">
      <div className="drawer -mb-7 z-10">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer"
            className="btn bg-orange-400 text-black hover:bg-transparent hover:border-orange-400 border-2 hover:text-orange-400 drawer-button"
          >
            <FaList></FaList> Menu
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className=" p-5 w-2/3 md:w-3/12 lg:w-3/12 min-h-screen bg-orange-500">
            {isAdmin ? (
              <>
                <ul className="space-y-2">
                  <li>
                    <NavLink
                      className="flex uppercase text-xs font-serif justify-start  items-center gap-1 font-semibold border border-black p-3 rounded-full text-black "
                      to={"/dashboard/myCart"}
                    >
                      <FaShoppingCart></FaShoppingCart> MY Cart ({cart.length})
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="flex uppercase text-xs font-serif justify-start  items-center gap-1 font-semibold border border-black p-3 rounded-full text-black "
                      to={"/dashboard/adminHome"}
                    >
                      <FaHome /> Admin Home{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="flex uppercase text-xs font-serif justify-start  items-center gap-1 font-semibold border border-black p-3 rounded-full text-black "
                      to={"/dashboard/manageItems"}
                    >
                      <FaList /> Mange Items{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="flex uppercase text-xs font-serif justify-start  items-center gap-1 font-semibold border border-black p-3 rounded-full text-black "
                      to={"/dashboard/paymentHistory"}
                    >
                      <FaWallet />
                      Payment History{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="flex uppercase text-xs font-serif justify-start  items-center gap-1 font-semibold border border-black p-3 rounded-full text-black "
                      to={"/dashboard/paymentHistory"}
                    >
                      <FaBook />
                      manage bookings{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="flex uppercase text-xs font-serif justify-start  items-center gap-1 font-semibold border border-black p-3 rounded-full text-black  "
                      to={"/dashboard/users"}
                    >
                      <FaUsers /> all users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="flex uppercase text-xs font-serif justify-start  items-center gap-1 font-semibold border border-black p-3 rounded-full text-black "
                      to={"/dashboard/addItems"}
                    >
                      <FaPlus /> Add items
                    </NavLink>
                  </li>

                  <div className="divider text-black font-serif font-bold">
                    OR{" "}
                  </div>

                  <li>
                    <NavLink
                      className="flex uppercase text-xs font-serif justify-start  items-center gap-3 font-semibold border border-black p-3 rounded-full text-black "
                      to={"/"}
                    >
                      <FaHouseChimneyUser /> Home{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="flex uppercase text-xs font-serif justify-start  items-center gap-3 font-semibold border border-black p-3 rounded-full text-black "
                      to={"/menu"}
                    >
                      <FaSearch /> Menu{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="flex uppercase text-xs font-serif justify-start  items-center gap-3 font-semibold border border-black p-3 rounded-full text-black "
                      to={"/"}
                    >
                      <FaMobile /> contact{" "}
                    </NavLink>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <ul className="space-y-3">
                  <li>
                    <NavLink
                      className="flex uppercase text-xs font-serif justify-start  items-center gap-1 font-semibold border border-black p-3 rounded-full text-black "
                      to={"/dashboard/userHome"}
                    >
                      <FaHome /> User Home{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="flex uppercase text-xs font-serif justify-start  items-center gap-1 font-semibold border border-black p-3 rounded-full text-black "
                      to={"/dashboard/reservation"}
                    >
                      <FaCalendar /> Reservation{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="flex uppercase text-xs font-serif justify-start  items-center gap-1 font-semibold border border-black p-3 rounded-full text-black "
                      to={"/dashboard/paymentHistory"}
                    >
                      <FaWallet />
                      Payment History{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="flex uppercase text-xs font-serif justify-start  items-center gap-1 font-semibold border border-black p-3 rounded-full text-black "
                      to={"/dashboard/myCart"}
                    >
                      <FaShoppingCart></FaShoppingCart> MY Cart ({cart.length})
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="flex uppercase text-xs font-serif justify-start  items-center gap-1 font-semibold border border-black p-3 rounded-full text-black "
                      to={"/dashboard/addReview"}
                    >
                      <FaComment /> Add review{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="flex uppercase text-xs font-serif justify-start  items-center gap-1 font-semibold border border-black p-3 rounded-full text-black "
                      to={"/dashboard/addReview"}
                    >
                      <FaCalendarCheck /> My Booking{" "}
                    </NavLink>
                  </li>
                  <div className="divider text-black font-serif font-bold">
                    OR{" "}
                  </div>

                  <li>
                    <NavLink
                      className="flex uppercase text-xs font-serif justify-start  items-center gap-3 font-semibold border border-black p-3 rounded-full text-black "
                      to={"/"}
                    >
                      <FaHouseChimneyUser /> Home{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="flex uppercase text-xs font-serif justify-start  items-center gap-3 font-semibold border border-black p-3 rounded-full text-black "
                      to={"/menu"}
                    >
                      <FaSearch /> Menu{" "}
                    </NavLink>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>

      <div className=" px-3 py-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
