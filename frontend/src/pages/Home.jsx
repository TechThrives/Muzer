import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import fetchService from "../services/fetchService";
import AddSong from "../components/room/AddSong";

const Home = () => {
  const { onEvent } = useSocket();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleHost = async() => {
    const url = "/api/room/create";
    const options = {
      method: "POST",
      credentials: "include",
    };
    const response = await fetchService(url, options);
    if(response) {
      navigate(`/room/${response.code}`);
    }
  };

  const handleLogout = () => {
    navigate("/logout");
  };

  useEffect(() => {
    const cleanupRoomCreated = onEvent("roomCreated", (room) => {
      navigate(`/room/${room.code}`);
    });

    return () => {
      if (cleanupRoomCreated) {
        cleanupRoomCreated();
      }
    };
  }, [navigate, onEvent]);

  return (
    <div className="flex flex-col gap-2">
      <button onClick={handleHost}>Host</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
