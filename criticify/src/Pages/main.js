import React from "react";
import SongList from "../components/songs/songList";
import { Container } from "reactstrap";

const MainPage = () => {
  return (
    <Container>
      <SongList />
    </Container>
  );
};

export default MainPage;
