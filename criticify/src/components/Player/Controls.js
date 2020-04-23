import React from "react";
import axios from "axios";
import { getStorage } from "../../utils/localStore";
import hydrateState from "../../utils/hydrateState";

const playHere = () => {
  const token = getStorage("access_token");
  const deviceID = [getStorage("device_id")];
  console.log(deviceID);
  axios({
    method: "PUT",
    url: "https://api.spotify.com/v1/me/player",
    headers: {
      Authorization: "Bearer " + token,
    },
    data: {
      device_ids: deviceID,
      play: true,
    },
  }).then(console.log);
};

const Controls = (props) => {
  return (
    <div>
      <button className="play-btn" onClick={props.clickPlay}></button>
      <button
        className="play-btn"
        onClick={() => playHere(props.ID, props.context_uri)}
      >
        Play Here
      </button>
      <button className="next-btn" onClick={props.clickNext}></button>
      <button className="hydrate" onClick={hydrateState}>
        Hydrate
      </button>
    </div>
  );
};

export default Controls;
