import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8082/";

const getPublicContent = () => {
  return axios.get(API_URL + "joboffer/");
};

const getApplicantBoard = () => {
  return axios.get(API_URL + "applicant/", { headers: authHeader() });
};

const getPublisherBoard = () => {
  return axios.get(API_URL + "publisher/", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "person/", { headers: authHeader() });
};

const getUtnBoard = () => {
  return axios.get(API_URL + "person/", { headers: authHeader() });
};

export default {
  getPublicContent,
  getApplicantBoard,
  getPublisherBoard,
  getAdminBoard,
  getUtnBoard,
};
