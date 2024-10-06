import { useState, useEffect } from "react";
import { useSocket } from "../context/SocketContext";

const useRoom = (roomCode) => {
  const { socket } = useSocket();
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    socket.emit("joinRoom", { roomCode });

    socket.on("roomData", (room) => {
      console.log(room);
      setSongs(room.songs);
      setCurrentSong(room.currentSong);
    });

    return () => {
      socket.off("roomData");
    };
  }, [socket, roomCode]);

  const handleVote = (songId, voteValue) => {
    const songData = { roomCode, userId: "51c5e434-9302-4de1-ad85-a3f5cef20bef", songId, voteValue };
    socket.emit("voteSong", songData);
  };

  const addSong = ({ roomCode, newSong }) => {
    socket.emit("addSong", { roomCode, newSong });
    // setNewSong({ url: "" });
  };

  return { songs, currentSong, handleVote, addSong };
};

export default useRoom;
