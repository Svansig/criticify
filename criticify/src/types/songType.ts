import { review } from "./reviewType";

interface song {
  title: string;
  artist: string;
  album: string;
  albumURL: string;
  duration: number;
  songID: string;
  reviews: review[];
}

export type { song };
