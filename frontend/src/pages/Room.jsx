import { useState, useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import { useParams } from "react-router-dom";

const Room = () => {
  const { socket } = useSocket();
  const { roomCode } = useParams();
  const [songs, setSongs] = useState([]);
  const [newSong, setNewSong] = useState({
    url: "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3",
    addedById: "51c5e434-9302-4de1-ad85-a3f5cef20bef",
  });
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    socket.on("roomData", (room) => {
      console.log(room);
      setSongs(room.songs);
      setCurrentSong(room.currentSong);
    });

    return () => {
      socket.off("roomData");
    };
  }, [socket]);

  useEffect(() => {
    socket.emit("joinRoom", { roomCode });

    return () => {
      socket.off("joinRoom");
    };
  }, [roomCode]);

  const handleVote = (songId, value) => {
    socket.emit("voteSong", { songId, value });
  };

  const handleAddSong = (e) => {
    e.preventDefault();
    socket.emit("addSong", { roomCode, newSong });
    // setNewSong({ url: "" });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Room</h1>
          
        </header>

        {/* Current Song (Music Player) */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl mb-4">Now Playing</h2>
          {currentSong ? (
            <div className="flex items-center">
              <div className="mr-6">
                <audio controls autoPlay src={currentSong.url} />
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
                className="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
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
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl mb-4">Add a New Song</h2>
          <form onSubmit={handleAddSong} className="space-y-4">
            <div>
              <label className="block mb-2">Song URL</label>
              <input
                type="url"
                className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600"
                value={newSong.url}
                onChange={(e) =>
                  setNewSong({ ...newSong, url: e.target.value })
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
