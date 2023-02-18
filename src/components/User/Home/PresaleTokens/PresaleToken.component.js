import styleModal from "../../../../styles/modalVote.module.scss";
import AuthService from "../../../../services/auth/auth.service";
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from 'react-router-dom';
import style from "./Presale.module.scss";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


const PresaleTokens = () => {
    const [verifVoteToday, setVerifVoteToday] = useState(false);
    const [presaleDate, setPresaleDate] = useState({});
    const [elements, setElements] = useState([]);
    const [captcha, setCaptcha] = useState(null);
    const [user, setUser] = useState([]);
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
    const url = AuthService.getUrl();
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

    const now = new Date();
    const currentTime = now.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "UTC"
    });


    useEffect(() => {
        setUser(AuthService.getCurrentUser());
        fetch(url + 'launchDate/?limite=4&skip=0&action=launchDateAsc&type=All')
            .then((res) => res.json())
            .then((res) => {
                setElements(res);
                
                const dateActuel = dateUtc + " " + currentTime;
                let updatedValue = {};

                const datePresales = res.slice(0, 4).map((item) => {
                    const datePresale = item.launchDate + " " + item.launchDateHour + ":00";
                    return { id: item._id, diff: diffTime(dateActuel, datePresale) };
                });

                datePresales.forEach((item) => {
                    updatedValue[item.id] = item.diff;
                });

                setPresaleDate((presaleDate) => ({ ...presaleDate, ...updatedValue }));
                setInterval(() => incrementSecond(res, updatedValue), 1000);
            });
    }, []);



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




    function buy(contractAdress, coinId, points, pointsTwentyHour, pointsCacul, statistique) {
        window.open('https://spooky.fi/#/swap?outputCurrency=' + contractAdress, '_blank');
        if (user !== null) {
            let verif = false;
            AuthService.getPointsLimitUser(user.id).then((res) => {
                for (let i = 0; i < res.length; i++) {
                    if (res[i].id == coinId && res[i].type == "buy") {
                        let date2 = new Date(res[i].day);
                        let diff = date1 - date2;
                        let diffJour = diff / (1000 * 3600 * 24);
                        if ((diffJour <= 1 && res[i].day.hour <= date.getUTCHours()) || (res[i].day == dateUtc)) {
                            verif = true;
                        }
                    }
                }

                if (!verif) {
                    let element = { id: coinId, type: "buy", hour: date.getUTCHours(), day: dateUtc, value: 1 }
                    fetch(url + `addPuntos/?id=${user.id}`, {
                        method: "Put",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ element: element, list: res })
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
                                .finally(() => { setElements([]); getTopRankedRequest(); handleClose() })

                        })
                }




            })

        }

    }

    function getTopRankedRequest() {
        fetch(url + 'launchDate/?limite=4&skip=0&action=launchDateAsc&type=All')
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

    /* const history = useHistory(); */

    const navigate = useNavigate();

    function login() {
        /*  history.push(`/login/`) */
        navigate(`/login/`);
    }


    const Propagation = e => {
        e.stopPropagation();
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
                setData({ id: coinId, name: name, image: url + image, points: points, pointsTwentyHour: pointsTwentyHour, pointsCacul: pointsCacul, statistique: statistique, limiteUser: res });
                for (let i = 0; i < res.length; i++) {
                    if (res[i].id == coinId && res[i].type == "vote") {
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
                    .finally(() => { setElements([]); getTopRankedRequest(); handleClose() })

            })
    };

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




    return (
        <div className={style.presaleBlock}>
            <div className={style.sectionBackground}></div>
            {elements.map((item, key) => {
                return <div onClick={() => nav(`/infoCoin/${item._id}`)} key={key} className={style.card}>
                    <div className={style.divAllInfo}>
                        {
                            item.kyc && <p className={style.KYCButton}>KYC</p>}
                        <div className={style.imgCrown}></div>
                        <img src={url + item.image} className={style.imgProjectLogo} alt='img'></img>
                        <h1 className={style.projectName}>{item.name}</h1>
                        {item.launchDate >= dateUtc && <p className={style.presaleButton}>PreSale</p>}
                        {(dateUtc >= item.launchDate && currentTime>item.launchDateHour) && <p className={style.liveButton}>Live</p>}

                        <div className={style.list}>
                            <table>
                                <tbody>
                                    {!(dateUtc >= item.launchDate && currentTime>item.launchDateHour) &&
                                    <tr className={style.openai2}>
                                        <td className={style.openai}><span className={style.span1}>{presaleDate[item._id].diffDays}</span> <br /><span className={style.span1}>DAYS</span></td>
                                        <td className={style.openai}><span className={style.span1}>{presaleDate[item._id].diffHours}</span> <br /><span className={style.span1}>HR</span></td>
                                        <td className={style.openai}><span className={style.span1}>{presaleDate[item._id].diffMinutes}</span> <br /><span className={style.span1}>MINS</span></td>
                                        <td className={style.openai}><span className={style.span1}>{presaleDate[item._id].diffSeconds}</span> <br /><span className={style.span1}>SECS</span></td>
                                    </tr>}

                                    {(dateUtc >= item.launchDate && currentTime>item.launchDateHour) &&
                                    <tr className={style.openai2}>
                                        <td className={style.openai}><span className={style.span1}>0</span> <br /><span className={style.span1}>DAYS</span></td>
                                        <td className={style.openai}><span className={style.span1}>0</span> <br /><span className={style.span1}>HR</span></td>
                                        <td className={style.openai}><span className={style.span1}>0</span> <br /><span className={style.span1}>MINS</span></td>
                                        <td className={style.openai}><span className={style.span1}>0</span> <br /><span className={style.span1}>SECS</span></td>
                                    </tr>}
                                    <tr className={style.trTest}><td className={style.hum}> <span className={style.hum2}>Type:</span><span className={style.hum3}>{item.type}</span></td></tr>
                                    <tr className={style.trTest}><td className={style.hum}> <span className={style.hum2}>Launch:</span><span className={style.hum3}>{item.launchDate}</span></td></tr>
                                    <tr className={style.trTest}><td className={style.hum}> <span className={style.hum2}>Hard Cap:</span><span className={style.hum3}>{item.capMax} {item.capMaxToken}</span></td></tr>
                                    <tr className={style.trTest}><td className={style.hum}> <span className={style.hum2}>Soft Cap:</span><span className={style.hum3}>{item.capMin} {item.capMinToken}</span></td></tr>
                                    <tr className={style.trTest}><td className={style.hum}> <span className={style.hum2}>Votes:</span><span className={style.hum3}>{item.statistique.global.vote}</span></td></tr>
                                    <tr className={style.trTest}><td className={style.hum}> <span className={style.hum2}>Votes in 24h:</span><span className={style.hum3}>{item.statistique.twentyHour.vote}</span></td></tr>


                                    {/*      
                                    
                                    <tr><td className={style.pointer}>Type: </td><td className={style.pointedItem}>{item.type}</td></tr>
                                    <div className={style.testingGroup}>
                                        <div className={style.testing1}></div>
                                        <div className={style.testing}></div>
                                        <div className={style.testing}></div>
                                        <div className={style.testing}></div>
                                    </div>

                                    <tr><td className={style.pointer}>Price: </td><td className={style.pointedItem}>$ {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td></tr>
                                    <tr><td className={style.pointer}>Change in 24h: </td><td className={style.pointedItem}>{item.percent_change_24h} %   {item.percent_change_24h > 0 && <img src={url + "assets/Up-arrow.png"} className={style.imgUpArrow} alt='Up-arrow'></img>}  {item.percent_change_24h < 0 && <img src={url + "assets/Down-arrow.png"} className={style.imgUpArrow} alt='Down-arrow'></img>}</td></tr>
                                    <tr><td className={style.pointer}>Launch: </td><td className={style.pointedItem}>{item.launchDate}</td></tr>
                                    <tr><td className={style.pointer}>Votes: </td><td className={style.pointedItem}>{item.statistique.global.vote}</td></tr>
                                    <tr><td className={style.pointer}>Votes in 24h: </td><td className={style.pointedItem}>{item.statistique.twentyHour.vote}</td></tr> */}
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

export default PresaleTokens;



