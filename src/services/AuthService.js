import axios from "axios";

const API_URL = "http://localhost:8082";

const login = async (user) => {
  console.log(user)  
  const response = await axios.post(API_URL + "/auth/login", user);
  if (response.data.jwt) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  login,
  logout,
  getCurrentUser,
};
