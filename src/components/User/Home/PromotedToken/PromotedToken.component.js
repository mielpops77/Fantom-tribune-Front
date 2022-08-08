import AuthService from "../../../../services/auth/auth.service";
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router-dom';
import style from "../Home.module.scss";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const user = AuthService.getCurrentUser();

const PromotedToken = () => {

    const [elements, setElements] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/getPromotedProject')
            .then((res) => res.json())
            .then((res) => {
                setElements(res);
            })
    }, []);



    function getPromotedProjecRequest() {
        fetch('http://localhost:3000/getPromotedProject')
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


    const history = useHistory();


    function login() {
        history.push(`/login/`)
    }


    function Vote(id, voteToday, vote, voteTwentyHourCalcul, voteTwentyHour) {
        user !== null ? putVote(id, voteToday, user.email, vote, voteTwentyHourCalcul, voteTwentyHour) : handleOpen();
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
                fetch(`http://localhost:3000/vote/${projectId}`, requestOptions)
                    .then(response => response.json())
                    /* .then(data => this.setState({ postId: data.id })) */
                    .finally(() => { setElements([]); getPromotedProjecRequest(); })
            }
        }

        else {

            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ info: email, voteToday: voteToday, vote: vote, voteTwentyHourCalcul: voteTwentyHourCalcul, voteTwentyHour: voteTwentyHour })
            };
            fetch(`http://localhost:3000/vote/${projectId}`, requestOptions)
                .then(response => response.json())
                .finally(() => { setElements([]); getPromotedProjecRequest(); })

        }
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
        <div >
            <div className={style.divSingleBlock}>
                <div className={style.sectionBackground}></div>
                {elements.map((item) => {
                    return <div className={style.rectangle}>
                        <div className={style.divAllInfo}>
                            <p className={style.KYCButton}>KYC</p>
                            <div className={style.imgCrown}></div>
                            <img src="http://localhost:3000/planet9.png" className={style.imgProjectLogo}></img>
                            <h1 className={style.projectName}>{item.name}</h1>
                            {item.launchDate >= dateUtc && <p className={style.presaleButton}>PreSale</p>}
                            <p className={style.thPointer} scope="col">Type: {item.type}</p>
                            <p className={style.thPointer} scope="col">Market Cap: {item.marketCap}</p>
                            <p className={style.thPointer} scope="col">Price: {item.price}</p>
                            <p className={style.thPointer} scope="col">Change in 24h: {item.percent_change_24h}%</p>
                            <p className={style.thPointer} scope="col">Launch: {item.launchDate}</p>
                            <p className={style.thPointer} scope="col">Votes: {item.vote}</p>
                            <p className={style.thPointer} scope="col">Votes in 24h: {item.voteTwentyHour}</p>
                            <div className={style.cardFooter}>
                                <button onClick={() => Vote(item._id, item.voteToday, item.vote, item.voteTwentyHourCalcul, item.voteTwentyHour)} className={style.voteButton}>Vote</button>
                                <button className={style.buyButton}>Buy</button>
                            </div>
                        </div>
                    </div>
                })}
            </div>
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

export default PromotedToken;



