/* eslint-disable react-hooks/exhaustive-deps */
import editionAdminService from "../../../services/admin/editionAdmin.service";
import AuthService from "../../../services/auth/auth.service";
import React, { useState, useEffect } from 'react';




function ApiConfig() {
    const [voteTwentyHour, setTwentyHour] = useState(true);
    const [CoinMarketCap, setCoinMarketCap] = useState(true);
    const [listIdCoinMarket, setListIdCoinMarket] = useState([]);

    const url = AuthService.getUrl();


    useEffect(() => {
        fetch(url + 'globalList')
            .then((res) => res.json())
            .then((res) => {
                setTwentyHour(res[0].VoteTwentyHour);
                setCoinMarketCap(res[0].CoinMarketCap);
                setListIdCoinMarket(res[0].idCoinMarketList);
            })
    }, []);

    function voteTwentyHourStatus(status) {
        editionAdminService.setGlobalVoteTwentyHourStatus(status);
        setTwentyHour(status);
    }

    function coinMarketCapStatus(status, listIdCoinMarket) {
        editionAdminService.setCoinMarketCapStatus(status, listIdCoinMarket);
        setCoinMarketCap(status);
    }

    return (
        <div className="container">

            <h3>Vote sur 24 hours    <button className={voteTwentyHour ? "btn btn-success" : "btn btn-dark"} onClick={() => voteTwentyHourStatus(true)}  >Activer</button>
                <button className={!voteTwentyHour ? "btn btn-danger" : "btn btn-dark"} style={{ marginLeft: "10px" }} onClick={() => voteTwentyHourStatus(false)}>désactiver</button></h3>
            <br />
            <h3>Api coin Market Cap     <button className={CoinMarketCap ? "btn btn-success" : "btn btn-dark"} onClick={() => coinMarketCapStatus(true, listIdCoinMarket)}  >Activer</button>
                <button className={!CoinMarketCap ? "btn btn-danger" : "btn btn-dark"} style={{ marginLeft: "10px" }} onClick={() => coinMarketCapStatus(false, listIdCoinMarket)}>désactiver</button></h3>
            <br />
            <h3>Subgraph Spookyswap   <button class="btn btn-dark">Activer</button>
                <button className="btn btn-dark" style={{ marginLeft: "10px" }}>désactiver</button></h3>
        </div >
    );
}

export default ApiConfig;



