import React, { useEffect, useState } from "react";
import fetchService from "../services/fetchService";
import { useNavigate } from "react-router-dom";

const useHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hostedRooms, setHostedRooms] = useState([]);
  const [favoriteRooms, setFavoriteRooms] = useState([]);
  const navigate = useNavigate();

  const getRoomData = async () => {
    const url = "/api/room/myRooms";
    const options = {
      method: "GET",
      credentials: "include",
    };

    const data = await fetchService(url, options);

    if (data) {
      setHostedRooms(data.hostedRooms);
      setFavoriteRooms(data.favoriteRooms);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getRoomData();
  }, []);

  const handleHost = async () => {
    const url = "/api/room/create";
    const options = {
      method: "POST",
      credentials: "include",
    };
    const response = await fetchService(url, options);
    if (response) {
      navigate(`/room/${response.code}`);
    }
  };

  const handleLogout = () => {
    navigate("/logout");
  };

  return { isLoading, hostedRooms, favoriteRooms, handleHost, handleLogout };
};

export default useHome;
