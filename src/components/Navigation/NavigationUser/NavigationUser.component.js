import AuthService from "../../../services/auth/auth.service";
import React, { useState, useEffect } from "react";
import style from "./NavigationUser.module.scss";
import { NavLink } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';


const Navigation = () => {


  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [menuMobile, setMenuMobile] = useState(false);
  const [page, setPage] = useState();

  const url = AuthService.getUrl();

  // console.log("heey",page);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    setPage(window.location.href);
    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };


  const mobile = () => {

    if (menuMobile) { setMenuMobile(false) }
    else { setMenuMobile(true) }
  };




  return (
    <div>

      <nav className={style.pcVersion}>
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


        {!menuMobile && <AiOutlineMenu className={style.menuMobile} size={32} style={{
          cursor: "pointer",
          color: "white",
        }} onClick={mobile} />}

        {menuMobile && <AiOutlineClose className={style.menuMobile} size={32} style={{
          cursor: "pointer",
          color: "white",
        }} onClick={mobile} />}

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
      <nav className={style.versionMobile}>
        {menuMobile &&
          <ul className={style.ulMobile}>

            <NavLink to="/" /* onClick={pageChange} */ >
              {page == "http://localhost:3001/" &&
                <li className={style.menuLiActive}>HOME</li>}
              {page !== "http://localhost:3001/" &&
                <li className={style.menuLiInactive}>HOME</li>}

            </NavLink>
            <NavLink
              to="/topTrending"
            /* onClick={pageChange} */

            >
              {page == "http://localhost:3001/topTrending" &&
                <li className={style.menuLiActive}>TOP TRENDING</li>}
              {page !== "http://localhost:3001/topTrending" &&
                <li className={style.menuLiInactive}>TOP TRENDING</li>}
            </NavLink>
            <NavLink
              to="/presales"
            >
              {page == "http://localhost:3001/presales" &&
                <li className={style.menuLiActive}>PRESALES</li>}
              {page !== "http://localhost:3001/presales" &&
                <li className={style.menuLiInactive}>PRESALES</li>}
            </NavLink>

            <NavLink
              to="/allTokens"
            >  {page == "http://localhost:3001/allTokens" &&
              <li className={style.menuLiActive}>ALL TOKENS</li>}
              {page !== "http://localhost:3001/allTokens" &&
                <li className={style.menuLiInactive}>ALL TOKENS</li>}
            </NavLink>

            <NavLink
              to="/giveaways"

            >
              {page == "http://localhost:3001/giveaways" &&
                <li className={style.menuLiActive}>GIVEAWAYS</li>}
              {page !== "http://localhost:3001/giveaways" &&
                <li className={style.menuLiInactive}>GIVEAWAYS</li>}
            </NavLink>





            <NavLink
              to="/submit"
            >
              {page == "http://localhost:3001/submit" &&
                <li className={style.menuLiActive}>SUBMIT PROJECT +</li>}
              {page !== "http://localhost:3001/submit" &&
                <li className={style.menuLiInactive}>SUBMIT PROJECT +</li>}
            </NavLink>


            {currentUser && <NavLink
              to="/myFavorites"
            >
              {page == "http://localhost:3001/myFavorites" &&
                <li className={style.menuLiActive}>MY FAVORITES</li>}
              {page !== "http://localhost:3001/myFavorites" &&
                <li className={style.menuLiInactive}>MY FAVORITES</li>}
            </NavLink>}


            {showAdminBoard && <NavLink
              to="/administration"
            >
              <li className={style.menuLiInactive}>ADMIN</li>
            </NavLink>
            }

            {currentUser ? (
              <NavLink
                to="/login" onClick={logOut}
              >
                <li className={style.menuLiInactive}id={style.subToken}>LOGOUT</li>
              </NavLink>
            ) : (

              <div>
                <NavLink
                  to="/login"
                >
                  {page == "http://localhost:3001/login" &&
                    <li className={style.menuLiActive}>LOGIN</li>}
                  {page !== "http://localhost:3001/login" &&
                    <li className={style.menuLiInactive}>LOGIN</li>}
                </NavLink>
                <NavLink
                  to="/register"
                >
                    {page == "http://localhost:3001/register" &&
                    <li className={style.menuLiActive}>REGISTER</li>}
                  {page !== "http://localhost:3001/register" &&
                    <li className={style.menuLiInactive}>REGISTER</li>}
                </NavLink>
              </div>
            )
            }
          </ul >}

      </nav >

    </div >
  );
};

export default Navigation;