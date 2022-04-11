import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AuthService from "../../../services/auth/auth.service";
import style from "../NavigationUser/NavigationUser.module.scss";

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
  
  const logOut = () => {
    AuthService.logout();
  };


  return (
    // eslint-disable-next-line react/style-prop-object


    <nav>
       <img className={style.imgFond} src="http://localhost:3000/header.png" />
      {showAdminBoard && (<ul className={style.ulNavUser}>
        <NavLink
          to="/Admin"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li className={style.liNavUser}>ADMINISTRATION</li>
        </NavLink>
        <NavLink
          to="/"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li className={style.liNavUser}>NEWS EDITION</li>
        </NavLink>

        <NavLink
          to="/Admin/Tutorial"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li className={style.liNavUser}>TUTORIAL</li>
        </NavLink>
        
        
        <NavLink
          to="/Admin/Promotion"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li className={style.liNavUser}>PROMOTION</li>
        </NavLink>

        <NavLink
          to="/Admin/Statistique"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li className={style.liNavUser}>STATISTIQUE</li>
        </NavLink>

        {currentUser ? (
          <div className={style.divLoginRegister}>
              <a href="/login" className={style.logOut} onClick={logOut}>
                LogOut
              </a>
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
      </ul>)}
    </nav>


  );
};

export default NavigationAdmin;