import React, { useState } from "react";

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
// import "./songCard.css";

function SongCard(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const toggleDetails = () => setShowDetails(!isOpen);

  const [artistReview, setArtistReview] = useState("");
  const [songReview, setSongReview] = useState("");

  return (
    <Col xs="6" sm="4" xl="2">
      <Card teal>
        <Row>
          <CardImg
            top
            width="100%"
            src={props.song.imageURL}
            alt=""
            onClick={toggleDetails}
          />
          <Col>
            <CardBody>
              <Col>
                <Collapse isOpen={showDetails}>
                  <CardTitle>{props.song.name}</CardTitle>
                  <CardSubtitle>{props.song.artist}</CardSubtitle>
                  <CardText></CardText>
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
