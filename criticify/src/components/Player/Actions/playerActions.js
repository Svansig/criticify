export const PLAY = "PLAY";
export const PAUSE = "PAUSE";
export const NEXT_TRACK = "NEXT_TRACK";

export const playCurrent = (trackID) => {
  return {
    type: PLAY,
    payload: trackID,
  };
};

export const pause = () => {
  return {
    type: PAUSE,
  };
};

export const playNext = (trackID) => {
  return {
    type: NEXT_TRACK,
    payload: trackID,
  };
};
