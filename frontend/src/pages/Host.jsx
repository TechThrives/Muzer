import { useParams } from "react-router-dom";
import useRoom from "../hooks/useRoom";
import AudioPlayer from "../components/audioPlayer/AudioPlayer";
import { useAudioPlayer } from "../context/AudioPlayerContext";

const Host = () => {
  const { roomCode } = useParams();
  const { songs } = useRoom(roomCode);
  const { currentSong } = useAudioPlayer();

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Host Room</h1>
          <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
            End Room
          </button>
        </header>

        {/* Current Song (Music Player) */}
        <div className=" rounded-lg p-6 mb-8">
          <h2 className="text-xl mb-4">Now Playing</h2>
          {currentSong ? (
            <AudioPlayer />
          ) : (
            <p className="text-gray-400">No song playing currently.</p>
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
                  <p className="text-gray-400">{song.artist}</p>
                </div>
                <div className="flex items-center space-x-4">
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
