import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { playSpecific } from "../Player/Actions/playerActions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

type albumHeaderProps = {
  albumName: string;
  albumID: string;
  image: string;
};

const AlbumHeader = (props: albumHeaderProps) => {
  const [selected, setSelected] = useState(false);
  const albumURI = `spotify:album:${props.albumID}`;
  const dispatch = useDispatch();

  return (
    <div
      className="flex flex-col flex-1 relative"
      onClick={() => setSelected(!selected)}
    >
      <div
        className={selected ? "absolute" : "hidden"}
        onClick={() => setSelected(false)}
      >
        {/* <FontAwesomeIcon icon={faPlayCircle}  /> */}
        <div
          className="text-lg text-black"
          onClick={() => dispatch(playSpecific({ album: albumURI }))}
        >
          Play This Album
        </div>
      </div>
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
