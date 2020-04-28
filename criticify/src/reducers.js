import { combineReducers } from "redux";
import { currentSong } from "./components/Player/Reducer/current";
import { recentlyPlayedReducer as recentlyPlayed } from "./components/songs/recentlyPlayedReducers";

export default combineReducers({ currentSong, recentlyPlayed });
