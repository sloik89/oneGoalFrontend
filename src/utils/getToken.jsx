export const getToken = () => {
  const { token } = JSON.parse(localStorage.getItem("user"));
  if (!token) {
    return "No token";
  }
  return token;
};
