import React from "react";
import { Redirect } from "react-router-dom";
import queryString from "query-string";
import { setStorage } from "../utils/localStore";

const AuthCallback = () => {
  console.log("callbacked");
  let { access_token, refresh_token, expires_in } = queryString.parse(
    window.location.hash
  );
  setStorage("access_token", access_token);
  setStorage("refresh_token", refresh_token);
  setStorage("expires_in", expires_in);
  setStorage("expires_on", new Date().getTime() + +expires_in * 1000);

  return <Redirect to="/auth" />;
};

export default AuthCallback;
