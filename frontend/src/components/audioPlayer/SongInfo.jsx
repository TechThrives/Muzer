import { BsMusicNoteBeamed } from "react-icons/bs";
import { useAudioPlayer } from "../../context/AudioPlayerContext";
import AnimatedBars from "../AnimatedBars";

const SongInfo = () => {
  const { currentSong, isPlaying } = useAudioPlayer();

  return (
    <div className="flex items-center gap-4">
      <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-md overflow-hidden">
        {currentSong.thumbnail ? (
          <div className="relative w-full h-full">
            <img
              className="w-full h-full object-cover"
              src={currentSong.thumbnail}
              alt="audio avatar"
            />

            {isPlaying && <AnimatedBars />}
          </div>
        ) : (
          <div className="relative flex items-center justify-center w-full h-full bg-gray-200 rounded-md">
            <span className="text-xl text-gray-600">
              <BsMusicNoteBeamed />
            </span>

            {isPlaying && <AnimatedBars />}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-xl font-semibold">{currentSong.title}</h3>
        <p className="text-md italic font-medium">{currentSong.artist}</p>
        <p>
          {currentSong.language.charAt(0).toUpperCase() +
            currentSong.language.slice(1)}
        </p>
      </div>
    </div>
  );
};

export default SongInfo;
