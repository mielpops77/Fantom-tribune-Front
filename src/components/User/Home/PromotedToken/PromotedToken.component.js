import styleModal from "../../../../styles/modalVote.module.scss";
import AuthService from "../../../../services/auth/auth.service";
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import style from "../Home.module.scss";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const url = AuthService.getUrl();


const PromotedToken = () => {

    const [elements, setElements] = useState([]);
    const [user, setUser] = useState([]);
    const [captcha, setCaptcha] = useState(null);
    const [verifVoteToday, setVerifVoteToday] = useState(false);
    const [data, setData] = useState({
        id: "",
        name: "",
        image: "",
        points: "",
        pointsTwentyHour: "",
        pointsCacul: "",
        statistique: "",
        limiteUser: []
    });

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

    useEffect(() => {
        setUser(AuthService.getCurrentUser());
        fetch(url + 'getPromotedProject')
            .then((res) => res.json())
            .then((res) => {
                setElements(res);
            })
    }, []);


    function buy(contractAdress, coinId, points, pointsTwentyHour, pointsCacul, statistique) {
        window.open('https://spooky.fi/#/swap?outputCurrency=' + contractAdress, '_blank');
        if (user !== null) {
            let verif = false;
            AuthService.getPointsLimitUser(user.id).then((res) => {
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].id == coinId && res.data[i].type == "buy") {
                        let date2 = new Date(res.data[i].day);
                        let diff = date1 - date2;
                        let diffJour = diff / (1000 * 3600 * 24);
                        if ((diffJour <= 1 && res.data[i].day.hour <= date.getUTCHours()) || (res.data[i].day == dateUtc)) {
                            verif = true;
                        }
                    }
                }

                if (!verif) {
                    let element = { id: coinId, type: "buy", hour: date.getUTCHours(), day: dateUtc, value: 1 }
                    fetch(url + `addPuntos/?id=${user.id}`, {
                        method: "Put",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ element: element, list: res.data })
                    })
                        .then((res) => {

                            res.json()
                            const requestOptions = {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ points: points, pointsCacul: pointsCacul, pointsTwentyHour: pointsTwentyHour, statistique: statistique })
                            };
                            fetch(url + `pointCalcul/?id=${coinId}&type=buy`, requestOptions)
                                .then(response => response.json())
                                .finally(() => { setElements([]); getPromotedProjecRequest(); handleClose() })

                        })
                }




            })

        }

    }


    function getPromotedProjecRequest() {
        fetch(url + 'getPromotedProject')
            .then((res) => res.json())
            .then((res) => {
                setElements(res);
            })
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const styleBox = {
        border: '2px solid #3888E5',
        position: 'absolute',
        borderRadius: '10px',
        boxShadow: '0px 0px 50px rgb(56 136 229 / 90%)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '30%',
        bgcolor: '#131325',
        p: 4,
    };


    const navigate = useNavigate();

    const Propagation = e => {
        e.stopPropagation();
    }


    function login() {
        navigate(`/login/`);
    }




    function nav(url) {
        navigate(url);
    }



    function onChangeCaptcha(value) {
        setCaptcha(value);
    }


    function vote(coinId, name, image, points, pointsTwentyHour, pointsCacul, statistique) {
        setCaptcha(null);
        setData({ id: coinId, name: name, image: url + image, points: points, pointsTwentyHour: pointsTwentyHour, pointsCacul: pointsCacul, statistique: statistique });
        if (user !== null) {
            let verif = false;
            AuthService.getPointsLimitUser(user.id).then((res) => {
                setData({ id: coinId, name: name, image: url + image, points: points, pointsTwentyHour: pointsTwentyHour, pointsCacul: pointsCacul, statistique: statistique, limiteUser: res.data });
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].id == coinId && res.data[i].type == "vote") {
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

    const addPoints = () => {

        let element = { id: data.id, type: "vote", hour: date.getUTCHours(), day: dateUtc, value: 1 }
        fetch(url + `addPuntos/?id=${user.id}`, {
            method: "Put",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ element: element, list: data.limiteUser })
        })
            .then((res) => {

                res.json()
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ points: data.points, pointsCacul: data.pointsCacul, pointsTwentyHour: data.pointsTwentyHour, statistique: data.statistique })
                };
                fetch(url + `pointCalcul/?id=${data.id}&type=vote`, requestOptions)
                    .then(response => response.json())
                    .finally(() => { setElements([]); getPromotedProjecRequest(); handleClose() })

            })
    };


    return (
        <div className={style.divSingleBlock}>
            <div className={style.sectionBackground}></div>
            {elements.map((item, key) => {
                return <div onClick={() => nav(`/infoCoin/${item._id}`)} key={key} className={style.card}>
                    <div className={style.divAllInfo}>
                        {
                            item.kyc && <p className={style.KYCButton}>KYC</p>}

                        <div className={style.imgCrown}></div>
                        <img src={url + item.image} className={style.imgProjectLogo} alt='project_logo'></img>
                        <h1 className={style.projectName}>{item.name}</h1>
                        {item.launchDate >= dateUtc && <p className={style.presaleButton}>PreSale</p>}
                        <div className={style.list}>
                            <table>
                                <tbody>
                                    <tr><td className={style.pointer}>Type: </td><td className={style.pointedItem}>{item.type}</td></tr>
                                    <tr><td className={style.pointer}>Market Cap: </td><td className={style.pointedItem}>$ {item.marketCap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td></tr>
                                    <tr><td className={style.pointer}>Price: </td><td className={style.pointedItem}>$ {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</td></tr>
                                    <tr><td className={style.pointer}>Change in 24h: </td><td className={style.pointedItem}>{item.percent_change_24h} %   {item.percent_change_24h > 0 && <img src={url + "assets/Up-arrow.png"} className={style.imgUpArrow} alt='Up-arrow'></img>}  {item.percent_change_24h < 0 && <img src={url + "assets/Down-arrow.png"} className={style.imgUpArrow} alt='Down-arrow'></img>}</td></tr>
                                    <tr><td className={style.pointer}>Launch: </td><td className={style.pointedItem}>{item.launchDate}</td></tr>
                                    <tr><td className={style.pointer}>Votes: </td><td className={style.pointedItem}>{item.statistique.global.vote}</td></tr>
                                    <tr><td className={style.pointer}>Votes in 24h: </td><td className={style.pointedItem}>{item.statistique.twentyHour.vote}</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={style.cardFooter}>
                            <button onClick={function (event) { Propagation(event); vote(item._id, item.name, item.image, item.points, item.pointsTwentyHour, item.pointsCacul, item.statistique) }} className={style.voteButton}>Vote</button>
                            <button onClick={function (event) { Propagation(event); buy(item.contractAddress, item._id, item.points, item.pointsTwentyHour, item.pointsCacul, item.statistique) }} className={style.buyButton}>Buy</button>
                        </div>
                    </div>
                </div>
            })}
            <Modal className={styleModal.modalBackground}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleBox}>
                    <Typography id="modal-modal-title" className={styleModal.typo} variant="h6" component="h2">
                        <div className={styleModal.divTitle}>
                            Vote for {data.name}
                        </div>
                        <div className={styleModal.divTypo} >
                            <img className={styleModal.imgModal} src={data.image} alt='img' /></div>
                        {(user !== null && !verifVoteToday) &&
                            <ReCAPTCHA className={styleModal.captcha}
                                sitekey="6LdjgCcjAAAAAKtlNP6UasdKdiBbjeQ82NAPAOtG"
                                onChange={onChangeCaptcha}
                            />}
                    </Typography>
                    <Typography className={styleModal.typo}>
                        <div className={styleModal.divTypo}>
                            {(user !== null && !verifVoteToday) &&
                                <button type="button" onClick={function (event) { Propagation(event); addPoints() }} className={`${captcha == null ? styleModal.voteButtonTypoNotAllowed : styleModal.voteButtonTypo}`} >Votes</button>
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
    );
}

export default PromotedToken;



