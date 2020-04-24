import { song } from "../../../types/songType";
import { SET_CURRENT_PLAYING } from "../Actions/songState";

type actionType = {
  type: string;
  payload: song;
};

const defaultSong: song = {
  title: "",
  artist: "",
  album: "",
  albumURL: "",
  duration: 0,
  songID: "",
  reviews: [],
};

export const currentSong = (state = defaultSong, action: actionType) => {
  switch (action.type) {
    case SET_CURRENT_PLAYING:
      console.log("Current Song Reducer Called");
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
