export const authenticate = () => {
  if (!localStorage.getItem("isAuthenticated"))
  {
    if(location.pathname != "/")
      location.href = "/";
  }
  else {
    if(location.pathname == "/")
      location.href = "/dashboard"
  }
};

export const logout = () => {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("userRoleId");
  localStorage.removeItem("districtId");
  localStorage.removeItem("courtId");
  location.href = "/";
};
