import React from "react";

const TitleCard = (props) => {
  return (
    <div className="title">
      <p>{props.songTitle}</p>
      <p>{props.artist}</p>
      <p>{props.album} </p>
      <div className="title-box-underline"></div>
    </div>
  );
};

export default TitleCard;
