import React from "react";

const Track = ({ activeSong }) => (
  <div className="flex-1 gap-4 flex items-center justify-start">
    <img
      src={activeSong?.img}
      alt="cover art"
      className="sm:h-14 sm:w-14 h-12 w-12 rounded-lg object-cover"
    />
    <div className="w-[50%]">
      <p className="text-white font-bold text-lg">
        {activeSong?.name ? activeSong?.name : "No active Song"}
      </p>
      <p className="truncate text-gray">
        {activeSong?.author ? activeSong?.author : "No active Song"}
      </p>
    </div>
  </div>
);

export default Track;
