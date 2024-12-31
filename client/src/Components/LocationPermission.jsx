/* eslint-disable react/prop-types */
import { IoClose, IoSearch } from "react-icons/io5";
import { MdLocationOff } from "react-icons/md";
import { useLocation } from "../Store/location";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

export default function LocationPermission({ show, onClose }) {
  const { setLoc } = useLocation();
  const enableLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          toast.success("Permission Granted!");
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          setLoc({ latitude, longitude }); // Update context state
        },
        (error) => {
          toast.error(`Error Code ${error.code}: ${error.message}`);
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };
  if (!show) return null;
  return (
    <div className="w-1/4 p-3 h-[55vh] shadow-lg flex justify-between items-end flex-col rounded border border-slate-200 text-center">
      <button onClick={onClose}>
        <IoClose className="text-2xl" />
      </button>
      <div className="flex flex-col justify-center gap-6 items-center p-6">
        <h3 className="text-2xl text-red-800 font-bold flex flex-col justify-center items-center">
          <MdLocationOff className="text-5xl" />
          Location permission needed!
        </h3>
        <p className="text-sm text-gray-600">
          We need your location to find the nearest store & provide seamless
          delivery experience
        </p>
        <div className="font-semibold flex justify-center items-center flex-col gap-3">
          <button
            className="w-full px-5 py-2 bg-blue-300 rounded"
            onClick={enableLocation}
          >
            Enable Location
          </button>
          <button className="flex justify-center items-center gap-2 w-full px-5 py-2 bg-blue-300 rounded">
            <NavLink
              className="flex justify-center items-center gap-2 w-full  bg-blue-300 rounded"
              to="/map"
            >
              <IoSearch className="text-2xl" /> Search your Location Manually
            </NavLink>
          </button>
        </div>
      </div>
    </div>
  );
}
