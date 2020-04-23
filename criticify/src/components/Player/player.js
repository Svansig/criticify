import React, { useState, useEffect } from "react";
import { getStorage, setStorage } from "../../utils/localStore";
import refreshAuth from "../../utils/refresh_auth";
import AlbumArt from "./AlbumArt";
import TitleCard from "./TitleCard";
import axios from "axios";
import Controls from "./Controls";
import "./player.css";

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

const Player = (props) => {
  let [currentSong, setCurrentSong] = useState("");
  let [currentAlbum, setCurrentAlbum] = useState("");
  let [currentAlbumURL, setCurrentAlbumURL] = useState("");
  let [currentArtist, setCurrentArtist] = useState("");
  let [currentContextURI, setCurrentContextURI] = useState({
    context_uri: getStorage("context_uri"),
  });

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
        setCurrentSong(current.name);
        setCurrentAlbum(current.album.name);
        setCurrentAlbumURL(current.album.images[1].url);
        setCurrentArtist(current.artists[0].name);
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
        if (state) {
          setCurrentContextURI({
            context_uri: state.context.uri,
          });
          setCurrentAlbumURL(
            state.track_window.current_track.album.images[2].url
          );
          setCurrentAlbum(state.track_window.current_track.album.name);
          setCurrentArtist(state.track_window.current_track.artists[0].name);
          setCurrentSong(state.track_window.current_track.name);
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
      <div>Spotify Player</div>
      <AlbumArt sourceURL={currentAlbumURL} />
      <TitleCard
        songTitle={currentSong}
        album={currentAlbum}
        artist={currentArtist}
      />
      <Controls context_uri={currentContextURI} />
    </div>
  );
};

export default Player;
