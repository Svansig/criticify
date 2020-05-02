import React, { useState, useEffect } from "react";
import { albumType } from "../../Pages/song";
import { durationToTime } from "./songHeader";
import { useDispatch } from "react-redux";
import { getTracks } from "./actions/getTracks";
import { playSpecific } from "../Player/Actions/playerActions";
import { selectSongAction } from "./actions/selectSong";

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
    <div className="w-1/8 mx-4 my-4 overflow-hidden">
      <img className=" h-32 w-32 " alt="" src={album.image} onClick={toggle} />
      <h1 className="text-xl w-32 font-bold whitespace-normal">{album.name}</h1>
      <div className={isOpen ? " flex flex-col" : "hidden"}>
        {album.tracks.map((track) => {
          return (
            <div className="flex flex-row">
              <div className=" w-6">{track.track_num}</div>
              <button
                className="w-24"
                onClick={() =>
                  dispatch(playSpecific(`spotify:track:${track.id}`))
                }
              >
                Play It!
              </button>
              <div className="w-64">{track.track_title}</div>
              <div className="w-24">{durationToTime(track.duration)}</div>
              <button
                className="3-24"
                onClick={() => {
                  setIsOpen(false);
                  closeHeader();
                  dispatch(selectSongAction(track.id));
                }}
              >
                Review It!
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlbumView;
