import axios from "axios";

const API_URL = "http://localhost:8082";

const register = (username, email, password) => {
  return axios.post(API_URL + "/signup", {
    username,
    email,
    password,
  });
};

const createPerson = (person) => {
  return axios.post(API_URL + "/person/", {person});
}

const createApplicant = (applicant) => {  
  return axios.post(API_URL + "/applicant/", {applicant});
};

const createPublisher = (publisher) => {
  return axios.post(API_URL + "/publisher/", {publisher});
}

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
  register,
  createApplicant,
  createPerson,
  createPublisher,
  login,
  logout,
  getCurrentUser,
};
