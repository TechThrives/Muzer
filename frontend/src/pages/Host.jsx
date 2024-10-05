import { useState, useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import { useParams } from "react-router-dom";

const Host = () => {
  const { socket } = useSocket();
  const { roomCode } = useParams();
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    // Fetch initial data like song list when the component loads
    socket.on("roomData", (room) => {
      setSongs(room.songs);
      setCurrentSong(room.currentSong);
    });

    return () => {
      socket.off("roomData");
    };
  }, [socket]);

  useEffect(() => {
    socket.emit("getRoom", { roomCode });
  }, [roomCode]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Host Room</h1>
          <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
            End Room
          </button>
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
                  <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded">
                    Upvote
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
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

      </div>
    </div>
  );
};

export default Host;
