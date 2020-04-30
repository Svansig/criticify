import React from "react";
import { Col, Row } from "reactstrap";

type albumHeaderProps = {
  albumName: string;
  image: string;
};

const AlbumHeader = (props: albumHeaderProps) => {
  return (
    <Col lg="9">
      <Row>{props.albumName}</Row>
      <Row>
        <img width="100%" height="100%" alt="" src={props.image} />
      </Row>
    </Col>
  );
};

export default AlbumHeader;
