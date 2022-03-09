import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AuthService from "../../services/auth.service";

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

    <nav className="navbar navbar-expand ">
      <div className='logo'>
        <img src="http://localhost:3000/fond_bandeau.png" alt="logo" />
        <h5>Fantom Tribune</h5>
      </div>
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
          <div className='navbar-nav ml-auto'>
            <NavLink to="/profile" >

              <li className="nav-item" id="usernameNav">{currentUser.username}</li>
            </NavLink>

            <li className="logOut">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>

          </div>


        ) : (
          <div className='navbar-nav ml-auto'>
            <NavLink to="/login" >

              <li className="login">Login</li>
            </NavLink>

            <NavLink to="/register" >

              <li className="login">register</li>
            </NavLink>
          </div>
        )}


      </ul>
    </nav>
  );
};

export default Navigation;