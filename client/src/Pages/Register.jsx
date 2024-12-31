import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../Store/auth";
const initialUser = {
  email: "",
  username: "",
  password: "",
};

import { NavLink, useNavigate } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/api/auth/register`, {
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
        toast.success("Registered successfully!", { onClose: navigate("/") });
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  return (
    <section className="w-full h-[90vh] bg-blue-200 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white flex justify-center items-center flex-col rounded shadow-lg gap-6 text-lg"
      >
        <h2 className="font-bold text-2xl pb-4">Sign Up</h2>
        <div className="w-full flex gap-2 items-center justify-center">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={handleChange}
            name="email"
            required
            className="w-full p-2 rounded border border-slate-300"
          />
        </div>
        <div className="w-full flex gap-2 items-center justify-center">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={user.username}
            onChange={handleChange}
            name="username"
            required
            className="w-full p-2 rounded border border-slate-300"
          />
        </div>
        <div className="w-full flex gap-2 items-center justify-center">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={handleChange}
            name="password"
            required
            className="w-full p-2 rounded border border-slate-300"
          />
        </div>
        <p className="text-sm text-gray-700">
          Already have an account? <NavLink to="/login">Login</NavLink>
        </p>
        <button
          type="submit"
          className="px-3 py-2 bg-blue-800 text-white rounded"
        >
          Sign Up
        </button>
      </form>
    </section>
  );
}
