import React from "react";

type artistSplashProps = {
  artistName: string;
  image: string;
};

const ArtistSplash = (props: artistSplashProps) => {
  return (
    <img
      className=" inset-0 fixed h-full w-full opacity-25 object-cover object-center "
      alt=""
      src={props.image}
      style={{ zIndex: -10 }}
    />
  );
};

export default ArtistSplash;
