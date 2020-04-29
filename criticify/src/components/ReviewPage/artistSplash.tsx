import React from "react";

type artistSplashProps = {
  artistName: string;
  image: string;
};

const ArtistSplash = (props: artistSplashProps) => {
  return (
    <div>
      <h1>Artist Splash</h1>
      <img alt="" src={props.image} />
    </div>
  );
};

export default ArtistSplash;
