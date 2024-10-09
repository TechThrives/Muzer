import { useParams } from "react-router-dom";
import useRoom from "../hooks/useRoom";
import AudioPlayer from "../components/audioPlayer/AudioPlayer";
import { useAudioPlayer } from "../context/AudioPlayerContext";
import { BsMusicNoteBeamed } from "react-icons/bs";

const Host = () => {
  const { roomCode } = useParams();
  const { songs } = useRoom(roomCode);
  const { currentSong } = useAudioPlayer();

  const durationToTime = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="min-h-screen text-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Host Room</h1>
          <button className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
            End Room
          </button>
        </header>

        {/* Current Song (Music Player) */}
        <div className="rounded-lg mb-8">
        <h2 className="text-xl mb-4">Now Playing</h2>
          {currentSong ? (
            <AudioPlayer />
          ) : (
            <p className="text-gray-400">No song playing currently.</p>
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
                {/* Vote Info */}
                  <div className="mt-2 text-center text-md font-semibold">
                    <span className="block">{song.voteCount}</span>
                    <p className="text-xs">Votes</p>
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
