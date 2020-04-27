var stateKey = "spotify_auth_state";
var request = require("request");
var express = require("express");
var stateKey = "spotify_auth_state";
require("dotenv").config();

var client_id = process.env.CLIENT_ID; // Your client id
var client_secret = process.env.CLIENT_SECRET; // Your secret
var redirect_uri = "http://localhost:8888/callback"; // Your redirect uri
var scope = process.env.SCOPES; // Your requested scopes for access to client information
var MONGO_URL = process.env.MONGODB_CONNECTION_STRING;

var router = express.Router();
router.get((req, res) => {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token; // Move server-side
  // console.log(refresh_token);
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      console.log(response.body);
      res.send({
        access_token: access_token,
        expires_in: body.expires_in,
      });
    }
  });
});

module.exports = router;
