import React, { useEffect } from "react";
import fetchService from "../services/fetchService";

const Logout = () => {
  useEffect(() => {
    async function logout() {
      const response = await fetchService("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response) {
        window.location.href = "/";
      }
    }

    logout();
  }, []);
  return <div>Logout</div>;
};

export default Logout;
