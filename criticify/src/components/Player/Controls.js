import React from "react";
import axios from "axios";
import { getStorage } from "../../utils/localStore";
import hydrateState from "../../utils/hydrateState";
import { Row, Button, ButtonGroup } from "reactstrap";

export const playHere = () => {
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
    <div style={{ width: "60px", height: "60px" }}>
      <Row>
        <ButtonGroup>
          <Button outline className="play-btn" onClick={props.clickPlay}>
            Play
          </Button>
          <Button
            className="play-btn"
            onClick={() => playHere(props.ID, props.context_uri)}
          >
            Here
          </Button>
        </ButtonGroup>
      </Row>
      <Row>
        <ButtonGroup>
          <Button className="next-btn" onClick={props.clickNext}>
            Next
          </Button>
          <Button className="hydrate" onClick={hydrateState}>
            Hydrate
          </Button>
        </ButtonGroup>
      </Row>
    </div>
  );
};

export default Controls;
