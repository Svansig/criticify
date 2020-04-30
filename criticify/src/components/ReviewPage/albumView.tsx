import React, { useState, useEffect } from "react";
import { albumType } from "../../Pages/song";
import { Collapse, Button, Col, Row } from "reactstrap";
import { durationToTime } from "./songHeader";
import { useDispatch } from "react-redux";
import { getTracks } from "./actions/getTracks";
import { playSpecific } from "../Player/Actions/playerActions";
import { selectSongAction } from "./actions/selectSong";
import "./albumView.css";

type albumViewProps = {
  album: albumType;
  closeHeader: () => void;
};

const AlbumView = ({ album, closeHeader }: albumViewProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [firstOpen, setFirstOpen] = useState(false);
  const dispatch = useDispatch();
  const toggle = () => {
    setFirstOpen(true);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    dispatch(getTracks(album.albumID));
  }, [firstOpen]);

  return (
    <div className="albumView">
      <Row>
        <Col lg="12">
          <img
            width="180"
            height="180"
            alt=""
            src={album.image}
            onClick={toggle}
          />
        </Col>
        <Collapse isOpen={isOpen}>
          <h1 className="trackList">{album.name}</h1>

          {album.tracks.map((track) => {
            return (
              <Row className="trackList" lg="5">
                <Col className="trackCol">{track.track_num}</Col>
                <Col className="trackCol">
                  <Button
                    onClick={() =>
                      dispatch(playSpecific(`spotify:track:${track.id}`))
                    }
                  >
                    Play It!
                  </Button>
                </Col>
                <Col sm="6" className="trackCol">
                  {track.track_title}
                </Col>
                <Col className="trackCol">{durationToTime(track.duration)}</Col>
                <Col className="trackCol">
                  <Button
                    onClick={() => {
                      setIsOpen(false);
                      closeHeader();
                      dispatch(selectSongAction(track.id));
                    }}
                  >
                    Review It!
                  </Button>
                </Col>
              </Row>
            );
          })}
        </Collapse>
      </Row>
    </div>
  );
};

export default AlbumView;
