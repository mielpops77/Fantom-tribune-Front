import AuthService from "../../../../services/auth/auth.service";
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import style from "../Home.module.scss";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


const user = AuthService.getCurrentUser();



const TopRankedTokens = () => {

    const [elements, setElements] = useState([]);

    useEffect(() => {

        fetch('https://fantom-tribune-back.herokuapp.com/getTopRanked')
            .then((res) => res.json())
            .then((res) => {
                setElements(res);
            })
    }, []);



    function buy(contractAdress) {
        window.open('https://spooky.fi/#/swap?outputCurrency=' + contractAdress, '_blank');
    }


    function getTopRankedRequest() {
        fetch('https://fantom-tribune-back.herokuapp.com/getTopRanked')
            .then((res) => res.json())
            .then((res) => {
                setElements(res);
            })
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const styleBox = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '30%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    /* const history = useHistory(); */

    const navigate = useNavigate();

    function login() {
        /*  history.push(`/login/`) */
        navigate(`/login/`);
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



    function vote(id, voteToday, vote, voteTwentyHourCalcul, voteTwentyHour) {
        user !== null ? putVote(id, voteToday, user.email, vote, voteTwentyHourCalcul, voteTwentyHour) : handleOpen();
    }

    const Propagation = e => {
        e.stopPropagation();
    }

    function nav(url) {
        navigate(url);
    }

    function putVote(projectId, voteToday, email, vote, voteTwentyHourCalcul, voteTwentyHour) {

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


        if (voteToday[0] === dateUtc) {
            let verif = true;
            for (let i = 0; i < voteToday.length; i++) {
                if (voteToday[i] === email) {
                    verif = false;
                    alert(' You can vote only once a day');
                    return 0
                }
            }
            if (verif) {

                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ info: email, voteToday: voteToday, vote: vote, voteTwentyHourCalcul: voteTwentyHourCalcul, voteTwentyHour: voteTwentyHour })
                };
                fetch(`https://fantom-tribune-back.herokuapp.com/vote/${projectId}`, requestOptions)
                    .then(response => response.json())
                    /* .then(data => this.setState({ postId: data.id })) */
                    .finally(() => { setElements([]); getTopRankedRequest(); })
            }
        }

        else {

            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ info: email, voteToday: voteToday, vote: vote, voteTwentyHourCalcul: voteTwentyHourCalcul, voteTwentyHour: voteTwentyHour })
            };
            fetch(`https://fantom-tribune-back.herokuapp.com/vote/${projectId}`, requestOptions)
                .then(response => response.json())
                .finally(() => { setElements([]); getTopRankedRequest(); })

        }
    }


    return (
            <div className={style.divSingleBlock}>
                <div className={style.sectionBackground}></div>
                {elements.map((item) => {
                    return <div onClick={() => nav(`/infoCoin/${item._id}`)} className={style.card}>
                        <div className={style.divAllInfo}>
                            <p className={style.KYCButton}>KYC</p>
                            <div className={style.imgCrown}></div>
                            <img src={"https://fantom-tribune-back.herokuapp.com/" + item.image} className={style.imgProjectLogo} alt='img'></img>
                            <h1 className={style.projectName}>{item.name}</h1>
                            {item.launchDate >= dateUtc && <p className={style.presaleButton}>PreSale</p>}
                            <div className={style.list}>
                                <tr><td className={style.pointer}>Type: </td><td className={style.pointedItem}>{item.type}</td></tr>
                                <tr><td className={style.pointer}>Market Cap: </td><td className={style.pointedItem}>{item.marketCap}</td></tr>
                                <tr><td className={style.pointer}>Price: </td><td className={style.pointedItem}>{item.price}</td></tr>
                                <tr><td className={style.pointer}>Change in 24h: </td><td className={style.pointedItem}>{item.percent_change_24h}%</td></tr>
                                <tr><td className={style.pointer}>Launch: </td><td className={style.pointedItem}>{item.launchDate}</td></tr>
                                <tr><td className={style.pointer}>Votes: </td><td className={style.pointedItem}>{item.vote}</td></tr>
                                <tr><td className={style.pointer}>Votes in 24h: </td><td className={style.pointedItem}>{item.voteTwentyHour}</td></tr>
                            </div>
                            <div className={style.cardFooter}>
                                <button onClick={function (event) { Propagation(event); vote(item._id, item.voteToday, item.vote, item.voteTwentyHourCalcul, item.voteTwentyHour) }} className={style.voteButton}>Vote</button>
                                <button onClick={function (event) { Propagation(event); buy(item.contractAddress) }} className={style.buyButton}>Buy</button>
                            </div>
                        </div>
                    </div>
                })}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleBox}>
                    <Typography className={style.typo} id="modal-modal-title" variant="h6" component="h2">
                        You must be logged in to be able to vote
                    </Typography>
                    <br />
                    <button style={{ width: "100%" }} className="btn btn-success" onClick={login}>login</button>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        You can vote only once a day
                    </Typography>
                </Box>
            </Modal>
        </div >


    );
}

export default TopRankedTokens;



