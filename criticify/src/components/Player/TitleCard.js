import React from "react";
import { Row, Col } from "reactstrap";
import "./TitleCard.css";

const TitleCard = (props) => {
  return (
    <span className="title">
      <Col>
        <Row className=".col">{props.songTitle}</Row>
        <br />
        <Row className=".col">{props.artist}</Row>
        <br />
        <Row className=".col">{props.album} </Row>
      </Col>
    </span>
  );
};

export default TitleCard;
