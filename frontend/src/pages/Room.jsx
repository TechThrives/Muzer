import { useState } from "react";
import { useParams } from "react-router-dom";
import useRoom from "../hooks/useRoom";
import { useAudioPlayer } from "../context/AudioPlayerContext";

const Room = () => {
  const { roomCode } = useParams();
  const { songs, handleVote, addSong } = useRoom(roomCode);
  const { currentSong } = useAudioPlayer();
  const [newSong, setNewSong] = useState({
    src: "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3",
    title: "Kangaroo",
    artist: "MusiQue",
  });

  const handleAddSong = (e) => {
    e.preventDefault();
    addSong(newSong);
    // setNewSong({ src: "" });
  };

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
            <div className="flex items-center">
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
                <div>
                  <h3 className="text-xl font-semibold">{song.title}</h3>
                  <p>{song.artist}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
                    onClick={() => handleVote(song.id, 1)}
                  >
                    Upvote
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                    onClick={() => handleVote(song.id, -1)}
                  >
                    Downvote
                  </button>
                  <span className="text-lg font-semibold">
                    {song.voteCount}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Add New Song */}
        <div className="p-6 rounded-lg">
          <h2 className="text-2xl mb-4">Add a New Song</h2>
          <form onSubmit={handleAddSong} className="space-y-4">
            <div>
              <label className="block mb-2">Song URL</label>
              <input
                type="url"
                className="w-full px-4 py-2 rounded border border-gray-600"
                value={newSong.src}
                onChange={(e) =>
                  setNewSong({ ...newSong, src: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded w-full"
            >
              Add Song
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Room;
