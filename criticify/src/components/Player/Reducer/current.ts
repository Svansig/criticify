import { song, defaultSong } from "../../../types/songType";
import { SET_CURRENT_PLAYING } from "../Actions/songState";

type actionType = {
  type: string;
  payload: song;
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
