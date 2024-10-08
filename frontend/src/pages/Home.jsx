import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";

const Home = () => {
  const { onEvent, emitEvent } = useSocket();
  const navigate = useNavigate();

  const handleHost = () => {
    emitEvent("createRoom");
  };

  const handleLogout = () => {
    navigate("/logout");
  };

  useEffect(() => {
    const cleanupRoomCreated = onEvent("roomCreated", (room) => {
      navigate(`/host/${room.code}`);
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
      <button onClick={() => navigate("/room/abc")}>Join</button>
      <button onClick={handleLogout}>Logout</button> {/* Logout Button */}
    </div>
  );
};

export default Home;
