import { song } from "../../types/songType";
import Axios from "axios";
import { Dispatch } from "react";
import { action } from "../../types/actionType";
import querystring from "querystring";

export const NEXT_SONG = "NEXT_SONG";
export const MOVE_FINISHED_SONG_TO_RECENTLY_PLAYED =
  "MOVE_FINISHED_SONG_TO_RECENTLY_PLAYED";

interface moveSongAction {
  type: typeof MOVE_FINISHED_SONG_TO_RECENTLY_PLAYED;
  payload: song;
}
interface recentlyPlayedLoading {
  type: typeof LOADING_RECENTLY_PLAYED;
  payload: {
    loading: boolean;
  };
}
interface recentlyPlayedSuccess {
  type: typeof LOADING_RECENTLY_PLAYED_SUCCESS;
  payload: song[];
}

interface recentlyPlayedError {
  type: typeof LOADING_RECENTLY_PLAYED_ERROR;
  payload: {
    error: string;
  };
}

export type RecentlyPlayedActionTypes =
  | moveSongAction
  | recentlyPlayedLoading
  | recentlyPlayedSuccess
  | recentlyPlayedError;

export const moveToRecentlyPlayed = (song: song): moveSongAction => {
  return {
    type: MOVE_FINISHED_SONG_TO_RECENTLY_PLAYED,
    payload: song,
  };
};

export const LOADING_RECENTLY_PLAYED = "LOADING_RECENTLY_PLAYED";
export const LOADING_RECENTLY_PLAYED_ERROR = "LOADING_RECENTLY_PLAYED_ERROR";
export const LOADING_RECENTLY_PLAYED_SUCCESS =
  "LOADING_RECENTLY_PLAYED_SUCCESS";

export const getRecentlyPlayed = (token: string) => (
  dispatch: Dispatch<action>
) => {
  dispatch({
    type: LOADING_RECENTLY_PLAYED,
    payload: { loading: true },
  });
  return Axios({
    method: "GET",
    url:
      "https://api.spotify.com/v1/me/player/recently-played?" +
      querystring.stringify({ limit: 50 }),
    headers: { Authorization: "Bearer " + token },
  })
    .then((response) => {
      console.log(response);
      const seenSongs: { [key: string]: boolean } = {};
      const recentlyPlayedList = response.data.items
        .filter(({ track }: any) => {
          if (seenSongs[track["id"]]) return false;
          seenSongs[track["id"]] = true;
          return true;
        })
        .map(
          (song: any): song => {
            return {
              songID: song.track.id,
              trackURI: song.track.uri,
              title: song.track.name,
              artist: song.track.artists[0].name,
              album: song.track.album.name,
              albumURL: song.track.album.images[0].url,
              reviews: [],
              duration: song.track.duration,
            };
          }
        );
      dispatch({
        type: LOADING_RECENTLY_PLAYED_SUCCESS,
        payload: recentlyPlayedList,
      });
    })
    .catch((err) =>
      dispatch({
        type: LOADING_RECENTLY_PLAYED_ERROR,
        payload: { error: err.message },
      })
    );
};
