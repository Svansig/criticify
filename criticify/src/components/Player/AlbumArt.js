import React from "react";

const AlbumArt = (props) => {
  return (
    <div className="album-frame">
      <img className="album" alt="" src={props.sourceURL}></img>;
    </div>
  );
};

export default AlbumArt;
