import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Footer.module.scss";

const Footer = () => {
  return (
    <nav className={style.footerContainer}>
        <h2 className={style.h2Title}>Contact us</h2>
        <h2 className={style.h2Title}>Follow us</h2>
        
        <NavLink
          to="/admin"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li className={style.liNavUser} id={style.subToken}>Admin</li>
        </NavLink>

    </nav>
    
    );
};

export default Footer;