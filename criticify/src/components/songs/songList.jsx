import React, { Component } from "react";
import SongCard from "./songCard";
import axios from "axios";
import { useState } from "react";

async function getRecentlyPlayed(token) {
  // console.log("into function")
  let axiosObject = {
    method: "get",
    url: "https://api.spotify.com/v1/me/player/recently-played",
    headers: { Authorization: "Bearer " + token },
    json: true
  };
  let songListObject = await axios(axiosObject);
    // console.log(songListObject.data.items)
  let songListMod = songListObject.data.items.map(song => {
    return {
      id: song.track.id,
      name: song.track.name,
      artist: song.track.artists[0].name,
      imageURL: song.track.album.images[2].url
    };
  }).slice(0,8);
  return songListMod;
}

class SongList extends Component {
  constructor(props) {
    super(props);
    this.token = props.access_token;
    this.state = {
      songList: [1, 2, 3]
    };
  }

  componentDidMount() {
    getRecentlyPlayed(this.token).then(response => {
      this.setState({ songList: response });
    });
  }

  render() {
    return (
      <div>
        {this.state.songList.map(song => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    );
  }
}

export default SongList;

// https://api.spotify.com/v1/me/player/recently-played
