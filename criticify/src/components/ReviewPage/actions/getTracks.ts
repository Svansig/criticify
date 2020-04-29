import Axios from "axios";
import { getStorage } from "../../../utils/localStore";
import { Dispatch } from "react";
import querystring from "querystring";
import { track } from "../../../Pages/song";

export const REQUEST_ALBUM_TRACKS = "REQUEST_ALBUM_TRACKS";
export const REQUEST_ALBUM_TRACKS_SUCCESS = "REQUEST_ALBUM_TRACKS_SUCCESS";
export const REQUEST_ALBUM_TRACKS_FAILURE = "REQUEST_ALBUM_TRACKS_FAILURE";

export const getTracks = (albumID: string) => (dispatch: Dispatch<any>) => {
  dispatch({ type: REQUEST_ALBUM_TRACKS });
  const token = getStorage("access_token");
  return Axios({
    method: "GET",
    url: `https://api.spotify.com/v1/albums/${albumID}/tracks`,
    headers: { Authorization: "Bearer " + token },
  })
    .then((res) => {
      const albumTracks = res.data.items.map(
        (track: any): track => {
          return {
            track_num: track.track_number,
            track_title: track.name,
            id: track.id,
            duration: track.duration_ms,
          };
        }
      );
      dispatch({
        type: REQUEST_ALBUM_TRACKS_SUCCESS,
        payload: {
          albumID: albumID,
          tracks: albumTracks,
        },
      });
    })
    .catch((err) =>
      dispatch({
        type: REQUEST_ALBUM_TRACKS_FAILURE,
        payload: {
          error: {
            error: true,
            message: err.message,
          },
        },
      })
    );
};
