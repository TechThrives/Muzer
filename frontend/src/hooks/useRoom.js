import { useState, useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import { useAudioPlayer } from "../context/AudioPlayerContext";

const useRoom = (roomCode) => {
  const { socket } = useSocket();
  const [songs, setSongs] = useState([]);
  const { setCurrentSong, setIsPlaying, setTimeProgress } = useAudioPlayer();

  useEffect(() => {
    socket.emit("joinRoom", { roomCode });

    socket.on("roomData", (room) => {
      setSongs(room.songs);
      if(room.currentSong){
        console.log(room.currentSong);
        setCurrentSong(room.currentSong);
        setIsPlaying(room.currentSong.isPlaying); // line causing error
        setTimeProgress(room.currentSong.timeProgress);
      }
    });

    return () => {
      socket.off("roomData");
    };
  }, [socket, roomCode]);

  const handleVote = (songId, voteValue) => {
    const songData = {
      roomCode,
      userId: "51c5e434-9302-4de1-ad85-a3f5cef20bef",
      songId,
      voteValue,
    };
    socket.emit("voteSong", songData);
  };

  const addSong = ({ roomCode, newSong }) => {
    socket.emit("addSong", { roomCode, newSong });
    // setNewSong({ url: "" });
  };

  return { songs, handleVote, addSong };
};

export default useRoom;
