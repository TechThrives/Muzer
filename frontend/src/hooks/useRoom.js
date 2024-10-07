import { useState, useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import { useAudioPlayer } from "../context/AudioPlayerContext";

const useRoom = (roomCode) => {
  const { socket } = useSocket();
  const [songs, setSongs] = useState([]);
  const { setCurrentSong, setIsPlaying, setTimeProgress, audioRef } =
    useAudioPlayer();

  useEffect(() => {
    socket.emit("joinRoom", { roomCode });

    socket.on("roomData", (roomData) => {
      setSongs(roomData.songs);
      setCurrentSong(roomData.currentSong);
      if (roomData.currentSong) {
        setIsPlaying(roomData.currentSong.isPlaying);
        setTimeProgress(roomData.currentSong.timeProgress);
      } else {
        setIsPlaying(false);
        setTimeProgress(0);
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
