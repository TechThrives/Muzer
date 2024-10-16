import React, { useState, useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import { useAudioPlayer } from "../context/AudioPlayerContext";
import { useAuth } from "../context/AuthContext";
import fetchService from "../services/fetchService";

const useRoom = (roomCode) => {
  const { onEvent, emitEvent } = useSocket();
  const { user } = useAuth();
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [roomData, setRoomData] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const { setCurrentSong, setIsPlaying, setTimeProgress } = useAudioPlayer();

  useEffect(() => {
    const cleanupRoomData = onEvent("roomData", (roomData) => {
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

    const cleanupSongData = onEvent("songData", (songData) => {
      setSongs(songData);
    });

    return () => {
      if (cleanupRoomData) {
        cleanupRoomData();
      }

      if (cleanupSongData) {
        cleanupSongData();
      }
    };
  }, [roomCode, onEvent]);

const getRoomData = async () => {
  const url = `/api/room/${roomCode}`;
    const options = {
      method: "GET",
      credentials: "include",
    };

    const data = await fetchService(url, options);

    if (data) {
      setRoomData(data);
      setIsFavorite(data.isFavorite);
    }
    setIsLoading(false);
  }


  useEffect(() => {
    emitEvent("joinRoom", { roomCode });
    getRoomData();

  }, [roomCode, emitEvent]);


  const handleVote = (songId, voteValue) => {
    const songData = {
      roomCode,
      userId: user.id,
      songId,
      voteValue,
    };
    emitEvent("voteSong", songData);
  };

  const addSong = (song) => {
    const songData = {...song, addedById: user.id };
    emitEvent("addSong", { roomCode, songData });
  };

  return {isLoading, songs, handleVote, addSong, roomData, isFavorite , setIsFavorite};
};

export default useRoom;
