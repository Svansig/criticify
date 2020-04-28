import { song } from "./songType";

export type action = {
  type: string;
  payload?:
    | {
        [key: string]: string | boolean;
      }
    | string[]
    | song;
};
