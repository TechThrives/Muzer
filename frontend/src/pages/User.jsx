import { useParams } from "react-router-dom";
import useRoom from "../hooks/useRoom";
import { useAudioPlayer } from "../context/AudioPlayerContext";
import AddSong from "../components/room/AddSong";
import { useState } from "react";
import { BsMusicNoteBeamed, BsPlus } from "react-icons/bs";
import { AiFillLike, AiFillDislike } from "react-icons/ai"

const User = () => {
  const { roomCode } = useParams();
  const { songs, handleVote, addSong } = useRoom(roomCode);
  const { currentSong } = useAudioPlayer();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen text-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Room</h1>
        </header>

        {/* Current Song (Music Player) */}
        <div className="rounded-lg p-6 mb-8">
          <h2 className="text-2xl mb-4">Now Playing</h2>
          {currentSong ? (
            <div className="flex items-center gap-4">
                <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-md overflow-hidden">
                  {currentSong.thumbnail ? (
                    <img
                      className="w-full h-full object-cover"
                      src={currentSong.thumbnail}
                      alt="audio avatar"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-md">
                      <span className="text-xl text-gray-600">
                        <BsMusicNoteBeamed />
                      </span>
                    </div>
                  )}
                </div>
              <div>
                <h3 className="text-xl font-semibold">{currentSong.title}</h3>
                <p>{currentSong.artist}</p>
              </div>
            </div>
          ) : (
            <p>No song playing currently.</p>
          )}
        </div>

        {/* Playlist */}
        <div className="mb-8">
          <h2 className="text-2xl mb-4">Playlist</h2>
          <ul className="space-y-4">
            {songs.map((song) => (
              <li
                key={song.id}
                className="shadow-md p-4 rounded-lg flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-md overflow-hidden">
                  {song.thumbnail ? (
                    <img
                      className="w-full h-full object-cover"
                      src={song.thumbnail}
                      alt="audio avatar"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-md">
                      <span className="text-xl text-gray-600">
                        <BsMusicNoteBeamed />
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{song.title}</h3>
                  <p>{song.artist}</p>
                </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
                    onClick={() => handleVote(song.id, 1)}
                  >
                    <AiFillLike className="text-white" />
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                    onClick={() => handleVote(song.id, -1)}
                  >
                    <AiFillDislike className="text-white" />
                  </button>
                  <span className="text-lg font-semibold text-center min-w-4">
                    {song.voteCount}
                  </span>
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
