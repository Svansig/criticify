import refreshAuthToken from "./refresh_auth";

const isTokenExpired = () => {
  const expiration_time = getStorage("expires_on") || null;
  if (expiration_time && expiration_time <= Date.now()) return true;
  if (!expiration_time) return true;
  return false;
};

const setStorage = (key, value) => localStorage.setItem(key, value);

const getStorage = (key) => {
  if (key === "access_token" && isTokenExpired()) {
    refreshAuthToken(localStorage.getItem("refresh_token"));
    //send refresh

    return null;
  }
  return localStorage.getItem(key);
};

export { setStorage, getStorage, isTokenExpired };
