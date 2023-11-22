import Cookies from "js-cookie";

export const prefixUrl = "http://localhost:5000/";

const accessToken = Cookies.get("access_token");

export const tokenData = JSON.parse(atob(accessToken.split(".")[1]));
