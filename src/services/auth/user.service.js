import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "../auth/auth.service";

const url = AuthService.getUrl();

const API_URL = url + "api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
  getPublicContent,
  getAdminBoard,
  getUserBoard,
};
