import Cookies from "js-cookie";

export const authenticate = () => {
  const accessToken = Cookies.get("access_token");

  if (!accessToken) {
    if(location.pathname != "/")
      location.href = "/";
  }
  else {
    if(location.pathname == "/")
      location.href = "/dashboard"
  }
};

export const logout = () => {
  Cookies.remove("access_token");
  location.href = "/";
};
