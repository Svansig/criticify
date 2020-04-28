import {
  MOVE_FINISHED_SONG_TO_RECENTLY_PLAYED,
  LOADING_RECENTLY_PLAYED_SUCCESS,
  LOADING_RECENTLY_PLAYED,
  LOADING_RECENTLY_PLAYED_ERROR,
  RecentlyPlayedActionTypes,
} from "./recentlyPlayedActions";
import { state, defaultState } from "../../types/stateType";

export const recentlyPlayedReducer = (
  state: state["recentlyPlayed"] = defaultState.recentlyPlayed,
  action: RecentlyPlayedActionTypes
): state["recentlyPlayed"] => {
  switch (action.type) {
    case MOVE_FINISHED_SONG_TO_RECENTLY_PLAYED:
      return { ...state, songs: [action.payload, ...state.songs] };
    case LOADING_RECENTLY_PLAYED:
      return { ...state, loading: true };
    case LOADING_RECENTLY_PLAYED_ERROR:
      console.log(action.payload.error);
      return { ...state, loading: false, error: true };
    case LOADING_RECENTLY_PLAYED_SUCCESS:
      return { ...state, loading: false, songs: [...action.payload] };

    default:
      return state;
  }
};
