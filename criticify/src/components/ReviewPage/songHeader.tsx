import React from "react";

type songHeaderProps = {
  songTitle: string;
  duration: number;
};

export const durationToTime = (duration: number): string => {
  const minutes = Math.floor(duration / 1000 / 60);
  const seconds = (duration / 1000) % 60;
  return `${minutes}:${seconds.toFixed(0).padStart(2, "0")}`;
};

const songHeader = (props: songHeaderProps) => {
  return (
    <div className="flex-1 flex-col text-right mx-6">
      <div className="text-gray-800 font-black text-6xl leading-tight">
        {props.songTitle}
      </div>
      <div className="text-gray-800 font-hairline text-6xl">
        {durationToTime(props.duration)}
      </div>
    </div>
  );
};

export default songHeader;
