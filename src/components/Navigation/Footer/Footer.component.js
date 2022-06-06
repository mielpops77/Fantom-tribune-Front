import React from "react";
import style from "./Footer.module.scss";

const Footer = () => {
  return (
    <nav className={style.footerContainer}>
        <h2 className={style.h2Title}>Contact us</h2>
        <h2 className={style.h2Title}>Follow us</h2>
    </nav>
    );
};

export default Footer;