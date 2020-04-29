import React from "react";

type albumHeaderProps = {
  albumName: string;
  image: string;
};

const AlbumHeader = (props: albumHeaderProps) => {
  return (
    <div>
      {props.albumName}
      <img alt="" src={props.image} />
    </div>
  );
};

export default AlbumHeader;
