import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./Store/auth.jsx";
import { LocationContextProvider } from "./Store/location.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <LocationContextProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </LocationContextProvider>
  </AuthProvider>
);
