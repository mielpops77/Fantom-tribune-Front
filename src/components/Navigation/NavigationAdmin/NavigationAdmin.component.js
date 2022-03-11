import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AuthService from "../../../services/auth/auth.service";
import "./NavTabAdmin.scss";

const NavigationAdmin = () => {


  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);



  return (
    // eslint-disable-next-line react/style-prop-object


    <nav className="navbar navbar-expand" style={{ backgroundImage: `url("http://localhost:3000/fond_bandeau.png")`}}>
      <div className='logo'>
        <img src="http://localhost:3000/logo.png" alt="logo" />
        <h5>Fantom Tribune</h5>
      </div>
      {showAdminBoard && (<ul>
        <NavLink
          to="/Admin"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>ADMINISTRATION</li>
        </NavLink>
        <NavLink
          to="/"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>NEWS EDITION</li>
        </NavLink>

        <NavLink
          to="/Admin/Tutorial"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>TUTORIAL</li>
        </NavLink>
        
        
        <NavLink
          to="/Admin/Promotion"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>PROMOTION</li>
        </NavLink>

        <NavLink
          to="/Admin/Statistique"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>STATISTIQUE</li>
        </NavLink>
      </ul>)}
    </nav>


  );
};

export default NavigationAdmin;