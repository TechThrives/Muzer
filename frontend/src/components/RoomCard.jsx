import React from "react";
import { IoMdMusicalNotes } from "react-icons/io";
import { TbUser, TbCalendarEvent } from "react-icons/tb";
import { FiCopy } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { notify } from "../services/toastService";

const RoomCard = ({ room }) => {
  const navigate = useNavigate();

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/room/${room.code}`)
      .then(() => {
        notify(200, "Code copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all hover:scale-105">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {room.name || "Untitled Room"}
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={copyToClipboard}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              <FiCopy className="h-5 w-5" />
            </button>
            <span className="text-sm font-normal bg-white bg-opacity-20 px-2 py-1 rounded">
              Code: {room.code}
            </span>
          </div>
        </div>
      </div>
      <div
        className="p-4 space-y-4"
        onClick={() => {
          navigate(`/room/${room.code}`);
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TbUser className="h-5 w-5 text-gray-500" />
            <span className="text-gray-600">{room.host.name}</span>
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
          <span className="text-gray-600 truncate">
            {room.currentSong ? room.currentSong.title : "No song playing"}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-gray-500">
          <TbCalendarEvent className="h-5 w-5" />
          <span className="text-gray-600">Created {new Date(room.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
