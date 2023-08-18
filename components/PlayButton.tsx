import React from "react";
import { FaPlay } from "react-icons/fa";

const PlayButton = () => {
  return (
    <button
      className="flex items-center p-4 rounded-full opacity-0
     transition translate translate-y-1/4 bg-yellow-400
      drop-shadow-md group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110"
    >
      <FaPlay className="text-black" />
    </button>
  );
};

export default PlayButton;
