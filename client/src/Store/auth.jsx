/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const isLoggedIn = !!token;
  const [loading, setLoading] = useState(true);
  const authorizationToken = `Bearer ${token}`;
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchUserData(storedToken);
    } else {
      setLoading(false);
    }
    return () => {
      setUser(null);
      setLoading(false);
    };
  }, []);

  // Storing the token in local storage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  //logout the user by removing the token
  const logoutUser = () => {
    setToken("");
    setUser(null);
    return localStorage.removeItem("token");
  };

  const fetchUserData = async (authToken) => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
        setLoading(false);
      } else {
        console.error("Invalid token, logging out user.");
        logoutUser();
        setLoading(false);
        toast.error("Authentication Failed, please log in again.");
      }
    } catch (e) {
      toast.error(e);
      logoutUser();
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        storeTokenInLS,
        logoutUser,
        user,
        loading,
        isLoggedIn,
        authorizationToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth is used outside of the Provider.");
  }
  return authContextValue;
};
