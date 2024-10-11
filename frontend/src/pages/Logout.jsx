import React, { useEffect } from "react";
import fetchService from "../services/fetchService";
import Loader from "../components/Loader";

const Logout = () => {
  const logout = async () => {
    const url = "/api/auth/logout";
    const options = {
      method: "POST",
      credentials: "include",
    };

    if (await fetchService(url, options)) {
      // wait for the redirect
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    }
  };

  useEffect(() => {
    logout();
  }, []);

  return <Loader className="h-screen" />;
};

export default Logout;
