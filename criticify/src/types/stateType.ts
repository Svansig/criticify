import { song } from "./songType";

interface state {
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
  recentlyPlayed: song[];
  queue: song[];
  reviewed: song[];
}

export type { state };
