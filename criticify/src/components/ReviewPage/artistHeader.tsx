import React, { useState } from "react";
import { albumType } from "../../Pages/song";
import { Collapse } from "reactstrap";
import AlbumView from "./albumView";

type artistHeaderProps = {
  artistName: string;
  artistDesc: string;
  albums: Array<albumType>;
};

const ArtistHeader = (props: artistHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <h1 onClick={toggle}>Artist Header</h1>
      <h1>{props.artistName}</h1>
      <Collapse isOpen={isOpen}>
        {props.albums.map((album) => {
          return <AlbumView album={album} />;
        })}
      </Collapse>
    </div>
  );
};

export default ArtistHeader;
