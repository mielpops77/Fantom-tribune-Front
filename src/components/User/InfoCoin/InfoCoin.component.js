import NavigationUserComponent from '../../Navigation/NavigationUser/NavigationUser.component';
import AuthService from "../../../services/auth/auth.service";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import style from "./InfoCoin.module.scss"
const InfoCoin = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const url = AuthService.getUrl();
    const user = AuthService.getCurrentUser();
    let path = window.location.href;
    //Version Distant
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



    const addPoints = (type) => {
        console.log("???????????????????????");

        let date = new Date();
        let mondayUtc = (date.getUTCMonth() + 1)
        mondayUtc = parseInt(mondayUtc);
        let dayUtc = date.getUTCDate()
        dayUtc = parseInt(dayUtc);
        if (mondayUtc < 10) {
            mondayUtc = '0' + mondayUtc.toString()
        }

        if (dayUtc < 10) {
            dayUtc = '0' + dayUtc.toString()
        }

        let validation = true;
        let dateUtc = date.getFullYear() + '-' + mondayUtc + '-' + dayUtc;

        let element = { id: coin._id, type: type, hour: date.getUTCHours(), day: dateUtc, value: 1 }

        let date1 = new Date(dateUtc);
        console.log(type);
        AuthService.getPointsLimitUser(user.id).then((res) => {
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].id == coin._id && res.data[i].type == type) {
                    let date2 = new Date(res.data[i].day);
                    let diff = date1 - date2;
                    let diffJour = diff / (1000 * 3600 * 24);
                    if ((diffJour <= 1 && res.data[i].day.hour <= date.getUTCHours()) || (res.data[i].day == dateUtc)) {
                        validation = false;
                        console.log('annulé déja pris bro')
                    }
                }
            }

            if (validation) {
                fetch(url + `addPuntos/?id=${user.id}`, {
                    method: "Put",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ element: element })
                })
                    .then((res) => res.json())

            }
        }
        );


    };

    return (

        <div className={style.infoCoin_page}>
            <NavigationUserComponent />
            <div className={style.infoCoin_container}>
                <img className={style.infoCoin_img} src={url + coin.image} alt='img' />
                <p className={style.infoCoin_name}>{coin.name}  - {coin.symbol} </p>
                <div className={style.infoCoin_infoAndIframe}>
                    <div className={style.infoCoin_info}>
                        <p className={style.infoCoin_textualInfo}>Type: {coin.type} </p>
                        <p className={style.infoCoin_textualInfo}>MarketCap : {coin.marketCap}</p>
                        <p className={style.infoCoin_textualInfo}>Price : {coin.price}</p>
                        <p className={style.infoCoin_textualInfo}>Change in 24h : {coin.percent_change_24h}</p>
                        <p className={style.infoCoin_textualInfo} onClick={() => addPoints('coinMarketCapLink')}><a href={coin.coinMarketCapLink} target="_blank">coinMarketCapLink</a></p>
                        <p className={style.infoCoin_textualInfo}>contractAddress: {coin.contractAddress} </p>
                        <p className={style.infoCoin_textualInfo}>createdOn: {coin.createdOn} </p>
                        <p className={style.infoCoin_textualInfo}>description: {coin.description} </p>
                        <p className={style.infoCoin_textualInfo} onClick={() => addPoints('websiteLink')}><a href={coin.websiteLink} target="_blank">websiteLink</a> </p>
                        <p className={style.infoCoin_textualInfo} onClick={() => addPoints('discord')} ><a href={coin.discord} target="_blank">discord</a></p>
                        <p className={style.infoCoin_textualInfo} onClick={() => addPoints('telegram')}><a href={coin.telegram} target="_blank">telegram</a></p>
                        <p className={style.infoCoin_textualInfo} onClick={() => addPoints('twitter')}><a href={coin.twitter} target="_blank">twitter</a> </p>
                        <p className={style.infoCoin_textualInfo}>vote: {coin.vote} </p>
                        <p className={style.infoCoin_textualInfo}>voteToday: {coin.voteTwentyHour} </p>


                        <p>Information incorrect? Please submit an <span onClick={() => nav(`/updateCoin/`)}>Update Request!</span></p>
                    </div>
                    <iframe className={style.infoCoin_iframe} title="Graphical Board" loading="lazy" src={src} width="50%" height="550px" frameborder="0" ></iframe>
                </div>
            </div>
        </div >
    )
}

export default InfoCoin;