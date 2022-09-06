import axios from "axios";

const API_URL = "https://fantom-tribune-back.herokuapp.com/api/auth/";

function getUrl() {
  const url = "https://fantom-tribune-back.herokuapp.com/";
  return url;
}

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const verifyUser = (code) => {
  return axios.get(API_URL + "confirm/" + code).then((response) => {
    return response.data;
  });
};

export default {
  getCurrentUser,
  verifyUser,
  register,
  logout,
  getUrl,
  login
};
