import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../Store/auth";

const initialUser = {
  email: "",
  password: "",
};
export default function Login() {
  const [user, setUser] = useState(initialUser);
  const { storeTokenInLS } = useAuth();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const res_data = await response.json();
      if (response.ok) {
        storeTokenInLS(res_data.token);
        setUser(initialUser);
        toast.success("Logged In successfully!", { onClose: navigate("/") });
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (e) {
      toast.error("Error while logging In. Please Try again later!");
      console.log(e);
    }
  };
  return (
    <section className="w-full h-[90vh] bg-blue-200 flex justify-center items-center ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-6 bg-white p-3 rounded shadow-lg"
      >
        <h2 className="font-bold text-2xl">Login</h2>
        <div className="w-full flex justify-center items-center gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={handleChange}
            name="email"
            required
            className="w-full p-3 rounded border border-slate-300"
          />
        </div>
        <div className="flex justify-center items-center gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={handleChange}
            name="password"
            required
            className="w-full p-3 rounded border border-slate-300"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-700 px-3 py-2 rounded text-white"
        >
          LOGIN
        </button>
      </form>
    </section>
  );
}
