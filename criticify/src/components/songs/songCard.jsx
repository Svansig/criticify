import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import "./songCard.css";

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
    <animated.div
      style={selected}
      onClick={() => setSelectedSong(!selectedSong)}
      className="card"
    >
      <div>
        <img src={props.song.imageURL} alt=""></img>
      </div>

      <div className="songCol">
        <p className="track">{props.song.name}</p>
        <p className="artist">{props.song.artist}</p>
        {selectedSong ? <div>Rate: ######</div> : null}
        {selectedSong ? (
          <div>
            What you think boiiiii?!!!
            <input type="text" />
          </div>
        ) : null}
      </div>
    </animated.div>
  );
}

export default SongCard;
