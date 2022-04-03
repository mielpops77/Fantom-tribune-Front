import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AuthService from "../../../services/auth/auth.service";
import style from "./NavigationUser.module.scss";

const Navigation = () => {


  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };
  return (
    // eslint-disable-next-line react/style-prop-object

    <nav>
      <img className={style.imgFond} src="http://localhost:3000/header.png" />
      <ul>
        <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
          <li>HOME</li>
        </NavLink>
        <NavLink
          to="/launchDate"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>NEW PROJECT</li>
        </NavLink>

        <NavLink
          to="/"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>ALL PROJECT</li>
        </NavLink>


        <NavLink
          to="/submit"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>SUBMIT PROJECT</li>
        </NavLink>

   
        <NavLink
          to="/admin"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        > {showAdminBoard && (
          <li>Admin</li>)}
        </NavLink>


        {currentUser ? (
          <div>
            <li className={style.logOut}>
              <a href="/login" className={style.hrefLogout} onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className={style.divLoginRegister}>
            <NavLink to="/login" >

              <li className={style.login}>Login</li>
            </NavLink>

            <NavLink to="/register" >

              <li className={style.login}>Register</li>
            </NavLink>
          </div>
        )}


      </ul>
    </nav>
  );
};

export default Navigation;