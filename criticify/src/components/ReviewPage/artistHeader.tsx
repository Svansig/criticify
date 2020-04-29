import React from "react";

type artistHeaderProps = {
  artistName: string;
  image: string;
  artistDesc: string;
};

const ArtistHeader = (props: artistHeaderProps) => {
  return (
    <div>
      <h1>Artist Header</h1>
      <img alt="" src={props.image} />
    </div>
  );
};

export default ArtistHeader;
