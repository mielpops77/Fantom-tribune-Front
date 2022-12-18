import NavigationUserComponent from '../Navigation/NavigationUser/NavigationUser.component';
import AuthService from "../../services/auth/auth.service";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import React from "react";
import style from "./Welcome.module.scss"

const Welcome = (props) => {
  let url = window.location.href;
  const [error, setError] = useState(false);

  const API_URL = AuthService.getUrl() + "api/auth/"

  const verifyUser = (code) => {
    return axios.get(API_URL + "confirm/" + code).then((response) => {
      return response.data;


    }, (error) => {
      setError(true)
    }
    );
  };





  //If local
  verifyUser(url.substr(30));

  //If distant
  /* verifyUser(url.substr(49)); */


  /*  
    if (props.match.path === "/confirm/:confirmationCode") {
      AuthService.verifyUser(props.match.params.confirmationCode);
    } */
  return (
    <div >
      <div className={style.welcome_fond}>
      <NavigationUserComponent />
      </div>
      <div className="container">
        <br /><br /><br />
        <header className="jumbotron">
          {!error &&
            < h3 >
            <strong>Account confirmed!</strong>
          </h3>}
          {error &&
            < h3 >
            <strong>Error code Account no confirmed!</strong>
          </h3>}
      </header>
      <Link to={"/login"} className="nav-link">
        Please Login
      </Link>
    </div>
    </div >
  );
};

export default Welcome;
