import React, { useState } from "react";
import { Input, Button } from "reactstrap";
import axios from "axios";

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
    <div>
      <Input value={rating} onChange={(e) => setRating(+e.target.value)} />
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button onClick={() => submitReview({ ...props, rating, description })}>
        Submit
      </Button>
    </div>
  );
};

export default AlbumHeader;
