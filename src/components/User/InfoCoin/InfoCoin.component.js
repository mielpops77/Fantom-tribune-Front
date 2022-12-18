import styleModal from "../../../styles/modalVote.module.scss";
import AuthService from "../../../services/auth/auth.service";
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import style from "./InfoCoin.module.scss"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from "axios";

const InfoCoin = () => {
    const [verifVoteToday, setVerifVoteToday] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [captcha, setCaptcha] = useState(null);
    const user = AuthService.getCurrentUser();
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    const [coin, setCoin] = useState([]);
    const url = AuthService.getUrl();
    let path = window.location.href;
    const navigate = useNavigate();


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
                addPoints("page", res[0]);

            })

    }, [])

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
                let limiteUser = res.data;

                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].id == coinInfo._id && res.data[i].type == type) {
                        let date2 = new Date(res.data[i].day);
                        let diff = date1 - date2;
                        let diffJour = diff / (1000 * 3600 * 24);
                        if ((diffJour <= 1 && res.data[i].day.hour <= date.getUTCHours()) || (res.data[i].day == dateUtc)) {
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
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].id == coin._id && res.data[i].type == "vote") {
                        let date2 = new Date(res.data[i].day);
                        let diff = date1 - date2;
                        let diffJour = diff / (1000 * 3600 * 24);
                        if ((diffJour <= 1 && res.data[i].day.hour <= date.getUTCHours()) || (res.data[i].day == dateUtc)) {
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

    return (

        <div className={style.infoCoin_page}>
            <div className={style.container}>
                <img className={style.img} src={url + coin.image} alt='img' />
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
                    <iframe className={style.iframe} title="Graphical Board" loading="lazy" src={src} width="50%" height="550px" /* frameborder="0" */ ></iframe>
                </div>
                <p className={style.wrongInfo}>Information incorrect? Please submit an <span className={style.updateRequest} onClick={() => nav(`/updateCoin/`)}>Update Request!</span></p>
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