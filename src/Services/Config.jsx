
import Cookies from "js-cookie";

export const prefixUrl = "http://10.30.64.181:5000";
<<<<<<< HEAD
export const prefixUrlForMailAndSms = "http://10.30.64.180:8888";
=======
>>>>>>> 1adee70cf056466b813cf4ac23c6f9ec4ffe68bb

let tokenData = null;

const accessToken = Cookies.get("access_token");

if (accessToken) {
  tokenData = JSON.parse(atob(accessToken.split(".")[1]));
}

export { tokenData };
