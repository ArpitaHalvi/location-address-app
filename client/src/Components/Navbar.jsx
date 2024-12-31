import { NavLink } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { IoMapSharp } from "react-icons/io5";

import { useAuth } from "../Store/auth";
import { useLocation } from "../Store/location";

export default function Navbar() {
  const { isLoggedIn, user } = useAuth();
  const { address } = useLocation();
  return (
    <nav className="w-full shadow h-[10vh] flex justify-center items-center">
      <div className="w-3/4 flex gap-10">
        <IoMapSharp className="text-gray-700 text-5xl" />
        <p className="text-lg mt-2">Welcome, {user ? user.username : "User"}</p>
      </div>
      <div className="w-1/4 flex justify-end items-center gap-10 p-2">
        {isLoggedIn ? (
          <>
            <NavLink
              to="/logout"
              className="px-5 py-2 bg-blue-400 text-white rounded"
            >
              Logout
            </NavLink>
            <p>
              {address.district ? (
                <>{address.district}</>
              ) : (
                "Location not available"
              )}
            </p>
            <NavLink
              to="/map"
              className="w-1/4 flex items-center justify-center"
              title="Your current location"
            >
              <MdLocationOn className="text-5xl text-blue-600" />
            </NavLink>
            <NavLink
              to="/address"
              className="border border-blue-600 px-3 rounded text-blue-600"
            >
              Change Address
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/register"
              className="px-3 py-2 bg-blue-400 text-white rounded "
            >
              Sign Up
            </NavLink>
            <NavLink
              to="/login"
              className="px-3 py-2 bg-blue-400 text-white rounded "
            >
              Login
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
