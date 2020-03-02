import { clientId, scopes, redirectUrl } from "./secrets";
// import axios from "axios";
// var express = require('express'); // Express web server framework
// var request = require('request'); // "Request" library
// var cors = require('cors');
// var querystring = require('querystring');
// var cookieParser = require('cookie-parser');


/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var state = generateRandomString(16);

const queryParam = {
  client_id: clientId,
  response_type: "code",
  redirect_uri: redirectUrl,
  scope: scopes,
  state: state
};

const authUrl = `https://accounts.spotify.com/authorize?client_id=${queryParam.client_id}&response_type=${queryParam.response_type}&redirect_uri=${queryParam.redirect_uri}&scope=${queryParam.scope}&state=${queryParam.state}`;

const Authorize = axios({
  method: "GET",
  url: authUrl,
  mode: "cors",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  },
  withCredentials: true,
  credentials: "include",
}).then(response => console.log(response));

export default Authorize;
