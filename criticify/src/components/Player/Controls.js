import React from "react";
import axios from "axios";
import querystring from "querystring";
import { getStorage } from "../../utils/localStore";
import hydrateState from "../../utils/hydrateState";

const playHere = (deviceID, context_uri) => {
  const token = getStorage("access_token");
  axios({
    method: "PUT",
    url:
      "https://api.spotify.com/v1/me/player/play?" +
      querystring.stringify({ device_id: getStorage("device_id") }),
    headers: {
      Authorization: "Bearer " + getStorage("access_token"),
    },
    data: context_uri,
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
