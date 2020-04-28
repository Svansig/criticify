import { song, defaultSong } from "./songType";

export interface state {
  user: {
    username: string;
    id: string;
    authorized: Boolean;
  };
  playerStatus: {
    playing: boolean;
    position: number;
  };
  currentSong: song;
  recentlyPlayed: {
    loading: boolean;
    error: boolean;
    songs: song[];
  };
  queue: song[];
  reviewed: song[];
}

export const defaultState: state = {
  user: {
    username: "",
    id: "",
    authorized: false,
  },
  playerStatus: {
    playing: false,
    position: 0,
  },
  currentSong: defaultSong,
  recentlyPlayed: {
    loading: false,
    error: false,
    songs: [defaultSong],
  },
  queue: [defaultSong],
  reviewed: [defaultSong],
};
