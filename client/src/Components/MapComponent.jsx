import { IoSearch } from "react-icons/io5";
import { useLocation } from "../Store/location";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { toast } from "react-toastify";
import "@react-leaflet/core";
import { useState } from "react";
import { useAuth } from "../Store/auth";
import LocateMe from "./LocateMe";
const MaptilerApiKey = "API_KEY";

export default function MapComponent() {
  const { loc, address, setLoc, sendLocationToServer } = useLocation();
  const { authorizationToken } = useAuth();
  const [city, setCity] = useState("");
  const [markerPosition, setMarkerPosition] = useState([
    loc.latitude,
    loc.longitude,
  ]);
  const zoom = 20;

  console.log("Address: ", address);

  const handleMarkerDrag = (e) => {
    const newLat = e.target.getLatLng().lat;
    const newLng = e.target.getLatLng().lng;
    setLoc({ latitude: newLat, longitude: newLng });
    sendLocationToServer({ latitude: newLat, longitude: newLng });
    setMarkerPosition([newLat, newLng]);
  };

  const fetchCityData = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/auth/map/city`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify({ city }),
      });
      const res_data = await response.json();
      if (response.ok) {
        const { latitude, longitude } = res_data;
        if (latitude && longitude) {
          console.log("City data from server ", res_data);
          console.log(latitude, longitude);
          setMarkerPosition([latitude, longitude]);
          setLoc({ latitude, longitude });
        } else {
          console.error("Latitude and longitude not found in the response.");
          toast.error(
            "Could not retrieve valid location data. Please try again."
          );
        }
      } else {
        console.error("Error while fetching the data.");
      }
    } catch (e) {
      console.error(e);
      toast.error(
        "An error occurred while fetching city data. Please try again."
      );
    }
  };

  const changeAddress = () => {
    if (city.trim() === "") {
      toast.error("Enter a city name to search.");
      return;
    }
    fetchCityData();
  };

  const focusMarker = (lat, lng) => {
    setMarkerPosition([lat, lng]);
  };

  return (
    <section className="w-full h-[90vh] flex flex-col justify-center items-center bg-blue-100 gap-10">
      <div className="w-full flex justify-center items-center h-[10%] gap-10">
        <input
          type="search"
          placeholder="Search for your location"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 border w-1/2 rounded border-slate-400 text-lg mt-10"
        />
        <button
          className="text-3xl bg-white p-2 rounded-full text-gray-500 mt-10 border border-gray-400 hover:bg-slate-200"
          onClick={changeAddress}
        >
          <IoSearch />
        </button>
      </div>
      <div className="bg-gray-300 w-full h-[90%] p-2 rounded flex justify-center items-center flex-col gap-10">
        {loc.latitude && loc.longitude ? (
          <>
            <MapContainer
              center={markerPosition}
              zoom={zoom}
              className="h-[50vh] w-full"
            >
              <TileLayer
                url={`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${MaptilerApiKey}`}
                attribution="© MapTiler, © OpenStreetMap contributors"
              />
              <Marker
                position={markerPosition}
                draggable={true}
                eventHandlers={{ dragend: handleMarkerDrag }}
              >
                <Popup>
                  {address ? (
                    <div>
                      <h2 className="font-semibold">
                        Your order will be delivered here.
                      </h2>
                      <p className="capitalize">{address.full}</p>
                    </div>
                  ) : (
                    <p>Loading address...</p>
                  )}
                </Popup>
              </Marker>
            </MapContainer>
            <LocateMe focusMarker={focusMarker} />
          </>
        ) : (
          <div>Loading map....</div>
        )}
      </div>
    </section>
  );
}
