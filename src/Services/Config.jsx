
import Cookies from "js-cookie";

export const prefixUrl = "http://172.24.0.1:5000";

let tokenData = null;

const accessToken = Cookies.get("access_token");

if (accessToken) {
  tokenData = JSON.parse(atob(accessToken.split(".")[1]));
}

export { tokenData };
