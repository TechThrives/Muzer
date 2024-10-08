import { BsMusicNoteBeamed } from 'react-icons/bs';
import { useAudioPlayer } from '../../context/AudioPlayerContext';

const SongInfo = () => {
  const { currentSong } = useAudioPlayer();

  return (
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
        <p className="font-bold lg:truncate lg:max-w-64">
          {currentSong.title}
        </p>
        <p className="text-sm text-gray-400">{currentSong.artist}</p>
      </div>
    </div>
  );
};

export default SongInfo;