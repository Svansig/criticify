import queryString from "query-string";
import axios from "axios";
import { setStorage, getStorage } from "./localStore";

async function refreshAuthToken() {
  const refreshToken = getStorage("refresh_token");
  localStorage.removeItem("access_token");
  localStorage.removeItem("expires_in");
  localStorage.removeItem("expires_on");
  let response = await axios({
    method: "GET",
    url:
      "http://localhost:8888/refresh_token?" +
      queryString.stringify({
        refresh_token: refreshToken,
      }),
  });
  let { access_token, expires_in } = response.data;
  console.log(access_token, expires_in);
  setStorage("access_token", access_token);
  setStorage("expires_in", expires_in);
  setStorage(
    "expires_on",
    (new Date().getTime() + +expires_in * 1000).toString()
  );
}

export default refreshAuthToken;
