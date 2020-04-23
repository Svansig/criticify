import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
// import CurrentSong from "../components/currentlyPlaying";
import SongList from "../components/songs/songList";
import { getStorage } from "../utils/localStore";

const MainPage = () => {
  const [songListVisible, setSongListVisible] = useState(false);
  const songListAnimation = useSpring({
    opacity: songListVisible ? 1 : 0,
    transform: songListVisible ? `translateX(0)` : `translateX(100%)`,
  });
  const access_token = getStorage("access_token");

  return (
    <div className="App">
      <button onClick={() => setSongListVisible(!songListVisible)}>
        Show Recent
      </button>

      {/* <div className="rows">
        <CurrentSong access_token={access_token} />
      </div> */}
      <animated.div style={songListAnimation} className="songlist">
        <SongList access_token={access_token} />
      </animated.div>
    </div>
  );
};

export default MainPage;
