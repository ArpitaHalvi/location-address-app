import { useState } from "react";
import { FaBriefcase, FaHome, FaUserFriends } from "react-icons/fa";
import { useAuth } from "../Store/auth";
import { toast } from "react-toastify";

const initialAddr = {
  houseNo: "",
  streetAddress: "",
  category: "",
};

export default function AddressForm() {
  const [addr, setAddr] = useState(initialAddr);
  const { authorizationToken, user } = useAuth();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddr((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:4000/api/auth/${user._id}/address`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(addr),
        }
      );
      console.log("response: ", response);

      if (response.ok) {
        toast.success("Saved the address.");
        setAddr(initialAddr);
      } else {
        toast.error("Error in saving address");
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <section className="h-[90vh] flex justify-center items-center bg-blue-300">
      <form
        onSubmit={handleSubmit}
        className="w-1/4 flex flex-col justify-center items-center p-10 shadow-lg bg-white rounded"
      >
        <h2 className="text-2xl p-4">Save Address</h2>
        <div className="w-full">
          <label htmlFor="houseNo" className="text-gray-700 pt-3">
            HOUSE/FLAT/BLOCK NO.
          </label>
          <input
            type="number"
            value={addr.houseNo}
            onChange={handleChange}
            name="houseNo"
            required
            className="w-full p-2 border border-b-2"
          />
          <label htmlFor="streetAddress" className="text-gray-700 pt-3">
            APARTMENT/ROAD/AREA
          </label>
          <input
            type="text"
            value={addr.streetAddress}
            onChange={handleChange}
            name="streetAddress"
            required
            className="w-full p-2 border border-b-2"
          />
          <div className="flex p-3 gap-3">
            <label className="relative inline-block cursor-pointer">
              <input
                type="radio"
                value="Home"
                onChange={handleChange}
                name="category"
                className="peer absolute w-8 h-8 opacity-0"
              />
              <FaHome className=" bg-gray-3 border border-gray-400 text-3xl p-1 peer-checked:text-blue-500 rounded-full" />
            </label>
            <label className="relative inline-block cursor-pointer">
              <input
                type="radio"
                value="Office"
                onChange={handleChange}
                name="category"
                className="peer absolute w-8 h-8 opacity-0"
              />
              <FaBriefcase className=" bg-gray-3 border border-gray-400 text-3xl p-1 peer-checked:text-blue-500 rounded-full" />
            </label>
            <label className="relative inline-block cursor-pointer">
              <input
                type="radio"
                value="Friends & Family"
                onChange={handleChange}
                name="category"
                className="peer absolute w-8 h-8 opacity-0"
              />
              <FaUserFriends className=" bg-gray-3 border border-gray-400 text-3xl p-1 peer-checked:text-blue-500 rounded-full" />
            </label>
          </div>
        </div>
        <button className="bg-red-300 mt-5 px-3 py-1 rounded" type="submit">
          SAVE
        </button>
      </form>
    </section>
  );
}
