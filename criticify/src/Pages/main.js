import React from "react";
import SongList from "../components/songs/songList";

const MainPage = () => {
  return (
    <div className="App">
      <div className="songlist">
        <SongList />
      </div>
    </div>
  );
};

export default MainPage;
