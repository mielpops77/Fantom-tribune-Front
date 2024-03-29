import React from "react";
import AuthService from "../../../services/auth/auth.service";
import NavigationUserComponent from '../../Navigation/NavigationUser/NavigationUser.component';
import style from "./Profile.module.scss";


const Profile = (props) => {
  const currentUser = AuthService.getCurrentUser();

  if (props.match.path === "/confirm/:confirmationCode") {
    AuthService.verifyUser(props.match.params.confirmationCode)
  }

  return (
    <div >
      <NavigationUserComponent />
      <div className={style.container}>
        <header className={style.jumbotron}>
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Id:</strong> {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <p>
          <strong>Status:</strong> {currentUser.status}
        </p>
        <strong>Authorities:</strong>
        <ul className={style.ulProfile}>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
