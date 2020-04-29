import React from "react";

type songHeaderProps = {
  songTitle: string;
  duration: number;
};

const durationToTime = (duration: number): string => {
  const minutes = Math.floor(duration / 1000 / 60);
  const seconds = (duration / 1000) % 60;
  return `${minutes}:${seconds.toFixed(0).padStart(2, "0")}`;
};

const songHeader = (props: songHeaderProps) => {
  return (
    <div>
      {props.songTitle}
      {durationToTime(props.duration)}
    </div>
  );
};

export default songHeader;
