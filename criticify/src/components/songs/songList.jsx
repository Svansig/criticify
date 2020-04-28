// https://api.spotify.com/v1/me/player/recently-played
import React, { useEffect } from "react";
import SongCard from "./songCard";
import axios from "axios";
import { getStorage } from "../../utils/localStore";
import { Row } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getRecentlyPlayed } from "./recentlyPlayedActions";

const SongList = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecentlyPlayed(getStorage("access_token")));
  }, []);

  const recentlyPlayed = useSelector((state) => state.recentlyPlayed);

  return (
    <>
      {recentlyPlayed.loading && <h1>Is Loading.....</h1>}
      {recentlyPlayed.error && <h1>Error.....</h1>}
      {
        <Row>
          {recentlyPlayed.songs.map((song) => (
            <SongCard key={song.songID} song={song} />
          ))}
        </Row>
      }
    </>
  );
};

export default SongList;
