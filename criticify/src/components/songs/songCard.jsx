import React, { useState } from "react";
import { playSpecific } from "../Player/Actions/playerActions";
import { useDispatch } from "react-redux";
import { selectSongAction } from "../../components/ReviewPage/actions/selectSong";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

function SongCard(props) {
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => setShowDetails(!showDetails);

  const [artistReview, setArtistReview] = useState("");
  const [songReview, setSongReview] = useState("");
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col m-4 relative">
      <div>
        <img
          src={props.song.albumURL}
          alt=""
          onClick={toggleDetails}
          className="object-cover object-center w-64 h-64"
        />
      </div>
      <div
        onClick={() => setShowDetails(false)}
        className={showDetails ? "absolute" : "hidden"}
      >
        <div className="bg-gray-400 bg-opacity-75 block w-64 h-64">
          <div className="flex flex-col justify-between top-auto mx-auto">
            <div className="mx-auto">
              <div className="text-xl font-bold text-gray-800 mx-auto">
                {props.song.title}
              </div>
              <div className="text-2xl font-thin text-gray-900 mx-auto">
                {props.song.artist}
              </div>
            </div>
          </div>
          <div className="flex flex-col mx-auto p-6 ">
            <FontAwesomeIcon
              icon={faPlayCircle}
              className="my-2 fa-3x mx-auto"
              onClick={() =>
                dispatch(playSpecific({ track: props.song.trackURI }))
              }
            >
              Play Now
            </FontAwesomeIcon>

            <Link
              className="mx-auto p-6 my-2 text-md text-indigo-800 font-bold"
              to="/review"
              onClick={() => {
                dispatch(selectSongAction(props.song.songID));
              }}
            >
              Kayla Gonna Tell You!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SongCard;
