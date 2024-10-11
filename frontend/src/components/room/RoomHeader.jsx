import React, { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineSave } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import fetchService from "../../services/fetchService";

const RoomHeader = ({ name }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [roomName, setRoomName] = useState(name || "Unnamed Room");
  const navigate = useNavigate();

  const { roomCode } = useParams();

  useEffect(() => {
      setRoomName(name || "Unnamed Room");
  }, [name]);

  const toggleEditMode = async () => {
    if (isEditing) {
      const url = `/api/room/${roomCode}/name`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name: roomName }),
      };
      await fetchService(url, options);
    }
    setIsEditing(!isEditing);
  };

  const handleNameChange = (e) => {
    setRoomName(e.target.value);
  };

  const handleExit = async () => {
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleEditMode}
          className="p-2 rounded hover:bg-gray-300 transition-all"
        >
          {isEditing ? (
            <AiOutlineSave className="text-xl text-violet-500" />
          ) : (
            <AiOutlineEdit className="text-xl text-violet-500" />
          )}
        </button>
        {isEditing ? (
          <input
            type="text"
            value={roomName}
            onChange={handleNameChange}
            className="text-2xl font-bold border-b-2 border-gray-300 w-4/6 focus:border-violet-500 outline-none"
          />
        ) : (
          <h1 className="text-2xl font-bold">{roomName}</h1>
        )}
      </div>
      <button
        className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        onClick={handleExit}
      >
        Exit
      </button>
    </header>
  );
};

export default RoomHeader;
