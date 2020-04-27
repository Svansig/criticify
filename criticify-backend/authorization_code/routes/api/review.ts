var express = require("express");
var router = express.Router();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");

var reviewDB = require("../../db/Schemas/reviewSchema.ts");

router.post("/", (req, res) => {
  const {
    id,
    userID,
    name,
    track_title,
    album_title,
    artist_name,
    rating,
    description,
  } = req.body;

  reviewDB.find({ id: id }, (err, resp) => {
    if (resp.length === 0) {
      var newReview = new reviewDB({
        id,
        userID,
        name,
        track_title,
        album_title,
        artist_name,
        rating,
        description,
      });
      newReview.save((err, newRev) => {
        if (err) return err;
        console.log(newRev);
        res.send(newRev);
      });
    } else {
      console.log("found");
      res.send(resp);
    }
  });
});

module.exports = router;
