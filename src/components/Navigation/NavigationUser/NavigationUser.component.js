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
      <div className={style.fantom_tribune}>

        <img className={style.imgLogo} src="https://fantom-tribune-back.herokuapp.com/logo.png" alt='logo'/>
        <h1 className={style.title}>FANTOM TRIBUNE</h1>
      </div>
      <ul className={style.ulNavUser}>
        <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
          <li className={style.liNavUser}>HOME</li>
        </NavLink>
        <NavLink
          to="/launchDate"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li className={style.liNavUser}>NEW PROJECT</li>
        </NavLink>

        <NavLink
          to="/ecosystem"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li className={style.liNavUser}>ECOSYSTEM</li>
        </NavLink>


        {showAdminBoard && <NavLink
          to="/administration"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li className={style.liNavUser}>ADMIN</li>
        </NavLink>
        }


        <NavLink
          to="/submit"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li className={style.liNavUser} id={style.subToken}>Submit Project +</li>
        </NavLink>




      </ul>
      {currentUser ? (
        <div className={style.divCurrentUser}>
          <a href="/login" onClick={logOut}>
            <img className={style.imgUser} src="https://fantom-tribune-back.herokuapp.com/user.png" alt="user"/>
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
    </nav>
  );
};

export default Navigation;