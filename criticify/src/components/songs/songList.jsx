// https://api.spotify.com/v1/me/player/recently-played
import React, { Component } from "react";
import SongCard from "./songCard";
import axios from "axios";
import { getStorage } from "../../utils/localStore";
import { Row } from "reactstrap";

async function getRecentlyPlayed() {
  const token = getStorage("access_token");
  let axiosObject = {
    method: "get",
    url: "https://api.spotify.com/v1/me/player/recently-played",
    headers: { Authorization: "Bearer " + token },
    json: true,
  };
  let songListObject = await axios(axiosObject);
  let songListMod = songListObject.data.items.map((song) => {
    return {
      id: song.track.id,
      name: song.track.name,
      artist: song.track.artists[0].name,
      imageURL: song.track.album.images[0].url,
    };
  });

  return songListMod;
}

const filterSongs = (songs) => {
  let songCounts = {};
  return songs.filter((song) => {
    songCounts[song.id] = (songCounts[song.id] || 0) + 1;
    return songCounts[song.id] === 1;
  });
};

class SongList extends Component {
  constructor(props) {
    super(props);
    this.token = props.access_token;
    this.state = {
      songList: [1, 2, 3],
    };
  }

  componentDidMount() {
    getRecentlyPlayed(this.token).then((response) => {
      const songListFiltered = filterSongs(response);
      this.setState({ songList: songListFiltered.slice(0, 12) });
    });
  }

  render() {
    return (
      <Row>
        {this.state.songList.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </Row>
    );
  }
}

export default SongList;
