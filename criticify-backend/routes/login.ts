var express = require("express");
var router = express.Router();
var querystring = require("querystring");
const generateRandomString = require("../utils/generateRandomString");
var stateKey = "spotify_auth_state";
require("dotenv").config();

var client_id = process.env.CLIENT_ID; // Your client id
var client_secret = process.env.CLIENT_SECRET; // Your secret
var redirect_uri = "http://localhost:8888/callback"; // Your redirect uri
var scope = process.env.SCOPES; // Your requested scopes for access to client information
var MONGO_URL = process.env.MONGODB_CONNECTION_STRING;

router.get("/", (req, res) => {
  var state = generateRandomString(16); // Sent and returned to Spotify API to verify auth request
  res.cookie(stateKey, state); // TODO: replace cookies

  // your application requests authorization
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

module.exports = router;
