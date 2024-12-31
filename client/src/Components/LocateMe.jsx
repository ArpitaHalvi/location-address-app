/* eslint-disable react/prop-types */
import { FaCrosshairs } from "react-icons/fa";
import { useLocation } from "../Store/location";
import { toast } from "react-toastify";

export default function LocateMe({ focusMarker }) {
  const { setLoc } = useLocation();
  const fetchInitalLoc = () => {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted") {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLoc({ latitude, longitude });
            focusMarker(latitude, longitude);
          },
          (error) => {
            toast.error(`Error ${error.code}: ${error.message}`);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );
      }
    });
  };
  return (
    <button
      onClick={fetchInitalLoc}
      className="flex gap-2 justify-center items-center text-2xl text-red-700 px-3 py-2 bg-white rounded-full border border-gray-400 hover:bg-gray-50"
    >
      <FaCrosshairs /> Locate Me
    </button>
  );
}
