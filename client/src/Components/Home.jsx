import { useEffect, useState } from "react";
import LocationPermission from "./LocationPermission";
import { toast } from "react-toastify";

export default function Home() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    navigator.permissions
      .query({ name: "geolocation" })
      .then((result) => {
        if (result.state === "denied" || result.state === "prompt") {
          setShow(true);
        }
      })
      .catch((error) => {
        toast.error("Error checking permission: ", error);
      });
  }, []);
  const closePopUp = () => setShow(false);

  return (
    <section className="w-full h-[90vh] flex justify-center items-center">
      <LocationPermission show={show} onClose={closePopUp} />
    </section>
  );
}
