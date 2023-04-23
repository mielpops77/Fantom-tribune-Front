import React from "react";
import { Link } from "react-router-dom";
import style from "./Footer.module.scss";
import AuthService from "../../../services/auth/auth.service";

const Footer = () => {
    console.log('url');
    const url = AuthService.getUrl();
    console.log("url,", url)

    return (
        <footer class={style.footerContainer}>
            <div class={style.footerContent}>
                <img src={`${url}assets/logo.png`}alt="Logo" />
                <nav>
                    <ul>
                        <li><Link to="/">HOME</Link></li>
                        <li><Link to="/topTrending">TOP TRENDING</Link></li>
                        <li><Link to="/presales">PRESALES</Link></li>
                        <li><Link to="/allTokens">ALL TOKENS</Link></li>
                        <li><Link to="/giveaways">GIVEAWAYS</Link></li>
                        <li><Link to="/submit">Submit Project +</Link></li>
                        <li><Link to="/advertise">Advertise</Link></li>
                        <li><Link to="/contact-us">Contact Us</Link></li>
                    </ul>

                </nav>
                <div class={style.socialMedia}>
                    <a href="https://twitter.com/fantomtribune" target="_blank">
                        <img src={`${url}assets/logo_twitter.png`} alt="Twitter" />
                    </a>
                    <a href="https://t.me/FantomTribune" >
                        <img src={`${url}assets/logo_telegram.png`} alt="Telegram" />
                    </a>
                    <a href="https://medium.com/@fantomtribune" >
                        <img src={`${url}assets/logo_medium.png`} alt="Medium" />
                    </a>
                </div>
            </div>
            <div class={style.footerBottom}>
                <hr />
                <ul>
                    <li>&copy; 2023 fantomtribune.com</li>
                    {/* <li><a href="#">Cookie Statement</a></li> */}
                    <li><Link to="/terms-and-conditions">Terms &amp; Conditions</Link></li>
                    {/* <li><a href="#">Privacy Policy</a></li> */}
                </ul>
            </div>
        </footer>



    );
};

export default Footer;
