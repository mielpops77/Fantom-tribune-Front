import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AuthService from "../../../services/auth/auth.service";
import "./Navigation.scss";

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
      <img className='imgFond' src="http://localhost:3000/header.png" />
      <ul>
        <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
          <li>HOME</li>
        </NavLink>
        <NavLink
          to="/launchDate"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>LAUNCH DATE</li>
        </NavLink>
        <NavLink
          to="/submit"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>SUBMIT PROJECT</li>
        </NavLink>

        <NavLink
          to="/"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>GUIDES</li>
        </NavLink>
        <NavLink
          to="/admin"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        > {showAdminBoard && (
          <li>Admin</li>)}
        </NavLink>


        {currentUser ? (
          <div>
            <li className="logOut">
              <a href="/login" className="hrefLogout" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className='divLoginRegister'>
            <NavLink to="/login" >

              <li className="login">Login</li>
            </NavLink>

            <NavLink to="/register" >

              <li className="login">Register</li>
            </NavLink>
          </div>
        )}


      </ul>
    </nav>
  );
};

export default Navigation;