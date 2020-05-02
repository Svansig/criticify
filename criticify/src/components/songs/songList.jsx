import React, { useEffect } from "react";
import SongCard from "./songCard";
import { getStorage } from "../../utils/localStore";
import { useSelector, useDispatch } from "react-redux";
import { getRecentlyPlayed } from "./recentlyPlayedActions";

const SongList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecentlyPlayed(getStorage("access_token")));
  }, [dispatch]);

  const recentlyPlayed = useSelector((state) => state.recentlyPlayed);

  return (
    <>
      {recentlyPlayed.loading && <h1>Is Loading.....</h1>}
      {recentlyPlayed.error && <h1>Error.....</h1>}
      {
        <div className="flex flex-wrap flex-row">
          {recentlyPlayed.songs.map((song) => (
            <SongCard key={song.songID} song={song} />
          ))}
        </div>
      }
    </>
  );
};

export default SongList;
