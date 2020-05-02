import React from "react";

type albumHeaderProps = {
  albumName: string;
  image: string;
};

const AlbumHeader = (props: albumHeaderProps) => {
  return (
    <div className="flex flex-col flex-1">
      <div>
        <img
          className="w-64 h-64 object-cover object-center mx-auto"
          alt=""
          src={props.image}
        />
      </div>
      <div className="text-xl text-gray-700 font-bold text-center">
        {props.albumName}
      </div>
    </div>
  );
};

export default AlbumHeader;
