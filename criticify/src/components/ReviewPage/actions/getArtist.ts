import Axios from "axios";
import { getStorage } from "../../../utils/localStore";
import { Dispatch } from "react";
import { defaultAlbum } from "../../../Pages/song";
import { getAlbum } from "./getAlbum";

export const REQUEST_SELECTED_ARTIST = "REQUEST_SELECTED_ARTIST";
export const REQUEST_SELECTED_ARTIST_SUCCESS =
  "REQUEST_SELECTED_ARTIST_SUCCESS";
export const REQUEST_SELECTED_ARTIST_FAILURE =
  "REQUEST_SELECTED_ARTIST_FAILURE";

export const getSongArtist = (artistID: string) => (
  dispatch: Dispatch<any>
) => {
  dispatch({ type: REQUEST_SELECTED_ARTIST });
  const token = getStorage("access_token");
  return Axios({
    method: "GET",
    url: "https://api.spotify.com/v1/artists/" + artistID,
    headers: { Authorization: "Bearer " + token },
  })
    .then((res) => {
      dispatch({
        type: REQUEST_SELECTED_ARTIST_SUCCESS,
        payload: {
          artist: {
            name: res.data.name,
            id: res.data.id,
            image: [res.data.images[0].url, res.data.images[1].url],
            description: "",
            albums: [defaultAlbum],
          },
        },
      });
      dispatch(getAlbum(res.data.id));
    })
    .catch((err) =>
      dispatch({
        type: REQUEST_SELECTED_ARTIST_FAILURE,
        payload: { error: { error: true, message: err.message } },
      })
    );
};
