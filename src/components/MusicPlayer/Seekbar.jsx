import React from "react";

const Seekbar = ({ value, min, max, onInput }) => {
  // converts the time to format 0:00
  const getTime = (time) =>
    `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

  return (
    <div className="flex flex-row container items-center absolute sm:top-[-36%] top-[-16%] left-0 w-full">
      <p className="text-white sm:block hidden">
        {value === 0 ? "0:00" : getTime(value)}
      </p>
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        className="sm:h-[2px] h-[3px] w-full sm:mx-2 mx-0 cursor-pointer"
      />
      <p className="text-white sm:block hidden">
        {max === 0 ? "0:00" : getTime(max)}
      </p>
    </div>
  );
};

export default Seekbar;
