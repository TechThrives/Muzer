import {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect
  } from 'react';

  const AudioPlayerContext = createContext(null);
  
  export const AudioPlayerProvider = ({children}) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isUserInteracted, setIsUserInteracted] = useState(false);
  
    const audioRef = useRef(null);
    const progressBarRef = useRef(null);

    useEffect(() => {
      const handleUserInteraction = () => {
        setIsUserInteracted(true);
        window.removeEventListener("click", handleUserInteraction);
        window.removeEventListener("keypress", handleUserInteraction);
      };
  
      window.addEventListener("click", handleUserInteraction);
      window.addEventListener("keypress", handleUserInteraction);
  
      return () => {
        window.removeEventListener("click", handleUserInteraction);
        window.removeEventListener("keypress", handleUserInteraction);
      };
    }, []);
  
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
      isUserInteracted,
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
  