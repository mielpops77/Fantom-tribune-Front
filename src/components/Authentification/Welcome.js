import React from "react";
import AuthService from "../../services/auth/auth.service";
import { Link } from "react-router-dom";
import NavigationUserComponent from '../Navigation/NavigationUser/NavigationUser.component';

const Welcome = (props) => {
  let url = window.location.href;
  /* AuthService.verifyUser(url.substr(30));  pour local seulement*/ 
   AuthService.verifyUser(url.substr(49))

  /*   console.log(props)
    if (props.match.path === "/confirm/:confirmationCode") {
      AuthService.verifyUser(props.match.params.confirmationCode);
    } */
  return (
    <div>
      <NavigationUserComponent />

      <div className="container">
        <br /><br /><br />
        <header className="jumbotron">
          <h3>
            <strong>Account confirmed!</strong>
          </h3>
        </header>
        <Link to={"/login"} className="nav-link">
          Please Login
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
