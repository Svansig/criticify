import { song, defaultSong } from "../../../types/songType";
import { SET_CURRENT_PLAYING } from "../Actions/songState";
import {
  LOADING_NEW_SONG,
  LOADING_NEW_SONG_SUCCESS,
  LOADING_NEW_SONG_FAILURE,
} from "../Actions/playerActions";

type actionType = {
  type: typeof SET_CURRENT_PLAYING | typeof LOADING_NEW_SONG_SUCCESS;
  payload: song;
};

type playFailureActionType = {
  type: typeof LOADING_NEW_SONG_FAILURE | typeof LOADING_NEW_SONG;
  payload: {
    error: string;
  };
};

type playerActionTypes = actionType | playFailureActionType;

export const currentSong = (state = defaultSong, action: playerActionTypes) => {
  switch (action.type) {
    case SET_CURRENT_PLAYING:
      return {
        ...state,

        ...action.payload,
      };
    case LOADING_NEW_SONG:
      return {
        ...state,
        loading: true,
        error: {
          error: false,
          message: "",
        },
      };
    case LOADING_NEW_SONG_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    case LOADING_NEW_SONG_FAILURE:
      return {
        ...state,
        loading: false,
        error: {
          error: true,
          message: action.payload.error,
        },
      };
    default:
      return state;
  }
};
