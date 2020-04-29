import Axios from "axios";
import { getStorage } from "../../../utils/localStore";
import { Dispatch } from "react";

export const REQUEST_SELECTED_ALBUM = "REQUEST_SELECTED_ALBUM";
export const REQUEST_SELECTED_ALBUM_SUCCESS = "REQUEST_SELECTED_ALBUM_SUCCESS";
export const REQUEST_SELECTED_ALBUM_FAILURE = "REQUEST_SELECTED_ALBUM_FAILURE";

export const getAlbum = (artistID: string) => (dispatch: Dispatch<any>) => {
  dispatch({ type: REQUEST_SELECTED_ALBUM });
  const token = getStorage("access_token");
  return Axios({
    method: "GET",
    url: `https://api.spotify.com/v1/artists/${artistID}/albums`,
    headers: { Authorization: "Bearer " + token },
  })
    .then((res) => {
      const artistAlbums = res.data.items.map((item: any) => {
        return {
          name: item.name,
          image: item.images[0].url,
          id: item.id,
          tracks: [],
        };
      });
      dispatch({ type: REQUEST_SELECTED_ALBUM_SUCCESS, payload: artistAlbums });
    })
    .catch((err) =>
      dispatch({
        type: REQUEST_SELECTED_ALBUM_FAILURE,
        payload: { error: { error: true, message: err.message } },
      })
    );
};
