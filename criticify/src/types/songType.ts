import { review } from "./reviewType";

export interface song {
  title: string;
  artist: string;
  album: string;
  albumURL: string;
  duration: number;
  songID: string;
  reviews: review[];
}

export const defaultSong: song = {
  title: "",
  artist: "",
  album: "",
  albumURL: "",
  duration: 0,
  songID: "",
  reviews: [],
};
