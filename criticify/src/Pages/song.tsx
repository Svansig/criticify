import React from "react";
import { useSelector } from "react-redux";
import AlbumHeader from "../components/ReviewPage/albumHeader";
import ArtistHeader from "../components/ReviewPage/artistHeader";
import ArtistSplash from "../components/ReviewPage/artistSplash";
import SongHeader from "../components/ReviewPage/songHeader";
import ReviewSection from "../components/ReviewPage/reviewSection";
import { state } from "../types/stateType";

import { Container, Row, Col, Button } from "reactstrap";
import { getStorage } from "../utils/localStore";
import { Link } from "react-router-dom";

import "./song.css";

export type track = {
  track_num: number;
  track_title: string;
  duration: number;
  id: string;
};

export type albumType = {
  name: string;
  image: string;
  albumID: string;
  tracks: Array<track>;
};

export const defaultTrack: track = {
  track_num: 0,
  track_title: "",
  duration: 0,
  id: "",
};

export const defaultAlbum = {
  name: "",
  image: "",
  albumID: "",
  tracks: [defaultTrack],
};

export type selectedSongType = {
  song: {
    id: string;
    title: string;
    duration: number;
  };
  artist: {
    name: string;
    image: string[];
    description: string;
    id: string;
    albums: Array<albumType>;
  };
  album: albumType;
};

const SongPage = () => {
  const selectedSong: selectedSongType = useSelector(
    (state: state) => state.selectedSong
  );
  const reviewSectionProps = {
    id: selectedSong.song.id,
    userID: getStorage("userID") || "",
    name: getStorage("userName") || "",
    track_title: selectedSong.song.title,
    album_title: selectedSong.album.name,
    artist_name: selectedSong.artist.name,
  };

  return (
    <Container>
      <Button size="lg" block>
        <Link to="/auth">Back To Your Recently Played</Link>
      </Button>
      <Row>
        <ArtistSplash
          artistName={selectedSong.artist.name}
          image={selectedSong.artist.image[0]}
        />

        <Col lg="4">
          <Row>
            <AlbumHeader
              albumName={selectedSong.album.name}
              image={selectedSong.album.image}
            />
          </Row>
          <Row>
            <SongHeader
              songTitle={selectedSong.song.title}
              duration={selectedSong.song.duration}
            />
          </Row>
        </Col>
        <Col lg="6">
          <ReviewSection {...reviewSectionProps} />
        </Col>
      </Row>
      <Row>
        <ArtistHeader
          artistName={selectedSong.artist.name}
          artistDesc=""
          albums={selectedSong.artist.albums}
        />
      </Row>
    </Container>
  );
};

export default SongPage;
