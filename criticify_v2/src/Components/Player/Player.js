import React from "react";

const addSpotifySdkToDom = () => {
  const spotifyScript = document.createElement("script");
  spotifyScript.id = "spotify-script";
  spotifyScript.type = "text/javascript";
  spotifyScript.async = false;
  spotifyScript.defer = false;
  spotifyScript.src = "https://sdk.scdn.co/spotify-player.js";

  document.head.appendChild(spotifyScript);
};

let deviceId;

const playHandler = (deviceID) => {
  console.log(deviceID);
  fetch("https://api.spotify.com/v1/me/player/play?device_id=" + deviceID, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:
        "Bearer " +
        "BQBaUp27ZVcRsCOVIBSjeuLgErUbiVHRHKqC3PAYoGIrC0UBPYOOdNQz3tUdzGzeEWimRJ8tu-FV309ZWtwtlPZ3MTy9RqLe1aMyyx9qlzxuBsfzGPIdI48uFnncZrYCOUG2yswvMVsl2PkH-_YJ7wB0Z-XTmj1A6dZus9xLpms",
    },
  }).then((res, rej) => console.log(res, rej));
};

const Player = () => {
  addSpotifySdkToDom();

  window.onSpotifyWebPlaybackSDKReady = () => {
    const token =
      "BQBaUp27ZVcRsCOVIBSjeuLgErUbiVHRHKqC3PAYoGIrC0UBPYOOdNQz3tUdzGzeEWimRJ8tu-FV309ZWtwtlPZ3MTy9RqLe1aMyyx9qlzxuBsfzGPIdI48uFnncZrYCOUG2yswvMVsl2PkH-_YJ7wB0Z-XTmj1A6dZus9xLpms";
    const player = new window.Spotify.Player({
      name: "Criticify Spotify Integrated Player",
      getOAuthToken: (cb) => {
        cb(token);
      },
    });

    // Error handling
    player.addListener("initialization_error", ({ message }) => {
      console.error(message);
    });
    player.addListener("authentication_error", ({ message }) => {
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
      console.log(state);
    });

    // Ready
    player.addListener("ready", ({ device_id }) => {
      deviceId = device_id;
      console.log("Ready with Device ID", device_id);
    });

    // Not Ready
    player.addListener("not_ready", ({ device_id }) => {
      console.log("Device ID has gone offline", device_id);
    });

    // Connect to the player!
    player.connect();
  };

  return (
    <div>
      Spotify Player
      <button onClick={() => playHandler(deviceId)}>Play</button>
    </div>
  );
};

export default Player;
