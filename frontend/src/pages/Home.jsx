import React from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";

const Home = () => {
  const { socket } = useSocket();
  const navigate = useNavigate();

  const handleHost = () => {
    socket.emit("createRoom");
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <button onClick={handleHost}>Host</button>
        <button onClick={() => navigate("/room/123")}>Join</button>
      </div>
    </>
  );
};

export default Home;
