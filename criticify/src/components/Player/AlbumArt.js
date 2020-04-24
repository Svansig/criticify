import React from "react";
import PropTypes from "prop-types";
import "./AlbumArt.css";

const AlbumArt = ({ sourceURL }) => {
  return (
    <span className="album-frame">
      <img className="album" alt="" src={sourceURL}></img>
    </span>
  );
};

AlbumArt.propTypes = {
  sourceURL: PropTypes.string.isRequired,
};

export default AlbumArt;
