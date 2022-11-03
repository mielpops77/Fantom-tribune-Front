import AuthService from "../../../services/auth/auth.service";
import React, { useState, useEffect } from "react";
import style from "./NavigationUser.module.scss";
import { NavLink } from "react-router-dom";

const Navigation = () => {


  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  const url = AuthService.getUrl();


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

        <img className={style.imgLogo} src={url + "assets/logo.png"} alt='logo' />
        <h1 className={style.title}>FANTOM TRIBUNE</h1>
      </div>
      <ul className={style.ulNavUser}>
        <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
          <li className={style.liNavUser}>HOME</li>
        </NavLink>
        <NavLink
          to="/topTrending"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li className={style.liNavUser}>TOP TRENDING</li>
        </NavLink>
        <NavLink
          to="/presales"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li className={style.liNavUser}>PRESALES</li>
        </NavLink>

        <NavLink
          to="/allTokens"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li className={style.liNavUser}>ALL TOKENS</li>
        </NavLink>

        <NavLink
          to="/giveaways"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li className={style.liNavUser}>GIVEAWAYS</li>
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
            <img className={style.imgUser} src={url + "assets/user.png"} alt="user" />
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