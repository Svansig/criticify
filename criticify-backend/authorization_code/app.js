require("dotenv").config();
var express = require("express"); // Express web server framework
var request = require("request"); // "Request" library
var cors = require("cors");
var querystring = require("querystring");
var cookieParser = require("cookie-parser");

var bodyParser = require("body-parser");

const generateRandomString = require("./utils/generateRandomString");

var client_id = process.env.CLIENT_ID; // Your client id
var client_secret = process.env.CLIENT_SECRET; // Your secret
var redirect_uri = "http://localhost:8888/callback"; // Your redirect uri
var scope = process.env.SCOPES; // Your requested scopes for access to client information

var stateKey = "spotify_auth_state";

var app = express();

app
  .use(express.static(__dirname + "/public"))
  .use(cors())
  .use(cookieParser())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json());

app.get("/login", function (req, res) {
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

app.get("/callback", function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  //Checks random string returned against random string sent
  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    res.clearCookie(stateKey); // TODO: remove cookies
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    //Reqests auth and refresh tokens
    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          expires_in = body.expires_in;
        refresh_token = body.refresh_token;

        var options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        // use the access token to access the Spotify Web API
        request.get(options, function (error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        // TODO: pass to browser with JSON vice querystring
        res.redirect(
          "http://localhost:3000/callback/#" +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token,
              expires_in: expires_in,
            })
        );
      } else {
        res.redirect(
          "/#" +
            querystring.stringify({
              error: "invalid_token",
            })
        );
      }
    });
  }
});

app.get("/refresh_token", function (req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  console.log(refresh_token);
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

app.post("/control/play", (req, res) => {
  // console.log(req);
  console.log(req.body);
  // console.log(req.data);
  const token = req.body.access_token;
  const deviceID = req.body.device_id;
  const context_uri = req.body.context_uri;
  console.log(context_uri);
  const URL =
    "https://api.spotify.com/v1/me/player/play?" +
    querystring.stringify({
      device_id: deviceID,
    });
  console.log(URL);
  request.put(
    {
      method: "PUT",
      url: URL,
      headers: { Authorization: "Bearer " + token },
      data: context_uri.context_uri,
      json: true,
    },
    (err, response, body) => {
      console.log("error: ", err);
      console.log("response", response);
      console.log("body ", body);
    }
  );
});

console.log("Listening on 8888");
app.listen(8888);
