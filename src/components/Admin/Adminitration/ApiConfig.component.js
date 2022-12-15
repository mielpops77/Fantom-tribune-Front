import editionAdminService from "../../../services/admin/editionAdmin.service";
import AuthService from "../../../services/auth/auth.service";
import React, { useState, useEffect } from 'react';

function ApiConfig() {
    const [config, setConfig] = useState({
        voteTwentyHour: true,
        coinMarketCap: true,
        listIdCoinMarket: [],
    });
    const url = AuthService.getUrl();

    useEffect(() => {
        fetch(url + 'globalList')
            .then((res) => res.json())
            .then((res) => {
                setConfig({ voteTwentyHour: res[0].VoteTwentyHour, coinMarketCap: res[0].CoinMarketCap, listIdCoinMarket: res[0].idCoinMarketList })
            })
    }, []);

    function voteTwentyHourStatus(status) {
        editionAdminService.setGlobalVoteTwentyHourStatus(status);
        setConfig({ voteTwentyHour: status, coinMarketCap: config.coinMarketCap, listIdCoinMarket: config.listIdCoinMarket })
    }

    function coinMarketCapStatus(status, listIdCoinMarket) {
        editionAdminService.setCoinMarketCapStatus(status, listIdCoinMarket);
        setConfig({ voteTwentyHour: config.voteTwentyHour, coinMarketCap: status, listIdCoinMarket: config.listIdCoinMarket })
    }

    return (
        <div className="container">
            <h3>Vote sur 24 hours <button className={config.voteTwentyHour ? "btn btn-success" : "btn btn-dark"} onClick={() => voteTwentyHourStatus(true)}  >Activer</button>
                <button className={!config.voteTwentyHour ? "btn btn-danger" : "btn btn-dark"} style={{ marginLeft: "10px" }} onClick={() => voteTwentyHourStatus(false)}>désactiver</button></h3>
            <br />
            <h3>Api coin Market Cap     <button className={config.coinMarketCap ? "btn btn-success" : "btn btn-dark"} onClick={() => coinMarketCapStatus(true, config.listIdCoinMarket)}  >Activer</button>
                <button className={!config.coinMarketCap ? "btn btn-danger" : "btn btn-dark"} style={{ marginLeft: "10px" }} onClick={() => coinMarketCapStatus(false, config.listIdCoinMarket)}>désactiver</button></h3>
            <br />
            <h3>Subgraph Spookyswap   <button className="btn btn-dark">Activer</button>
                <button className="btn btn-dark" style={{ marginLeft: "10px" }}>désactiver</button></h3>
        </div >
    );
}

export default ApiConfig;



