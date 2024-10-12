import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import RoomCard from "../components/RoomCard";
import useHome from "../hooks/useHome";
import Loader from "../components/Loader";
import { FiLogOut } from "react-icons/fi";

const Home = () => {
  const { onEvent } = useSocket();
  const navigate = useNavigate();
  const { isLoading, hostedRooms, favoriteRooms, handleHost, handleLogout } =
    useHome();

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
      <div className="container mx-auto p-4 space-y-8 mb-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-600">
            Welcome to Muzer
          </h1>
          <button className="" onClick={handleLogout}>
            <FiLogOut className="h-5 w-5 text-red-500" />
          </button>
        </div>
        <section>
          <div className="flex justify-between items-center mb-6 text-gray-600">
            <h2 className="text-2xl font-bold">Your Hosted Rooms</h2>
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded"
              onClick={handleHost}
            >
              Host Room
            </button>
          </div>
          {isLoading ? (
            <Loader className="h-48" />
          ) : hostedRooms.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {hostedRooms.map((room, index) => (
                <RoomCard key={index} room={room} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-48">
              <p className="text-gray-500">You don't have any hosted rooms</p>
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-600">Favorite Rooms</h2>
          {isLoading ? (
            <Loader className="h-48" />
          ) : favoriteRooms.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {favoriteRooms.map((room, index) => (
                <RoomCard key={index} room={room} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-48">
              <p className="text-gray-500">You don't have any favorite rooms</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
