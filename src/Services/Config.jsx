
import Cookies from "js-cookie";

export const prefixUrl = "http://10.30.64.181:5000";

let tokenData = null;

const accessToken = Cookies.get("access_token");

if (accessToken) {
  tokenData = JSON.parse(atob(accessToken.split(".")[1]));
}

export { tokenData };
