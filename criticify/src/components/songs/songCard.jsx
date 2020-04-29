import React, { useState } from "react";
import { playSpecific } from "../Player/Actions/playerActions";
import { useDispatch } from "react-redux";

import {
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  CardSubtitle,
  Button,
  Col,
  Row,
  Collapse,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";

function SongCard(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const toggleDetails = () => setShowDetails(!isOpen);

  const [artistReview, setArtistReview] = useState("");
  const [songReview, setSongReview] = useState("");
  const dispatch = useDispatch();

  return (
    <Col xs="6" sm="4" xl="2">
      <Card>
        <Row>
          <CardImg
            top
            width="100%"
            src={props.song.albumURL}
            alt=""
            onClick={toggleDetails}
          />
          <Col>
            <CardBody>
              <Col>
                <Collapse isOpen={showDetails}>
                  <CardTitle>{props.song.title}</CardTitle>
                  <CardSubtitle>{props.song.artist}</CardSubtitle>
                  <CardText></CardText>
                  <Button
                    onClick={() => dispatch(playSpecific(props.song.trackURI))}
                  >
                    Play Now
                  </Button>
                  <Button onClick={toggle}>Kayla Gonna Tell You!</Button>
                </Collapse>
              </Col>
              <Col>
                <Collapse isOpen={isOpen}>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>{props.song.artist}</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Rate The Artist"
                      value={artistReview}
                      onChange={(e) => setArtistReview(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>{props.song.name}</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Rate The Song"
                      value={songReview}
                      onChange={(e) => setSongReview(e.target.value)}
                    />
                  </InputGroup>
                </Collapse>
              </Col>
            </CardBody>
          </Col>
        </Row>
      </Card>
    </Col>
  );
}

export default SongCard;
