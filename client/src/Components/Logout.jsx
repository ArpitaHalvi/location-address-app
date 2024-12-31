import { Navigate } from "react-router-dom";
import { useAuth } from "../Store/auth";
import { useEffect } from "react";
export default function Logout() {
  const { logoutUser } = useAuth();
  useEffect(() => {
    logoutUser();
  }, [logoutUser]);
  return <Navigate to="/" />;
}
