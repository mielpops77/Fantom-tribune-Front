import styleModal from "../../../styles/modalVote.module.scss";
import AuthService from "../../../services/auth/auth.service";
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { Timeline } from 'react-twitter-widgets'
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import style from "./InfoCoin.module.scss"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from "axios";

const InfoCoin = () => {
    const [verifVoteToday, setVerifVoteToday] = useState(false);
    const [presaleDate, setPresaleDate] = useState({});
    const [open, setOpen] = React.useState(false);
    const [captcha, setCaptcha] = useState(null);
    const [twitter, setTwitter] = useState(null);
    const [copyAdd, setCopyAdd] = useState(false);
    const user = AuthService.getCurrentUser();
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    const [coin, setCoin] = useState([]);
    const url = AuthService.getUrl();
    let path = window.location.href;
    const navigate = useNavigate();


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
    let dateUtc = date.getFullYear() + '-' + mondayUtc + '-' + dayUtc;
    const now = new Date();
    const currentTime = now.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "UTC"
    });
    //Version Distant
    /* const id = path.substring(50, path.length); */


    // Version Local 
    const id = path.substring(31, path.length);

    const styleBox = {
        boxShadow: '0px 0px 50px rgb(56 136 229 / 90%)',
        transform: 'translate(-50%, -50%)',
        border: '2px solid #3888E5',
        position: 'absolute',
        borderRadius: '10px',
        bgcolor: '#131325',
        width: '30%',
        left: '50%',
        top: '50%',
        p: 4,
    };

    useEffect(() => {
        const pattern = "projetsValidadOnly"
        fetch(url + `searchById?id=${id}&pattern=${pattern}`)
            .then((res) => res.json())
            .then((res) => {
                setCoin(res[0]);
                setTwitter(res[0].twitter.substr(20))
                addPoints("page", res[0]);

                console.log('res', res);

                const dateActuel = dateUtc + " " + currentTime;
                let updatedValue = {};

                const tabLength = res.length > 4 ? 4 : res.length;

                const datePresales = res.slice(0, tabLength).map((item) => {
                    const datePresale = item.launchDate + " " + item.launchDateHour + ":00";
                    return { id: item._id, diff: diffTime(dateActuel, datePresale) };
                });

                datePresales.forEach((item) => {
                    updatedValue[item.id] = item.diff;
                });

                setPresaleDate((presaleDate) => ({ ...presaleDate, ...updatedValue }));
                setInterval(() => incrementSecond(res, updatedValue), 1000);

            })

    }, [])

    const incrementSecond = (res, presaleDateTempo) => {
        const maxIndex = res.length <= 3 ? res.length : 4;
        let updatedPresaleDate = { ...presaleDate };

        for (let i = 0; i < maxIndex; i++) {
            updatedPresaleDate[res[i]._id] = subtractSecond(presaleDateTempo[res[i]._id]);
        }

        setPresaleDate(updatedPresaleDate);
    };
    function subtractSecond(presaleDateTempo) {
        const { diffDays, diffHours, diffMinutes, diffSeconds } = presaleDateTempo;
        let newDiffSeconds = diffSeconds - 1;

        let newDiffMinutes = diffMinutes;
        if (newDiffSeconds < 0) {
            newDiffMinutes = diffMinutes - 1;
            newDiffSeconds = 59;
        }

        let newDiffHours = diffHours;
        if (newDiffMinutes < 0) {
            newDiffHours = diffHours - 1;
            newDiffMinutes = 59;
        }

        let newDiffDays = diffDays;
        if (newDiffHours < 0) {
            newDiffDays = diffDays - 1;
            newDiffHours = 23;
        }

        presaleDateTempo.diffDays = newDiffDays;
        presaleDateTempo.diffHours = newDiffHours;
        presaleDateTempo.diffMinutes = newDiffMinutes;
        presaleDateTempo.diffSeconds = newDiffSeconds;

        return presaleDateTempo;
    }
    function diffTime(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const diffTime = end.getTime() - start.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
        const diffSeconds = Math.floor((diffTime % (1000 * 60)) / 1000);

        return {
            diffDays,
            diffHours,
            diffMinutes,
            diffSeconds
        };
    }

    function getSearchCoinById() {
        const pattern = "projetsValidadOnly"
        return axios.get(url + `searchById?id=${id}&pattern=${pattern}`)
            .then(response => {
                setCoin(response.data[0]);
                // coin.pointsCacul = response.data[0].pointsCacul;
                return response.data[0];
            })
    }


    function nav(url) {
        navigate(url);
    }

    let src = "https://kek.tools/t/";
    src = src + coin.contractAddress + "/chart";



    const addPoints = (type, coinInfo) => {

        if (type == "buy") { window.open('https://spooky.fi/#/swap?outputCurrency=' + coinInfo.contractAddress, '_blank'); }
        if (user !== null) {
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

            let element = { id: coinInfo._id, type: type, hour: date.getUTCHours(), day: dateUtc, value: 1 }

            let date1 = new Date(dateUtc);

            AuthService.getPointsLimitUser(user.id).then((res) => {
                let limiteUser = res;
                for (let i = 0; i < res.length; i++) {
                    if (res[i].id == coinInfo._id && res[i].type == type) {
                        let date2 = new Date(res[i].day);
                        let diff = date1 - date2;
                        let diffJour = diff / (1000 * 3600 * 24);
                        if ((diffJour <= 1 && res[i].day.hour <= date.getUTCHours()) || (res[i].day == dateUtc)) {
                            validation = false;
                        }
                    }
                }
                if (validation) {
                    fetch(url + `addPuntos/?id=${user.id}`, {
                        method: "Put",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ element: element, list: limiteUser })
                    })
                        .then((res) => {

                            res.json()
                            const requestOptions = {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ points: coinInfo.points, pointsCacul: coinInfo.pointsCacul, pointsTwentyHour: coinInfo.pointsTwentyHour, statistique: coinInfo.statistique })
                            };
                            fetch(url + `pointCalcul/?id=${coinInfo._id}&type=${type}`, requestOptions)
                                .then(response => response.json())
                                .finally(() => { getSearchCoinById(); handleClose() })

                        })
                }
            }
            );
        }
    };

    const Propagation = e => {
        e.stopPropagation();
    }


    function login() {
        navigate(`/login/`);
    }


    function vote() {
        setCaptcha(null);
        if (user !== null) {
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

            let dateUtc = date.getFullYear() + '-' + mondayUtc + '-' + dayUtc;
            let date1 = new Date(dateUtc);

            let verif = false;
            AuthService.getPointsLimitUser(user.id).then((res) => {
                for (let i = 0; i < res.length; i++) {
                    if (res[i].id == coin._id && res[i].type == "vote") {
                        let date2 = new Date(res[i].day);
                        let diff = date1 - date2;
                        let diffJour = diff / (1000 * 3600 * 24);
                        if ((diffJour <= 1 && res[i].day.hour <= date.getUTCHours()) || (res[i].day == dateUtc)) {
                            verif = true;
                            setVerifVoteToday(true);
                        }
                    }
                }
                if (!verif) {
                    setVerifVoteToday(false);
                }
            })

        }
        handleOpen();
    }


    function onChangeCaptcha(value) {
        setCaptcha(value);
    }



    function addNewLine(text) {
        if (typeof text !== 'string' || text.trim() === '') {
            return '';
        }
        return text.replace(/\. +/g, ".\n\n").replace(/\n\n+/g, "\n\n").trim();
    }

    const copy = (contractAddress) => {
        setCopyAdd(contractAddress !== "none" ? true : false);
        navigator.clipboard.writeText(contractAddress)
            .then(() => {

                setTimeout(() => {
                    setCopyAdd(false);
                }, 1000);
            })
            .catch(error => {
                console.error('Failed to copy to clipboard: ', error);
            });
    }


    return (

        <div className={style.infoCoin_page}>
            <div className={style.container}>
                <div className={style.block}>
                    <div className={style.blockLeft}>
                        <div className={style.blockLogo}>
                            <div className={style.blockLogoContainer}>
                                <div className={style.left} ><img className={style.img} src={url + coin.image} alt='img' /></div>
                                <div className={style.center} >
                                    <div className={style.ligne1}>
                                        <p className={style.textLigne1}><span className={style.popularity}><img className={style.imgStar} src={url + "assets/star2.png"} alt='img' />Popularity:</span> On <span className={style.popularity}>23</span> watchlist</p>
                                        <p className={style.addWhitelist}><img className={style.imgStarEmpty} src={url + "assets/starEmpty.png"} alt='img' /> Add to watchlist</p>

                                    </div>
                                    <div className={style.ligne2}>
                                        <p className={style.name}>{coin.name}  - {coin.symbol} </p>
                                    </div>
                                    <div className={style.ligne3}>

                                        <p className={style.ftmAdress} onClick={() => copy(coin.contractAddress)}>
                                            FTM Contract adress: {coin.contractAddress}
                                            {!copyAdd && <img className={style.img} src={url + "assets/copy.png"} alt='img' />}
                                            {copyAdd && <img className={style.img} src={url + "assets/copyFull.png"} alt='img' />}
                                            {copyAdd && <span className={style.copy}>copied!</span>}</p>

                                    </div>
                                    <div className={style.ligne4}>
                                        {(coin.websiteLink !== "" && coin.websiteLink !== undefined) &&
                                            <a href={coin.websiteLink.startsWith('http') ? coin.websiteLink : `http://${coin.websiteLink}`} target="_blank" rel="noopener noreferrer">
                                                <img className={style.img} src={url + "assets/web.png"} alt='img' onClick={() => addPoints('website', coin)} />
                                            </a>
                                        }

                                        {(coin.twitter !== "" && coin.twitter !== undefined) &&
                                            <a href={coin.twitter.startsWith('http') ? coin.twitter : `http://${coin.twitter}`} target="_blank" rel="noopener noreferrer">
                                                <img className={style.img} src={url + "assets/twitter.png"} alt='img' onClick={() => addPoints('twitter', coin)} />
                                            </a>
                                        }
                                        {(coin.telegram !== "" && coin.telegram !== undefined) &&
                                            <a href={coin.telegram.startsWith('http') ? coin.telegram : `http://${coin.telegram}`} target="_blank" rel="noopener noreferrer">
                                                <img className={style.img} src={url + "assets/telegram.png"} alt='img' onClick={() => addPoints('telegram', coin)} />
                                            </a>
                                        }
                                        {(coin.medium !== "" && coin.medium !== undefined) &&
                                            <a href={coin.medium.startsWith('http') ? coin.medium : `http://${coin.medium}`} target="_blank" rel="noopener noreferrer">
                                                <img className={style.img} src={url + "assets/medium.png"} alt='img' onClick={() => addPoints('medium', coin)} />
                                            </a>
                                        }
                                        {(coin.discord !== "" && coin.discord !== undefined) &&
                                            <a href={coin.discord.startsWith('http') ? coin.discord : `http://${coin.discord}`} target="_blank" rel="noopener noreferrer">
                                                <img className={style.img} src={url + "assets/discord.png"} alt='img' onClick={() => addPoints('discord', coin)} />
                                            </a>
                                        }
                                        {(coin.facebook !== "" && coin.facebook !== undefined) &&
                                            <a href={coin.facebook.startsWith('http') ? coin.facebook : `http://${coin.facebook}`} target="_blank" rel="noopener noreferrer">
                                                <img className={style.img} src={url + "assets/facebook.png"} alt='img' onClick={() => addPoints('facebook', coin)} />
                                            </a>
                                        }
                                        {(coin.github !== "" && coin.github !== undefined) &&
                                            <a href={coin.github.startsWith('http') ? coin.github : `http://${coin.github}`} target="_blank" rel="noopener noreferrer">
                                                <img className={style.img} src={url + "assets/github.png"} alt='img' onClick={() => addPoints('github', coin)} />
                                            </a>
                                        }
                                        {(coin.reddit !== "" && coin.reddit !== undefined) &&
                                            <a href={coin.reddit.startsWith('http') ? coin.reddit : `http://${coin.reddit}`} target="_blank" rel="noopener noreferrer">
                                                <img className={style.img} src={url + "assets/reddit.png"} alt='img' onClick={() => addPoints('reddit', coin)} />
                                            </a>
                                        }
                                        {(coin.insta !== "" && coin.insta !== undefined) &&
                                            <a href={coin.insta.startsWith('http') ? coin.insta : `http://${coin.insta}`} target="_blank" rel="noopener noreferrer">
                                                <img className={style.img} src={url + "assets/instagram.png"} alt='img' onClick={() => addPoints('instagram', coin)} />
                                            </a>
                                        }

                                    </div>

                                </div>
                                <div className={style.right} ></div>
                            </div>




                        </div>
                        <div className={style.blockPrice}>
                            {presaleDate[coin._id] !== undefined && coin.presale == "yes" && <div className={style.openai2}>
                                {coin.presale == "yes" && !(presaleDate[coin._id].diffDays < 0 || presaleDate[coin._id].diffHours < 0 || presaleDate[coin._id].diffMinutes < 0 || presaleDate[coin._id].diffSeconds < 0) &&
                                    <tr className={style.openai2}>
                                        <span className={style.statusPresale}>
                                            The presale starts  <span className={style.statusSoon}>SOON</span> 
                                        </span>
                                        <td className={style.openai}><span className={style.span1}>{presaleDate[coin._id].diffDays}</span> <br /><span className={style.span1}>DAYS</span></td>
                                        <td className={style.openai}><span className={style.span1}>{presaleDate[coin._id].diffHours}</span> <br /><span className={style.span1}>HR</span></td>
                                        <td className={style.openai}><span className={style.span1}>{presaleDate[coin._id].diffMinutes}</span> <br /><span className={style.span1}>MINS</span></td>
                                        <td className={style.openai}><span className={style.span1}>{presaleDate[coin._id].diffSeconds}</span> <br /><span className={style.span1}>SECS</span></td>
                                    </tr>
                                }


                                {coin.presale == "yes" && (presaleDate[coin._id].diffDays < 0 || presaleDate[coin._id].diffHours < 0 || presaleDate[coin._id].diffMinutes < 0 || presaleDate[coin._id].diffSeconds < 0) &&
                                    <tr className={style.openai2}>
                                        <span className={style.statusPresale}>The presale is <span className={style.statusLive}>LIVE</span></span>
                                        <td className={style.openai}><span className={style.span1}>0</span> <br /><span className={style.span1}>DAYS</span></td>
                                        <td className={style.openai}><span className={style.span1}>0</span> <br /><span className={style.span1}>HR</span></td>
                                        <td className={style.openai}><span className={style.span1}>0</span> <br /><span className={style.span1}>MINS</span></td>
                                        <td className={style.openai}><span className={style.span1}>0</span> <br /><span className={style.span1}>SECS</span></td>
                                    </tr>}
                            </div>}
                            {coin.presale !== "yes" &&
                                <div className={style.left}>
                                    <div className={style.ligne1}>
                                        {coin.price !== undefined && (
                                            <p className={style.price}>Price(USD)</p>
                                        )}
                                    </div>
                                    <div className={style.ligne2}>

                                        <p className={style.price}>${coin.price}  <mat-chip> <label htmlFor="chip-1">{coin.percent_change_24h}%</label></mat-chip>  </p>
                                    </div>
                                </div>}
                            {coin.presale !== "yes" &&

                                <div className={style.right}>

                                    <div className={style.ligne1}>
                                        <p className={style.price}>Cap. Marché</p>
                                    </div>
                                    <div className={style.ligne2}>
                                        {coin.marketCap !== undefined && (
                                            <p className={style.price}>${coin.marketCap.toLocaleString('fr-FR', { useGrouping: true }).replace(/\s/g, ',')} </p>
                                        )}
                                    </div>
                                </div>}
                        </div>
                        {coin.presale !== "yes" &&
                            <div className={style.blockChart}>
                                <iframe className={style.iframe} title="Graphical Board" loading="lazy" src={src} width="100%" height="100%" borderRadius="15px"  ></iframe>
                            </div>}
                        <div className={style.blockDescription}>
                            <div className={style.ligne1}>
                                <p className={style.descriptionTitle}>Description</p>
                            </div>
                            <div className={style.ligne2}>
                                <p className={style.descriptionText}>
                                    {coin.description && addNewLine(coin.description).slice(0, -1)}
                                </p>
                            </div>


                        </div>

                        <p className={style.wrongInfo}>Information incorrect? Please submit an <span className={style.updateRequest} onClick={() => nav(`/updateCoin/`)}>Update Request!</span></p>

                    </div>
                    <div className={style.blockRight}>
                        <div className={style.blockInfo}>

                            <div className={style.ligne1}>
                                <p className={style.informationTitle}>Coin information</p>

                            </div>

                            <div className={style.ligne2}>
                                <p className={style.descriptionTitle}>Type:</p>
                                {coin.type !== undefined && (
                                    <p className={style.descriptionTitle}>{coin.type}</p>
                                )}
                            </div>

                            <div className={style.ligne3}>
                                <p className={style.descriptionTitle}>KYC:</p>
                                {/*   {coin.kyc !== undefined && (
                                     color: #ffffff;
                                     background: #4685ff 0% 0% no-repeat padding-box;
                                     border-color: #0d6efd;
                                     font-weight: 400;
                                     font-size: 0.9vw;
                                     font-family: "Fira Sans", sans-serif;
                                     line-height: 1.5;
                                     text-decoration: none;
                                     vertical-align: middle;
                                     padding: 0.375rem 0.75rem;
                                     border-radius: 4px;
                                     width: 15%;
                                     margin: 3%;
                                     left: 1%;
                                     top: 1%;
                                     position: absolute; */}
                                {
                                    coin.kyc &&
                                    <p className={style.descriptionTitle}><span className={style.kyc}>KYC</span></p>
                                }
                                {
                                    !coin.kyc &&
                                    <p className={style.descriptionTitle}>unspecified</p>
                                }
                            </div>

                            <div className={style.ligne4}>
                                <p className={style.descriptionTitle}>Audit:</p>

                                {
                                    coin.audit &&
                                    <p className={style.descriptionTitle}><span className={style.audit}>AUDIT</span></p>
                                }
                                {
                                    !coin.audit &&
                                    <p className={style.descriptionTitle}>unspecified</p>
                                }

                                {/*  <p className={style.descriptionTitle}>Audit:</p>
                                {coin.kyc !== undefined && (
                                    <p className={style.descriptionTitle}>{coin.kyc.toString()}</p>
                                )} */}
                            </div>

                            <div className={style.ligne5}>
                                <p className={style.descriptionTitle}>Launch:</p>
                                {coin.launchDate !== undefined && (
                                    <p className={style.descriptionTitle}>{coin.launchDate}</p>
                                )}
                            </div>

                            <div className={style.ligne6}>
                                <p className={style.descriptionTitle}>Vote</p>
                                {coin.statistique !== undefined && (
                                    <p className={style.descriptionTitle}>{coin.statistique.global.vote}</p>
                                )}
                            </div>

                            <div className={style.ligne7}>
                                <p className={style.descriptionTitle}>Votes today:</p>
                                {coin.statistique !== undefined && (
                                    <p className={style.descriptionTitle}>{coin.statistique.twentyHour.vote}</p>
                                )}
                            </div>

                            <div className={style.ligne8}>
                                {/* <p className={style.descriptionTitle}>BUY ON   </p> */}
                                {coin.presale !== "yes" &&
                                    <span className={style.buyOn}>BUY ON </span>}

                                {coin.presale !== "yes" &&
                                    <button type="button" onClick={() => addPoints('buy', coin)} className={style.buttonBuy}> <img className={style.img} src={url + "assets/boo.png"} alt='img' />Spookyswap  </button>
                                }




                                {coin.presale !== "no" &&
                                    <button type="button" onClick={() => addPoints('buy', coin)} className={style.buttonBuy}> View presale </button>
                                }

                            </div>
                            <div className={style.ligne9}>
                                <button type="button" onClick={() => vote()} className={style.voteButton}>Vote for {coin.name} </button>
                                {/* <p className={style.descriptionTitle}>Vote for {coin.symbol} </p> */}
                            </div>

                        </div>

                        <div className={style.blockTwitter}>
                            {coin.presale !== "yes" &&
                                <Timeline
                                    dataSource={{ sourceType: "profile", screenName: `${twitter}` }}
                                    options={{ theme: "dark", width: "100%", height: "640px" }}
                                />
                            }

                            {coin.presale == "yes" &&
                                <Timeline
                                    dataSource={{ sourceType: "profile", screenName: `${twitter}` }}
                                    options={{ theme: "dark", width: "100%", height: "400px" }}
                                />
                            }
                        </div>
                    </div>

                    {/* <div className={style.blockDescription}></div> */}
                    {/*  <div className={style.block2}>

                </div>
                <div className={style.block3}>

                </div> */}
                    {/*  <img className={style.img} src={url + coin.image} alt='img' />
                <p className={style.name}>{coin.name}  - {coin.symbol} </p>
                <button type="button" onClick={() => vote()} className={style.voteButton}>Vote</button>
                <button type="button" onClick={() => addPoints('buy', coin)} className={style.voteButton}>Buy</button>
                <div className={style.infoAndIframe}>
                    <div className={style.info}>
                        <p className={style.textualInfo}>Type: {coin.type} </p>
                        <p className={style.textualInfo}>MarketCap : {coin.marketCap}</p>
                        <p className={style.textualInfo}>Price : {coin.price}</p>
                        <p className={style.textualInfo}>Change in 24h : {coin.percent_change_24h}</p>
                        <p className={style.textualInfo} onClick={() => addPoints('coinMarketCap', coin)}><a href={coin.coinMarketCapLink} target="_blank">coinMarketCapLink</a></p>
                        <p className={style.textualInfo}>contractAddress: {coin.contractAddress} </p>
                        <p className={style.textualInfo}>createdOn: {coin.createdOn} </p>
                        <p className={style.textualInfo}>description: {coin.description} </p>
                        <p className={style.textualInfo} onClick={() => addPoints('website', coin)}><a href={coin.websiteLink} target="_blank">websiteLink</a> </p>
                        <p className={style.textualInfo} onClick={() => addPoints('discord', coin)} ><a href={coin.discord} target="_blank">discord</a></p>
                        <p className={style.textualInfo} onClick={() => addPoints('telegram', coin)}><a href={coin.telegram} target="_blank">telegram</a></p>
                        <p className={style.textualInfo} onClick={() => addPoints('twitter', coin)}><a href={coin.twitter} target="_blank">twitter</a> </p>
                        <p className={style.textualInfo}>vote: {coin.vote} </p>
                        <p className={style.textualInfo}>voteToday: {coin.voteTwentyHour} </p>

                    </div>
                    <Timeline
                        dataSource={{ sourceType: "profile", screenName: `${twitter}` }}
                        options={{ theme: "dark", width: "400", height: "600" }}
                    />

                    <iframe className={style.iframe} title="Graphical Board" loading="lazy" src={src} width="50%" height="550px"  ></iframe>
                </div> */}
                    {/*      <div  className={style.block4}>
                <iframe className={style.iframe} title="Graphical Board" loading="lazy" src={src} width="100%" height="100%" borderRadius="15px"  ></iframe>
                </div> */}
                </div>





            </div>



            <Modal className={styleModal.modalBackground}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleBox}>
                    <Typography id="modal-modal-title" className={styleModal.typo} variant="h6" component="h2">
                        <div className={styleModal.divTitle}>
                            Vote for {coin.name}
                        </div>
                        <div className={styleModal.divTypo} >
                            <img className={styleModal.imgModal} src={url + coin.image} alt='img' /></div>
                        {(user !== null && !verifVoteToday) &&
                            <ReCAPTCHA className={styleModal.captcha}
                                sitekey="6LdjgCcjAAAAAKtlNP6UasdKdiBbjeQ82NAPAOtG"
                                onChange={onChangeCaptcha}
                            />}
                    </Typography>
                    <Typography className={styleModal.typo}>
                        <div className={styleModal.divTypo}>
                            {(user !== null && !verifVoteToday) &&
                                <button type="button" onClick={function (event) { Propagation(event); addPoints('vote', coin) }} className={`${captcha == null ? styleModal.voteButtonTypoNotAllowed : styleModal.voteButtonTypo}`} >Votes</button>
                            }
                            {(user !== null && verifVoteToday) &&
                                <button type="button" onClick={function (event) { Propagation(event); handleClose() }} className={styleModal.voteButtonTypo}>thank you for voting</button>
                            }
                            {user == null &&
                                <button type="button" onClick={function (event) { Propagation(event); login() }} className={styleModal.voteButtonTypo}>Please login for vote</button>
                            }
                        </div>
                    </Typography>
                    <Typography className={styleModal.typo} id="modal-modal-description" sx={{ mt: 2 }}>
                        You can vote once every 24 hours.
                    </Typography>
                </Box>
            </Modal>
        </div >
    )
}

export default InfoCoin;