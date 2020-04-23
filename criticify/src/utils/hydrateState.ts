import axios from "axios";
import { getStorage, setStorage } from "./localStore";
import querystring from "querystring";

// First, check to see if there is a currently playing song.
const currentlyPlaying = async () => {
  const token = getStorage("access_token");
  let songObject = await axios({
    method: "get",
    url: "https://api.spotify.com/v1/me/player/currently-playing",
    headers: { Authorization: "Bearer " + token },
  });
  if (songObject.data) setStorage("context_uri", songObject.data.context.uri);
  return songObject.data;
};

// Then, check last played song.
const previousSong = async () => {
  const token = getStorage("access_token");
  let songListObject = await axios({
    method: "get",
    url:
      "https://api.spotify.com/v1/me/player/recently-played?" +
      querystring.stringify({ limit: 1 }),
    headers: { Authorization: "Bearer " + token },
  });
  return songListObject.data.items;
};

// Set the previous song as the currently playing.
const hydrateState = () => {
  console.log("called hydratestate");
  currentlyPlaying().then((res) => {
    console.log(res);
    if (!res) {
      // console.log("no currently playing");
      previousSong().then((resp) => {
        // console.log(resp);
        if (Array.isArray(resp)) {
          return resp[0].track.id;
        }
      });
    } else {
      return res.item.id;
    }
  });
};

export default hydrateState;
