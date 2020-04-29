import Axios from "axios";
import { getStorage } from "../../../utils/localStore";
import { Dispatch } from "react";
import {
  selectedSongType,
  defaultTrack,
  defaultAlbum,
} from "../../../Pages/song";

import { getSongArtist } from "./getArtist";

export const REQUEST_SELECTED_SONG = "REQUEST_SELECTED_SONG";
export const REQUEST_SELECTED_SONG_SUCCESS = "REQUEST_SELECTED_SONG_SUCCESS";
export const REQUEST_SELECTED_SONG_FAILURE = "REQUEST_SELECTED_SONG_FAILURE";

export const selectSongAction = (songID: string) => (
  dispatch: Dispatch<any>
) => {
  const token = getStorage("access_token");
  dispatch({ type: REQUEST_SELECTED_SONG });
  return Axios({
    method: "GET",
    url: "https:api.spotify.com/v1/tracks/" + songID,
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      const song: selectedSongType = {
        song: {
          id: res.data.id,
          title: res.data.name,
          duration: res.data.duration_ms,
        },
        artist: {
          name: res.data.artists[0].name,
          id: res.data.artists[0].id,
          image: [],
          description: "",
          albums: [defaultAlbum],
        },
        album: {
          name: res.data.album.name,
          image: res.data.album.images[0].url,
          tracks: [defaultTrack],
          albumID: res.data.album.id,
        },
      };
      dispatch({ type: REQUEST_SELECTED_SONG_SUCCESS, payload: song });
      dispatch(getSongArtist(res.data.artists[0].id));
    })
    .catch((err) =>
      dispatch({ type: REQUEST_SELECTED_SONG_FAILURE, payload: { error: err } })
    );
};
