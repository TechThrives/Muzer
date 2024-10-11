import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { IoMdMusicalNotes } from "react-icons/io";
import { TbUser, TbCalendarEvent } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ room }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all hover:scale-105"
    onClick={() => {navigate(`/room/${room.code}`)}}>
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{room.name || "Untitled Room"}</h3>
          <span className="text-sm font-normal bg-white bg-opacity-20 px-2 py-1 rounded">
            Code: {room.code}
          </span>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TbUser className="h-5 w-5 text-gray-500" />
            <span className="text-gray-700">{room.host.name}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {room.currentSong ? (
            <img
              src={room.currentSong.thumbnail}
              className="h-5 w-5 rounded-full animation-spin"
            />
          ) : (
            <IoMdMusicalNotes className="h-5 w-5 text-gray-500" />
          )}
          <span className="text-gray-700 truncate">
            {room.currentSong ? room.currentSong.title : "No song playing"}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <TbCalendarEvent className="h-5 w-5" />
          <span>Created {new Date(room.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
