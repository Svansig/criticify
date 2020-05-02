import React from "react";

const TitleCard = (props) => {
  return (
    <span className="flex flex-col text-gray-800 lowercase text-xl">
      <div className="font-bold">{props.songTitle}</div>
      <div className="font-hairline text-gray-600">{props.artist}</div>
      <div className="font-hairline text-gray-600">{props.album} </div>
    </span>
  );
};

export default TitleCard;
