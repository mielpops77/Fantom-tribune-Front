import React from "react";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
import NavigationUserComponent from '../components/navigation/NavigationUser.component';

const Welcome = (props) => {
  console.log(props)
  if (props.match.path === "/confirm/:confirmationCode") {
    AuthService.verifyUser(props.match.params.confirmationCode);
  }

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
