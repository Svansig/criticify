import React, { useState, useEffect } from "react";
import { getStorage, setStorage } from "../../utils/localStore";
import refreshAuth from "../../utils/refresh_auth";
import AlbumArt from "./AlbumArt";
import TitleCard from "./TitleCard";
import axios from "axios";
import Controls from "./Controls";
import { setCurrentPlaying } from "./Actions/songState";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "reactstrap";
import { moveToRecentlyPlayed } from "../../components/songs/recentlyPlayedActions";
import { currentSong } from "./Reducer/current";

const addSpotifySdkToDom = () => {
  const spotifyScript = document.createElement("script");
  spotifyScript.id = "spotify-script";
  spotifyScript.type = "text/javascript";
  spotifyScript.async = false;
  spotifyScript.defer = false;
  spotifyScript.src = "https://sdk.scdn.co/spotify-player.js";

  document.head.appendChild(spotifyScript);
};

let player;

const handlePlay = () => {
  if (player !== undefined) player.play();
};

const handleNext = () => {
  if (player !== undefined) player.nextTrack();
};

const Player = () => {
  const dispatch = useDispatch();
  const currentlyPlayingSong = useSelector((state) => state.currentSong);

  useEffect(() => {
    async function getCurrentlyPlaying() {
      console.log("useEffect called.");
      const token = getStorage("access_token");
      let axiosObject = {
        method: "get",
        url: "https://api.spotify.com/v1/me/player/currently-playing",
        headers: { Authorization: "Bearer " + token },
        json: true,
      };
      let songObject = await axios(axiosObject);
      const current = songObject.data.item;
      if (current) {
        dispatch(
          setCurrentPlaying({
            title: current.name,
            artist: current.artists[0].name,
            album: current.album.name,
            albumURL: current.album.images[1].url,
          })
        );
      }
    }
    getCurrentlyPlaying();
  }, []);

  useEffect(() => {
    addSpotifySdkToDom();
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = getStorage("access_token");
      player = new window.Spotify.Player({
        name: "Criticify Spotify Integrated Player",
        getOAuthToken: (cb) => {
          cb(token);
        },
      });

      let currentSongID = "";

      // Error handling
      player.addListener("initialization_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("authentication_error", async ({ message }) => {
        await refreshAuth();
        console.error(message);
      });
      player.addListener("account_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("playback_error", ({ message }) => {
        console.error(message);
      });

      // Playback status updates
      player.addListener("player_state_changed", (state) => {
        if (state.track_window.current_track.id !== currentSongID) {
          dispatch(
            moveToRecentlyPlayed({
              title: state.track_window.current_track.name,
              album: state.track_window.current_track.album.name,
              artist: state.track_window.current_track.artists[0].name,
              albumURL: state.track_window.current_track.album.images[2].url,
              duration: state.track_window.current_track.duration_ms,
              songID: state.track_window.current_track.id,
            })
          );
          currentSongID = state.track_window.current_track.id;

          dispatch(
            setCurrentPlaying({
              title: state.track_window.current_track.name,
              album: state.track_window.current_track.album.name,
              artist: state.track_window.current_track.artists[0].name,
              albumURL: state.track_window.current_track.album.images[2].url,
              duration: state.track_window.current_track.duration_ms,
              songID: state.track_window.current_track.id,
            })
          );
          console.log(state);
        }
      });

      // Ready
      player.addListener("ready", ({ device_id }) => {
        setStorage("device_id", device_id);
        console.log("Ready with Device ID", device_id);
      });

      // Not Ready
      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      // Connect to the player!
      player.connect();
    };
  }, []);

  return (
    <div className="spotify-player">
      <Row>
        <Col>
          <AlbumArt sourceURL={currentlyPlayingSong.albumURL} />
        </Col>
        <Col>
          <TitleCard
            songTitle={currentlyPlayingSong.title}
            artist={currentlyPlayingSong.artist}
            album={currentlyPlayingSong.album}
          />
        </Col>
        <Controls clickPlay={handlePlay} clickNext={handleNext} />
      </Row>
    </div>
  );
};

export default Player;
