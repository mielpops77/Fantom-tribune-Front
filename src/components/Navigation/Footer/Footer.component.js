import React from "react";
import style from "./Footer.module.scss";

const Footer = () => {
  return (
    <nav className={style.footerContainer}>
        <h2 className={style.h2Title}>Fantom Tribune - Contact us</h2>
        <div className={style.divAllLogo}>
            <img className={style.imgFtmTribune} src="http://localhost:3000/logo.png" />
                <div className={style.divLinks}>
                    <div className={style.divLink}>
                        <img className={style.imgLogo} src="http://localhost:3000/logo_twitter.png" />
                        <a className={style.link} href="https://twitter.com/fantomtribune" >Twitter</a>
                    </div>
                    <div className={style.divLink}>
                        <img className={style.imgLogo} src="http://localhost:3000/logo_telegram.png" />
                        <a className={style.link} href="https://web.telegram.org/k/">Telegram</a>
                    </div>
                    <div className={style.divLink}>
                        <img className={style.imgLogo} src="http://localhost:3000/logo_discord.png" />
                        <a className={style.link} href="https://discord.gg/AtjmsXJe">Discord</a>
                    </div>
                </div>
            <img className={style.imgFtmTribune} src="http://localhost:3000/logo.png" />
        </div>
        
    </nav>
    );
};

export default Footer;