var express = require("express");
var router = express.Router();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var request = require("request");
var bandDB = require("../db/Schemas/bandSchema.ts");

const artistBaseURL = "https://api.spotify.com/v1/artists/";

router.post("/", (req, res) => {
  //   console.log(req);
  const artist = req.body.artist;
  const access_token = req.body.access_token;
  bandDB.find({ id: artist.id }, (err, resp) => {
    if (err) return console.log("error: ", err);
    // console.log("response: ", resp);

    if (resp.length === 0) {
      request.get(
        {
          url: artistBaseURL + artist.id,
          headers: { Authorization: "Bearer " + access_token },
        },
        (err, response, body) => {
          if (err) return console.log(err);
          //   console.log(response);
          body = JSON.parse(body);
          console.log(body.images);

          var newBand = new bandDB({
            name: body.name,
            id: body.id,
            genres: body.genres,
            images: {
              large: body.images[0].url,
              medium: body.images[1].url,
              small: body.images[2].url,
            },
          });
          newBand.save((err, newBand) => {
            console.log("save step");
            if (err) return console.log(err);
            console.log(newBand);
            res.send(newBand);
          });
        }
      );
    } else {
      console.log("found");
      res.send(resp);
    }
  });
});

module.exports = router;
