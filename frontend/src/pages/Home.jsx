import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";

const Home = () => {
  const { socket } = useSocket();
  const navigate = useNavigate();

  const handleHost = () => {
    socket.emit("createRoom");
  };

  useEffect(() => {
    socket.on("roomCreated", (room) => {
      console.log("New room created", room);
      navigate(`/host/${room.code}`);
    });

    return () => {
      socket.off("roomCreated");
    };
  }, [socket]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <button onClick={handleHost}>Host</button>
        <button onClick={() => navigate("/room/abc")}>Join</button>
      </div>
    </>
  );
};

export default Home;
