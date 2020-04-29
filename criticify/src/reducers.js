import { combineReducers } from "redux";
import { currentSong } from "./components/Player/Reducer/current";
import { recentlyPlayedReducer as recentlyPlayed } from "./components/songs/recentlyPlayedReducers";
import { selectedSong } from "./components/ReviewPage/reducers/selectedSong";

export default combineReducers({ currentSong, recentlyPlayed, selectedSong });
