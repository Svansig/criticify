import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  CardSubtitle,
  Button,
  Col,
} from "reactstrap";
// import "./songCard.css";

function SongCard(props) {
  const [selectedSong, setSelectedSong] = useState(false);
  const selected = useSpring({
    transform: selectedSong
      ? `translate3d(-12px, 12px, -13px) scale(1.03)`
      : `translate3d(0px, 0px, 0px) scale(1)`,
    zIndex: selectedSong ? 500 : 100,
    transformOrigin: `right top`,
  });
  return (
    <Col xs="6" sm="4" xl="2">
      <Card teal>
        <CardImg top width="100%" src={props.song.imageURL} alt="" />
        <CardBody>
          <CardTitle>{props.song.name}</CardTitle>
          <CardSubtitle>{props.song.artist}</CardSubtitle>
          <CardText></CardText>
          <Button>Rate It!</Button>
        </CardBody>
      </Card>
    </Col>
  );
}

export default SongCard;
