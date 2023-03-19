import React from "react";
import { Link } from "react-router-dom";
import style from "./Footer.module.scss";

const Footer = () => {
    console.log('url');

    return (
        <footer class={style.footerContainer}>
            <div class={style.footerContent}>
                <img src="http://localhost:3000/assets/logo.png" alt="Logo" />
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
                        <img src="http://localhost:3000/assets/logo_twitter.png" alt="Twitter" />
                    </a>
                    <a href="#">
                        <img src="http://localhost:3000/assets/logo_telegram.png" alt="Telegram" />
                    </a>
                </div>
            </div>
            <div class={style.footerBottom}>
                <hr />
                <ul>
                    <li>&copy; 2023 fantomtribune.com</li>
                    <li><a href="#">Cookie Statement</a></li>
                    <li><a href="#">Terms &amp; Conditions</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                </ul>
            </div>
        </footer>



    );
};

export default Footer;
