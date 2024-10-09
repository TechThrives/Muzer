import React, { useEffect } from "react";
import fetchService from "../services/fetchService";

const Logout = () => {
  useEffect(() => {
    async function logout() {
      const url = "/api/auth/logout";
      const options = {
        method: "POST",
        credentials: "include",
      };

      if (await fetchService(url, options)) {
        window.location.href = "/";
      }
    }

    logout();
  }, []);
  return <div>Logout</div>;
};

export default Logout;
