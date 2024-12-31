import { useEffect, useState } from "react";
import { useAuth } from "../Store/auth";
import { toast } from "react-toastify";

export default function UserAddresses() {
  const { user, authorizationToken } = useAuth();
  const [userAddr, setUserAddr] = useState([]);
  useEffect(() => {
    const fetchUserAddresses = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/auth/${user._id}/addresses`,
          {
            method: "GET",
            headers: {
              Authorization: authorizationToken,
            },
          }
        );
        const res_data = await response.json();
        if (response.ok) {
          setUserAddr(res_data);
          toast.success("Addresses loaded successfully.");
        } else {
          toast.error("Error while loading the addresses.");
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchUserAddresses();
  }, []);
  return (
    <section>
      {userAddr.map((addr) => {
        return (
          <div key={addr._id}>
            <p>
              {addr.houseNo} {addr.streetAddress}
            </p>
          </div>
        );
      })}
    </section>
  );
}
