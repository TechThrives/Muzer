import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { IoMdMusicalNotes } from "react-icons/io";
import { TbUser, TbCalendarEvent } from "react-icons/tb";

const RoomCard = ({ room }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-105">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{"Room Name"}</h3>
          <span className="text-sm font-normal bg-white bg-opacity-20 px-2 py-1 rounded">
            Code: {"Room Code"}
          </span>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TbUser className="h-5 w-5 text-gray-500" />
            <span className="text-gray-700">{"Host"}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {true ? (
            <img
              src="https://images.unsplash.com/photo-1726059968922-0396248fdaea"
              className="h-5 w-5 rounded-full animation-spin"
            />
          ) : (
            <IoMdMusicalNotes className="h-5 w-5 text-gray-500" />
          )}
          <span className="text-gray-700 truncate">
            {true ? "Current Song" : "No song playing"}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <TbCalendarEvent className="h-5 w-5" />
          <span>Created {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
