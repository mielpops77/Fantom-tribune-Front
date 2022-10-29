import NavigationUserComponent from '../../Navigation/NavigationUser/NavigationUser.component';
import AuthService from "../../../services/auth/auth.service";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import style from "./InfoCoin.module.scss"
const InfoCoin = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const url = AuthService.getUrl()
    let path = window.location.href;
    /* const id = path.substring(50, path.length); */


    // Version Local 
    const id = path.substring(31, path.length);

    useEffect(() => {
        fetch(url + 'ecosystem/')
            .then((res) => res.json())
            .then((res) => {
                setPosts(res);
            });
    }, []);


    function nav(url) {
        navigate(url);
    }
    let postsArray = JSON.parse(JSON.stringify(posts));
    let coin = []

    for (let i = 0; i < postsArray.length; i++) {
        if (postsArray[i]._id === id) {
            coin = postsArray[i];
        }
    }
    let src = "https://kek.tools/t/";
    src = src + coin.contractAddress + "/chart";
    console.log('coincoin', coin);



    return (

        <div className={style.infoCoin_page}>
            <NavigationUserComponent />
            <div className={style.infoCoin_container}>
                <img className={style.infoCoin_img} src={url + coin.image} alt='img' />
                <p className={style.infoCoin_name}>{coin.name} NAME - {coin.symbol} SYMBOL</p>
                <div className={style.infoCoin_infoAndIframe}>
                    <div className={style.infoCoin_info}>
                        <p className={style.infoCoin_textualInfo}>Type: {coin.type} </p>
                        <p className={style.infoCoin_textualInfo}>MarketCap : {coin.marketCap}</p>
                        <p className={style.infoCoin_textualInfo}>Price : {coin.price}</p>
                        <p className={style.infoCoin_textualInfo}>Change in 24h : {coin.percent_change_24h}</p>
                        <p className={style.infoCoin_textualInfo}>LaunchDate: {coin.launchDate} </p>
                        <p>Information incorrect? Please submit an <span onClick={() => nav(`/updateCoin/`)}>Update Request!</span></p>

                    </div>
                    <iframe className={style.infoCoin_iframe} title="Graphical Board" loading="lazy" src={src} width="50%" height="600px" frameborder="0" ></iframe>
                </div>
            </div>
        </div>
    )
}

export default InfoCoin;