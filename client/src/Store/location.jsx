/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./auth";

export const LocationContext = createContext();

export const LocationContextProvider = ({ children }) => {
  const [loc, setLoc] = useState({ latitude: "", longitude: "" });
  const [address, setAddress] = useState({
    full: "",
    pinCode: "",
    district: "",
    state: "",
    country: "",
  });
  const { isLoggedIn, authorizationToken } = useAuth();

  const sendLocationToServer = async (location) => {
    try {
      const response = await fetch(`http://localhost:4000/api/auth/map`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify({ loc: location }),
      });
      const res_data = await response.json();
      if (response.ok) {
        // setAddress(res_data[0].place_name);
        setAddress({
          full: res_data[0].place_name,
          pinCode: res_data[1].place_name.split(", ")[0],
          district: res_data[3].place_name.split(", ")[0],
          state: res_data[4].place_name.split(", ")[0],
          country: res_data[5].place_name,
        });
        console.log("Address : ", res_data);
        toast.success("Location Sent successfully!");
      } else {
        toast.error("Error sending location to the server.");
      }
    } catch (e) {
      toast.error("Failed to send location to the server.");
      console.error("Fetch Error: ", e);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setLoc({ latitude, longitude });
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
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (loc.latitude && loc.longitude) {
      sendLocationToServer(loc);
    }
  }, [loc]);

  console.log("Address data from location context: ", address);

  return (
    <LocationContext.Provider
      value={{ loc, setLoc, address, setAddress, sendLocationToServer }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const locationContextValue = useContext(LocationContext);
  if (!locationContextValue) {
    throw new Error("useAuth is used outside of the Provider.");
  }
  return locationContextValue;
};
