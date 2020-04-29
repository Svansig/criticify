import { getStorage } from "../../../utils/localStore";
import querystring from "query-string";
import axios from "axios";

export const PLAY = "PLAY";
export const PAUSE = "PAUSE";
export const NEXT_TRACK = "NEXT_TRACK";

export const LOADING_NEW_SONG = "LOADING_NEW_SONG";
export const LOADING_NEW_SONG_SUCCESS = "LOADING_NEW_SONG_SUCCESS";
export const LOADING_NEW_SONG_FAILURE = "LOADING_NEW_SONG_FAILURE";

export const playCurrent = (trackID) => {
  return {
    type: PLAY,
    payload: trackID,
  };
};

export const playSpecific = (trackURI) => (dispatch) => {
  dispatch({ type: LOADING_NEW_SONG });
  const token = getStorage("access_token");
  const deviceID = [getStorage("device_id")];
  console.log(trackURI);
  return axios({
    method: "PUT",
    url:
      "https://api.spotify.com/v1/me/player/play?" +
      querystring.stringify({ device_id: deviceID }),
    headers: {
      Authorization: "Bearer " + token,
    },
    data: {
      uris: [trackURI],
    },
  })
    .then((res) => {
      dispatch({ type: LOADING_NEW_SONG_SUCCESS, payload: res });
    })
    .catch((err) =>
      dispatch({
        type: LOADING_NEW_SONG_FAILURE,
        payload: { error: err.message },
      })
    );
};

export const pause = () => {
  return {
    type: PAUSE,
  };
};

export const playNext = (trackID) => {
  return {
    type: NEXT_TRACK,
    payload: trackID,
  };
};
