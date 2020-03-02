import React, { useState } from "react";
import queryString from "query-string";
import { useSpring, animated } from "react-spring";
import User from "./components/user";
import CurrentSong from "./components/currentlyPlaying";
import SongList from "./components/songs/songList";
import "./App.css";

function App() {
  let { access_token, refresh_token } = queryString.parse(window.location.hash);
  const [songListVisible, setSongListVisible] = useState(false);
  const songListAnimation = useSpring({
    opacity: songListVisible ? 1 : 0,
    transform: songListVisible ? `translateX(0)` : `translateX(100%)`
  });

  return (
    <div className="App">
      <button onClick={() => setSongListVisible(!songListVisible)}>
        Show Recent
      </button>
      {/* <h1>Kayla look, I did a thing!</h1> */}
      {!access_token && <a href="http://localhost:8888/login">Authorize</a>}
      {!access_token && <User access_token={access_token} />}
      <div className="rows">
        <CurrentSong access_token={access_token} />
      </div>
      <animated.div style={songListAnimation} className="songlist">
        <SongList access_token={access_token} />
      </animated.div>
    </div>
  );
}

export default App;
