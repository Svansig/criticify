import axios from "axios";
import { getStorage, setStorage } from "./localStore";

// First, check to see if there is a currently playing song.
const currentlyPlaying = async () => {
  const token = getStorage("access_token");
  let axiosObject = {
    method: "get",
    url: "https://api.spotify.com/v1/me/player/currently-playing",
    headers: { Authorization: "Bearer " + token },
    json: true,
  };
  let songObject = await axios(axiosObject);
  if (songObject.data) setStorage("context_uri", songObject.data.context.uri);
  return songObject.data;
};

// Then, check last played song.
const previousSong = async () => {
  const token = getStorage("access_token");
  let axiosObject = {
    method: "get",
    url: "https://api.spotify.com/v1/me/player/recently-played",
    headers: { Authorization: "Bearer " + token },
    json: true,
  };
  let songListObject = await axios(axiosObject);
  return songListObject;
};

// Set the previous song as the currently playing.

const hydrateState = () => {
  currentlyPlaying().then((res, rej) => {
    if (!res) {
      previousSong().then((resp) => {
        setStorage("context_uri", resp[0].context.uri);
      });
    } else {
      setStorage("context_uri", res.context.uri);
    }
  });
};

export default hydrateState;
