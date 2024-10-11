import { useParams } from "react-router-dom";
import useRoom from "../hooks/useRoom";
import { useAudioPlayer } from "../context/AudioPlayerContext";
import AddSong from "../components/room/AddSong";
import { useState } from "react";
import { BsMusicNoteBeamed, BsPlus } from "react-icons/bs";
import {
  AiFillLike,
  AiFillDislike,
  AiFillHeart,
  AiOutlineHeart,
} from "react-icons/ai";
import AnimatedBars from "../components/AnimatedBars";
import fetchService from "../services/fetchService";

const User = () => {
  const { roomCode } = useParams();
  const { songs, handleVote, addSong, isFavorite, setIsFavorite } =
    useRoom(roomCode);
  const { currentSong } = useAudioPlayer();
  const [open, setOpen] = useState(false);

  const durationToTime = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const addToFavorites = () => {
    setIsFavorite(!isFavorite);
    const url = `/api/room/${roomCode}/favorite`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    fetchService(url, options);
  };

  return (
    <div className="min-h-screen text-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-center mb-8">
          <h1 className="text-2xl font-bold">Room</h1>
        </header>

        <button
          onClick={addToFavorites}
          className={`absolute top-4 right-4 flex items-center justify-center bg-white p-2 rounded-full shadow-lg ${
            isFavorite && "animation-pulse"
          }`}
        >
          {isFavorite ? (
            <AiFillHeart className={`h-8 w-8 text-red-500`} />
          ) : (
            <AiOutlineHeart className={`h-8 w-8 text-red-500`} />
          )}
        </button>

        {/* Current Song (Music Player) */}
        <div className="rounded-lg mb-8">
          <h2 className="text-xl mb-4">Now Playing</h2>
          {currentSong ? (
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-md overflow-hidden">
                {currentSong.thumbnail ? (
                  <div className="relative w-full h-full">
                    <img
                      className="w-full h-full object-cover"
                      src={currentSong.thumbnail}
                      alt="audio avatar"
                    />

                    {currentSong.isPlaying && <AnimatedBars />}
                  </div>
                ) : (
                  <div className="relative flex items-center justify-center w-full h-full bg-gray-200 rounded-md">
                    <span className="text-xl text-gray-600">
                      <BsMusicNoteBeamed />
                    </span>

                    {currentSong.isPlaying && <AnimatedBars />}
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{currentSong.title}</h3>
                <p className="text-md italic font-medium">
                  {currentSong.artist}
                </p>
                <p>
                  {currentSong.language.charAt(0).toUpperCase() +
                    currentSong.language.slice(1)}
                </p>
                <p>
                  {durationToTime(currentSong.timeProgress)} -{" "}
                  {durationToTime(currentSong.duration)}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No song playing currently.</p>
          )}
        </div>

        {/* Playlist */}
        <div className="mb-8">
          <h2 className="text-xl mb-4">Playlist</h2>
          <ul className="space-y-4">
            {songs.map((song) => (
              <li
                key={song.id}
                className="cursor-pointer shadow-lg p-3 px-6 rounded-lg text-white flex flex-col items-start sm:flex-row sm:justify-between bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <div className="flex items-center gap-6">
                  {/* Thumbnail */}
                  <div className="h-12 w-12 min-w-12 min-h-12 sm:w-16 sm:h-16 sm:min-w-16 sm:min-h-16 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden shadow-inner">
                    {song.thumbnail ? (
                      <img
                        className="w-full h-full object-cover"
                        src={song.thumbnail}
                        alt="song thumbnail"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-gray-200">
                        <span className="text-3xl text-gray-400">
                          <BsMusicNoteBeamed />
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Song Info */}
                  <div className="space-y-1">
                    <h3 className="text-md md:text-md font-bold tracking-wide line-clamp-1">
                      {song.title}{" "}
                      <span className="text-sm font-normal italic">
                        {song.artist}
                      </span>
                    </h3>
                    <h5 className="text-sm ">
                      {song.year} -{" "}
                      {song.language.charAt(0).toUpperCase() +
                        song.language.slice(1)}{" "}
                      - {durationToTime(song.duration)}
                    </h5>
                  </div>
                </div>
                {/* Vote & Info */}
                <div className="flex items-center space-x-6">
                  {/* Vote Buttons */}
                  <div className="flex gap-2 mt-3 items-center">
                    <button
                      className="bg-green-500 hover:bg-green-600 p-2 rounded-full flex items-center justify-center shadow-md transform hover:rotate-6 transition-transform duration-200 ease-out"
                      onClick={() => handleVote(song.id, 1)}
                    >
                      <AiFillLike className="text-white text-md" />
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 p-2 rounded-full flex items-center justify-center shadow-md transform hover:-rotate-6 transition-transform duration-200 ease-out"
                      onClick={() => handleVote(song.id, -1)}
                    >
                      <AiFillDislike className="text-white text-md" />
                    </button>
                  </div>
                  <div className="mt-2 text-center text-md font-semibold">
                    <span className="block">{song.voteCount}</span>
                    <p className="text-xs">Votes</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div class="fixed bottom-4 right-4 floating-btn">
          <button
            onClick={() => setOpen(true)}
            class="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
          >
            <BsPlus className="w-6 h-6" />
          </button>
        </div>

        <AddSong open={open} setOpen={setOpen} addSong={addSong} />
      </div>
    </div>
  );
};

export default User;
