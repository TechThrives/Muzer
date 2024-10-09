import React, { useState }from 'react';
import { RiMenuAddLine } from 'react-icons/ri';

import SongInfo from './SongInfo';
import Controls from './Controls';
import ProgressBar  from './ProgressBar';
import VolumeControl from './VolumeControl';
import { useAudioPlayer } from '../../context/AudioPlayerContext';

const AudioPlayer = () => {
  const { currentSong } = useAudioPlayer();

  return (
    <div>
      <div className="min-h-8 text-gray-800 flex flex-col sm:flex-row gap-6 justify-between items-center">
        {currentSong && <SongInfo />}
        <div className="w-full flex flex-col items-center m-auto flex-1">
          <ProgressBar />
          <div className="w-full flex flex-col items-center md:flex-row md:justify-center md:gap-20 px-8">
          <Controls />
          <VolumeControl />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
