import React, { useState } from "react";
import axios from "axios";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type reviewSectionProps = {
  id: string;
  userID: string;
  name: string;
  track_title: string;
  album_title: string;
  artist_name: string;
};

type reviewSubmittal = {
  id: string;
  userID: string;
  name: string;
  track_title: string;
  album_title: string;
  artist_name: string;
  rating: number;
  description: string;
};

const submitReview = (review: reviewSubmittal) => {
  axios({
    method: "POST",
    data: {
      review,
    },
  })
    .then((res) => console.log("successful", res))
    .catch((err) => console.log(err));
};

const AlbumHeader = (props: reviewSectionProps) => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");

  return (
    <div className="flex-2 w-1/3 flex flex-col text-center mx-6">
      {/* <FontAwesomeIcon icon={faStar} /> */}
      <input
        className="border-solid border-2 border-gray-700 bg-gray-200 text-center align-middle h-56"
        type="text"
        placeholder="Rate this song!"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        className="text-lg border-solid border-gray-800 p-6 mx-auto my-6 bg-indigo-300 shadow-xs text-white"
        onClick={() => submitReview({ ...props, rating, description })}
      >
        Submit
      </button>
    </div>
  );
};

export default AlbumHeader;
