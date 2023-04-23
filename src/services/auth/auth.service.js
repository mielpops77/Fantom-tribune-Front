import axios from "axios";

const API_URL = "https://fantomtribune.osc-fr1.scalingo.io/api/auth/";

const getUrl = () => "https://fantomtribune.osc-fr1.scalingo.io/";

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

const getPointsLimitUser = (id) => axios.get(getUrl() + `getPointsLimitUser/?id=${id}`).then((response) => { return response.data[0].pointsLimit; });

const getCurrentUser = () => JSON.parse(localStorage.getItem("user"));

const logout = () => { localStorage.removeItem("user"); };

const verifyUser = (code) => axios.get(API_URL + "confirm/" + code).then((response) => { return response.data; });

const verifMail = (email) => axios.get(API_URL + `verifMail/?email=${email}`).then((response) => { return response.data; });

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
