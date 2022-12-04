import React from "react";
import style from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={style.footerContainer}>
        <div className={style.divAllLogo}>
            <img className={style.imgFtmTribune} src="http://localhost:3000/assets/logo.png" />
                <div className={style.divLinks}>
                    <div className={style.divLink}>
                        <img className={style.imgLogo} src="http://localhost:3000/assets/logo_twitter.png" />
                        <a className={style.link} href="https://twitter.com/fantomtribune" >Twitter</a>
                    </div>
                    <div className={style.divLink}>
                        <img className={style.imgLogo} src="http://localhost:3000/assets/logo_telegram.png" />
                        <a className={style.link} href="https://web.telegram.org/k/">Telegram</a>
                    </div>
                    <div className={style.divLink}>
                        <img className={style.imgLogo} src="http://localhost:3000/assets/logo_discord.png" />
                        <a className={style.link} href="https://discord.gg/AtjmsXJe">Term</a>
                    </div>
                </div>
            <img className={style.imgFtmTribune} src="http://localhost:3000/assets/logo.png" />
        </div>
        
    </footer>
    
    );
};

export default Footer;
