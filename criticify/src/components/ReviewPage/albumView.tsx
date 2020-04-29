import React, { useState, useEffect } from "react";
import { albumType } from "../../Pages/song";
import { Collapse } from "reactstrap";
import { durationToTime } from "./songHeader";
import { useDispatch } from "react-redux";
import { getTracks } from "./actions/getTracks";

type albumViewProps = {
  album: albumType;
};

const AlbumView = ({ album }: albumViewProps) => {
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
    <div>
      <img alt="" src={album.image} onClick={toggle} />
      <Collapse isOpen={isOpen}>
        <p>{album.name}</p>
        {album.tracks.map((track) => {
          return (
            <div>
              <span>{track.track_num}</span>
              <span>{track.track_title}</span>
              <span>{durationToTime(track.duration)}</span>
            </div>
          );
        })}
      </Collapse>
    </div>
  );
};

export default AlbumView;
