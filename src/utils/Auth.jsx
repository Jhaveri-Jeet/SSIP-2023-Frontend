export const validate = () => {
  console.log(localStorage.getItem("isLoggedIn"));
  if (!Boolean(localStorage.getItem("isLoggedIn"))) location.href = "/";
};

export const logout = () => {
  localStorage.removeItem("isLoggedIn");
  location.href = "/";
};
