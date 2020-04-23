import refreshAuthToken from "./refresh_auth";

const isTokenExpired = () => {
  const expiration_time: string | null = getStorage("expires_on");
  if (expiration_time && +expiration_time <= Date.now()) return true;
  if (!expiration_time) return true;
  return false;
};

const setStorage = (key: string, value: string) =>
  localStorage.setItem(key, value);

const getStorage = (key: string) => {
  if (key === "access_token" && isTokenExpired()) {
    refreshAuthToken();
    return "Token Expired";
  } else {
    return localStorage.getItem(key);
  }
};

export { setStorage, getStorage, isTokenExpired };
