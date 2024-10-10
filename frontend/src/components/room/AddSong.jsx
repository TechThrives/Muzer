import React, { useState } from "react";
import BottomSheet from "../BottomSheet";
import { BsPlus, BsSearch } from "react-icons/bs";

const AddSong = ({ open, setOpen, addSong }) => {
    const [title, setTitle] = useState("");
    const [songs, setSongs] = useState([]);

  const handleSearch = async(e) => {
    e.preventDefault();
    console.log(title);
    const url = "https://saavn.dev/api/search/songs?query=" + title;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      if(data.success){
        const songsData = data.data.results.map(song => ({
            title: song.name,
            artist: song.artists.primary.map(artist => artist.name).join(", "),
            thumbnail: song.image[song.image.length - 1].url,
            label: song.label,
            language: song.language,
            duration: song.duration,
            year: parseInt(song.year),
            src: song.downloadUrl[song.downloadUrl.length - 1].url,
        }));

        setSongs(songsData);
        return;
      }
    }
  };

  return (
    <BottomSheet setOpen={setOpen} open={open} title="Add Song">
      <div class="bg-white shadow-md  relative rounded-xl flex mb-4">
        <span class="w-auto flex justify-end  items-center text-gray-500 p-2">
          <BsSearch />
        </span>
        <input
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          class="outline-none w-full rounded-xl p-2"
          type="text"
          placeholder="What are you looking for?"
        />
        <button
          onClick={handleSearch}
          class="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out rounded-xl text-white text-md p-2 m-2"
        >
          <BsSearch />
        </button>
      </div>
      <div className="overflow-y-auto rounded-md h-96">
      
          {songs.map((song, i) => (
            <div
              className="flex items-center justify-between p-3 hover:bg-gray-100 m-2 rounded-md shadow-md"
              key={i}
            >
              <div className="flex items-center">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={song.thumbnail}
                  alt="avatar"
                />
                <div className="ml-4">
                  <p className="text-md font-bold">{song.title}</p>
                  <p className="text-gray-500 text-[14px]">{song.artist}</p>
                  <p className="text-gray-500 text-[12px]">{song.year}</p>
                </div>
              </div>
              <button
                onClick={() => addSong(song)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out rounded-xl text-white text-md p-2 m-2"
              >
                <BsPlus />
              </button>
            </div>
          ))}
           
      </div>
    </BottomSheet>
  );
};

export default AddSong;
