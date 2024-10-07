import {
    createContext,
    useContext,
    useState,
    useRef,
  } from 'react';

  const AudioPlayerContext = createContext(null);
  
  export const AudioPlayerProvider = ({children}) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
  
    const audioRef = useRef(null);
    const progressBarRef = useRef(null);
  
    const contextValue = {
      currentSong,
      setCurrentSong,
      audioRef,
      progressBarRef,
      timeProgress,
      setTimeProgress,
      duration,
      setDuration,
      isPlaying,
      setIsPlaying,
    };
  
    return (
      <AudioPlayerContext.Provider value={contextValue}>
        {children}
      </AudioPlayerContext.Provider>
    );
  };
  
  export const useAudioPlayer = () => {
    const context = useContext(AudioPlayerContext);
  
    if (context === undefined) {
      throw new Error(
        'useAudioPlayer must be used within an AudioPlayerProvider'
      );
    }

    return context;
  };
  