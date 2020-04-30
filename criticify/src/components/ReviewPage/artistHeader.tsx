import React, { useState } from "react";
import { albumType } from "../../Pages/song";
import { Collapse, Col, Row } from "reactstrap";
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
    <Col lg="12">
      <div>
        <h1 onClick={toggle}>{props.artistName}</h1>
        <Collapse isOpen={isOpen}>
          <Row lg="6">
            {props.albums.map((album) => {
              return <AlbumView album={album} closeHeader={closeHeader} />;
            })}
          </Row>
        </Collapse>
      </div>
    </Col>
  );
};

export default ArtistHeader;
