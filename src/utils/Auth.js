export const authenticate = () => {
  if (!localStorage.getItem("isAuthenticated")) location.href = "/";
};

export const goToDashboardIfAuthenticated = () => {
  if (localStorage.getItem("isAuthenticated")) location.href = "/dashboard";
};

export const logout = () => {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("userRoleId");
  localStorage.removeItem("districtId");
  localStorage.removeItem("courtId");
  location.href = "/";
};
