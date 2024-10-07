import React, { useState }from 'react';
import { RiMenuAddLine } from 'react-icons/ri';

import SongInfo from './SongInfo';
import Controls from './Controls';
import ProgressBar  from './ProgressBar';
import VolumeControl from './VolumeControl';
import { useAudioPlayer } from '../context/AudioPlayerContext';

const AudioPlayer = () => {
  const { currentSong } = useAudioPlayer();

  return (
    <div>
      <div className="min-h-8 bg-[#2e2d2d] flex flex-col gap-9 lg:flex-row justify-between items-center text-white p-[0.5rem_10px]">
        {currentSong && <SongInfo />}
        <div className="w-full flex flex-col items-center gap-1 m-auto flex-1">
          <Controls />
          <ProgressBar />
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <VolumeControl />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
