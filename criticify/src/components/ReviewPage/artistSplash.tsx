import React from "react";
import { Col } from "reactstrap";
import "./artistSplash.css";

type artistSplashProps = {
  artistName: string;
  image: string;
};

const ArtistSplash = (props: artistSplashProps) => {
  return (
    <img className="artistSplash" height="100%" alt="" src={props.image} />
  );
};

export default ArtistSplash;
