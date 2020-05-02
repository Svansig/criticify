import React, { useState } from "react";
import { albumType } from "../../Pages/song";
import AlbumView from "./albumView";

type artistHeaderProps = {
  artistName: string;
  artistDesc: string;
  albums: Array<albumType>;
};

const ArtistHeader = (props: artistHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const closeHeader = () => setIsOpen(false);

  return (
    <div className="mx-auto my-6">
      <div className="text-center">
        <h1 className="text-6xl " onClick={toggle}>
          {props.artistName}
        </h1>
        <div
          className={
            isOpen ? "flex flex-row flex-wrap justify-start" : "hidden"
          }
        >
          {props.albums.map((album) => {
            return <AlbumView album={album} closeHeader={closeHeader} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ArtistHeader;
