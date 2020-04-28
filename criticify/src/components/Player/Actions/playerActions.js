export const PLAY = "PLAY";
export const PAUSE = "PAUSE";
export const NEXT_TRACK = "NEXT_TRACK";
import { getStorage } from "../../../utils/localStore";
import querystring from "query-string";

const playSong = (context_uri) => {
  const token = getStorage("access_token");
  const deviceID = [getStorage("device_id")];
  console.log(deviceID);
  return axios({
    method: "PUT",
    url:
      "https://api.spotify.com/v1/me/player/play?" +
      querystring.stringify({
        device_id: deviceID,
      }),
    headers: {
      Authorization: "Bearer " + token,
    },
    data: {
      context_uri: context_uri,
    },
  }).then(console.log);
};

export const LOADING_NEW_SONG = "LOADING_NEW_SONG";
export const LOADING_NEW_SONG_SUCCESS = "LOADING_NEW_SONG_SUCCESS";
export const LOADING_NEW_SONG_FAILURE = "LOADING_NEW_SONG_FAILURE";

export const playCurrent = (trackID) => {
  return {
    type: PLAY,
    payload: trackID,
  };
};

export const playSpecific = (context_uri) => (dispatch) => {
  dispatch({ type: LOADING_NEW_SONG });
  return playSong(context_uri).then(
    ((res) => {
      dispatch({ type: LOADING_NEW_SONG_SUCCESS, payload: res });
    }).catch((err) =>
      dispatch({
        type: LOADING_NEW_SONG_FAILURE,
        payload: { error: err.message },
      })
    )
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
