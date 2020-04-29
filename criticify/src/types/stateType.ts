import { song, defaultSong } from "./songType";
import { selectedSongType } from "../Pages/song";
import { defaultSelectedSong } from "../components/ReviewPage/reducers/selectedSong";

export interface state {
  currentSong: song;
  recentlyPlayed: {
    loading: boolean;
    error: boolean;
    songs: song[];
  };
  selectedSong: selectedSongType;
}

export const defaultState = {
  currentSong: defaultSong,
  recentlyPlayed: {
    loading: false,
    error: false,
    songs: [defaultSong],
  },
  selectedSong: defaultSelectedSong,
};
