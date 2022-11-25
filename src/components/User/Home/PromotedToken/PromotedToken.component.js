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
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [verifVoteToday, setVerifVoteToday] = useState(false);
    const [data, setData] = useState({
        id: "",
        voteToday: "",
        vote: "",
        voteTwentyHourCalcul: "",
        name: "",
        image: "",
    });

    useEffect(() => {
        setUser(AuthService.getCurrentUser());
        fetch(url + 'getPromotedProject')
            .then((res) => res.json())
            .then((res) => {
                setElements(res);
            })
    }, []);


    function buy(contractAdress) {
        window.open('https://spooky.fi/#/swap?outputCurrency=' + contractAdress, '_blank');
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



    function vote(id, voteToday, vote, voteTwentyHourCalcul, voteTwentyHour, name, image) {
        setCaptcha(null);
        setName(name);
        setImage(url+image);
        setData({ id: id, voteToday: voteToday, vote: vote, voteTwentyHourCalcul: voteTwentyHourCalcul, voteTwentyHour: voteTwentyHour, name: name, image: image });

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
            let verif = false;

            let dateUtc = date.getFullYear() + '-' + mondayUtc + '-' + dayUtc;
            console.log(voteToday[0], dateUtc)
            if (voteToday[0] === dateUtc) {
                for (let i = 0; i < voteToday.length; i++) {
                    if (voteToday[i] === user.email) {
                        verif = true;
                        setVerifVoteToday(true)
                        /*  alert(' You can vote only once a day'); */
                    }
                }
                if (!verif) {
                    setVerifVoteToday(false);
                }
            }

            else {
                setVerifVoteToday(false);
            }
        }
        handleOpen();
    }

    function nav(url) {
        navigate(url);
    }


    function putVote() {
        if (!verifVoteToday && captcha !== null) {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ info: user.email, voteToday: data.voteToday, vote: data.vote, voteTwentyHourCalcul: data.voteTwentyHourCalcul, voteTwentyHour: data.voteTwentyHour })
            };
            fetch(url + `vote/${data.id}`, requestOptions)
                .then(response => response.json())
                .finally(() => { setElements([]); getPromotedProjecRequest(); handleClose()})
        }
    }
    function onChangeCaptcha(value) {
        setCaptcha(value);
    }

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

    return (
        <div className={style.divSingleBlock}>
            <div className={style.sectionBackground}></div>
            {elements.map((item, key) => {
                console.log('heeeey', item, url)
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
                                    <tr><td className={style.pointer}>Votes: </td><td className={style.pointedItem}>{item.vote}</td></tr>
                                    <tr><td className={style.pointer}>Votes in 24h: </td><td className={style.pointedItem}>{item.voteTwentyHour}</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={style.cardFooter}>
                            <button onClick={function (event) { Propagation(event); vote(item._id, item.voteToday, item.vote, item.voteTwentyHourCalcul, item.voteTwentyHour,item.name, item.image) }} className={style.voteButton}>Vote</button>
                            <button onClick={function (event) { Propagation(event); buy(item.contractAddress) }} className={style.buyButton}>Buy</button>
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
                            Vote for {name}
                        </div>
                        <div className={styleModal.divTypo} >
                            <img className={styleModal.imgModal} src={image} alt='img' /></div>
                        {(user !== null && !verifVoteToday) &&
                            <ReCAPTCHA className={styleModal.captcha}
                                sitekey="6LdjgCcjAAAAAKtlNP6UasdKdiBbjeQ82NAPAOtG"
                                onChange={onChangeCaptcha}
                            />}
                    </Typography>
                    <Typography className={styleModal.typo}>
                        <div className={styleModal.divTypo}>
                            {(user !== null && !verifVoteToday) &&
                                <button type="button" onClick={function (event) { Propagation(event); putVote() }} className={`${captcha == null ? styleModal.voteButtonTypoNotAllowed : styleModal.voteButtonTypo}`} >Votes</button>
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



