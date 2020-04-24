import { song } from "../../../types/songType";

export const SET_CURRENT_PLAYING = "SET_CURRENT_PLAYING";

function setCurrentPlaying(song: song) {
  return {
    type: SET_CURRENT_PLAYING,
    payload: song,
  };
}

export { setCurrentPlaying };
