import React from "react";
import axios from "axios";
import "./currentlyPlaying.css";
// import { library } from '@fortawesome/fontawesome-svg-core'
import { star } from "@fortawesome/fontawesome-free";
// import {star as solidStar} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// library.add(emptyStar)

async function getCurrentlyPlaying(token) {
  console.log("into function");
  let axiosObject = {
    method: "get",
    url: "https://api.spotify.com/v1/me/player/currently-playing",
    headers: { Authorization: "Bearer " + token },
    json: true
  };
  let songObject = await axios(axiosObject);
  //   console.log(songObject.data);
  //   this.setState({user:userObject.display_name}).bind(User)
  return songObject.data.item;
}

class CurrentSong extends React.Component {
  constructor(props) {
    super(props);
    this.token = props.access_token;
    this.state = {
      songName: "init",
      artistName: "init",
      albumArtUrl: "init",
      stars: 0
    };
  }

  starRating() {
    let rating = [];
    for (let i = 1; i < 6; i++) {
      if (i <= this.state.stars) {
        rating.push(<span className="rating">*</span>);
      } else {
        rating.push(<span className="rating">#</span>);
      }
    }

    return rating;
  }

  componentDidMount() {
    getCurrentlyPlaying(this.token).then(current => {
        // console.log(current)
      //   console.log(current.artists[0].name)
      //   console.log(current.album.images[1].url)
      this.setState({
        songName: current ? current.name : 'No current song',
        artistName: current ? current.artists[0].name : 'No current artist',
        albumArtUrl: current ? current.album.images[1].url : 'No album art'
      });
    });
  }

  render() {
    return (
      <div className="songFrame">
        <p>
          <p className="rating"> Current Song: </p>
          {this.starRating()}
          <img className="cover-art" src={this.state.albumArtUrl} alt=""></img>
          <div className='track'>{this.state.songName}</div>by <div className='cArtist'>{this.state.artistName}</div>
        </p>
      </div>
    );
  }
}

export default CurrentSong;
