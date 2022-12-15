import axios from "axios";


const API_URL = "https://fantom-tribune-back.herokuapp.com/api/auth/";


const getUrl = () => "https://fantom-tribune-back.herokuapp.com/";

const register = (username, email, password) => axios.post(API_URL + "signup", { username, email, password, });

const login = (email, password) => axios
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


const logout = () => { localStorage.removeItem("user"); };
const getCurrentUser = () => JSON.parse(localStorage.getItem("user"));

const getPointsLimitUser = (id) => axios.get(getUrl() + `getPointsLimitUser/?id=${id}`).then((response) => {
  return response;
});

const verifyUser = (code) => axios.get(API_URL + "confirm/" + code).then((response) => {
  return response.data;
});

const verifMail = (email) => axios.get(API_URL + `verifMail/?email=${email}`).then((response) => {
  return response.data;
});

const authService = {
  getPointsLimitUser,
  getCurrentUser,
  verifyUser,
  verifMail,
  register,
  logout,
  getUrl,
  login
};
export default authService;
