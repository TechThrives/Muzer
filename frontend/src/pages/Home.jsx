import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import fetchService from "../services/fetchService";
import RoomCard from "../components/RoomCard";

const Home = () => {
  const { onEvent } = useSocket();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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
    <div>
      <div className="container mx-auto p-4 space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Your Hosted Rooms</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 10 }).map((room, index) => (
              <RoomCard key={index} room={room} isHosted={true} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Favorite Rooms</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 10 }).map((room, index) => (
              <RoomCard key={index} room={room} isHosted={false} />
            ))}
          </div>
        </section>
      </div>
      {/* <button onClick={handleHost}>Host</button>
      <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
};

export default Home;
