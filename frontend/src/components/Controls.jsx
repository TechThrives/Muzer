import { useCallback, useEffect, useRef, useState } from "react";
import {
  BsFillFastForwardFill,
  BsFillPauseFill,
  BsFillPlayFill,
  BsFillRewindFill,
} from "react-icons/bs";

import { useAudioPlayer } from "../context/AudioPlayerContext";
import { useSocket } from "../context/SocketContext";

const Controls = () => {
  const {
    currentSong,
    audioRef,
    setDuration,
    duration,
    setTimeProgress,
    timeProgress,
    progressBarRef,
    setCurrentSong,
    isPlaying,
    setIsPlaying,
  } = useAudioPlayer();

  const { socket } = useSocket();

  const [isUserInteracted, setIsUserInteracted] = useState(false);

  const updateSong = () => {
    socket.emit("updateSong",
     {
        songId: currentSong.id,
        isPlaying,
        timeProgress: parseInt(timeProgress),
        roomCode: "abc"
    });
};

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

  const playAnimationRef = useRef(null);

  const updateProgress = useCallback(() => {
    if (audioRef.current && progressBarRef.current && duration) {
      const currentTime = audioRef.current.currentTime;
      setTimeProgress(currentTime);

      progressBarRef.current.value = currentTime.toString();
      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${(currentTime / duration) * 100}%`
      );
    }
  }, [duration, setTimeProgress, audioRef, progressBarRef]);

  const startAnimation = useCallback(() => {
    if (audioRef.current && progressBarRef.current && duration) {
      const animate = () => {
        updateProgress();
        playAnimationRef.current = requestAnimationFrame(animate);
      };
      playAnimationRef.current = requestAnimationFrame(animate);
    }
  }, [updateProgress, duration, audioRef, progressBarRef]);

  useEffect(() => {
    audioRef.current.currentTime = timeProgress;
    if (isPlaying && isUserInteracted) {
      audioRef.current?.play();
      startAnimation();
    } else {
      audioRef.current?.pause();
      if (playAnimationRef.current !== null) {
        cancelAnimationFrame(playAnimationRef.current);
        playAnimationRef.current = null;
      }
      updateProgress();
    }
  }, [isPlaying, startAnimation, updateProgress, audioRef, isUserInteracted]);

  const onLoadedMetadata = () => {
    const seconds = audioRef.current?.duration;
    if (seconds !== undefined) {
      setDuration(seconds);
      if (progressBarRef.current) {
        progressBarRef.current.max = seconds.toString();
      }
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 15;
      updateProgress();
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 15;
      updateProgress();
    }
  };

  useEffect(() => {
    const currentAudioRef = audioRef.current;

    if (currentAudioRef) {
      currentAudioRef.onended = () => {
        console.log("onended");
        // Play next song from the queue which is higher in the list
      };
    }

    return () => {
      if (currentAudioRef) {
        currentAudioRef.onended = null;
      }
    };
  }, [audioRef]);

  return (
    <div className="flex gap-4 items-center">
      <audio
        src={currentSong.src}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={updateSong}
      />
      <button onClick={skipBackward}>
        <BsFillRewindFill size={20} />
      </button>
      <button onClick={() => setIsPlaying((prev) => !prev)}>
        {isPlaying ? (
          <BsFillPauseFill size={30} />
        ) : (
          <BsFillPlayFill size={30} />
        )}
      </button>
      <button onClick={skipForward}>
        <BsFillFastForwardFill size={20} />
      </button>
    </div>
  );
};

export default Controls;