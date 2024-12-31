import { BrowserRouter, Routes, Route } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "react-toastify/ReactToastify.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import { ToastContainer } from "react-toastify";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Logout from "./Components/Logout";
import MapComponent from "./Components/MapComponent";
import AddressForm from "./Components/AddressForm";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer theme="light" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/map" element={<MapComponent />} />
        <Route path="/address" element={<AddressForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
