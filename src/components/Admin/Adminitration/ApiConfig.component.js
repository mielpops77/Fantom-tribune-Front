/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import editionAdminService from "../../../services/admin/editionAdmin.service";


function ApiConfig() {
    const [voteTwentyHour, setTwentyHour] = useState(true);


    useEffect(() => {
        fetch('http://localhost:3000/globalList')
            .then((res) => res.json())
            .then((res) => {
                setTwentyHour(res[0].VoteTwentyHour)
            })
    }, []);

    function voteTwentyHourStatus(status) {
        editionAdminService.setGlobalVoteTwentyHourStatus(status);
        setTwentyHour(status);
    }



    return (
        <div className="container">

            <h3>Vote sur 24 hours    <button className={voteTwentyHour ? "btn btn-success" : "btn btn-dark"} onClick={() => voteTwentyHourStatus(true)}  >Activer</button>
                <button className={!voteTwentyHour ? "btn btn-danger" : "btn btn-dark"} style={{ marginLeft: "10px" }} onClick={() => voteTwentyHourStatus(false)}>désactiver</button></h3>
            <br />
            <h3>Api coin Market Cap    <button class="btn btn-dark">Activer</button>
                <button class="btn btn-dark" style={{ marginLeft: "10px" }}>désactiver</button></h3>
            <br />
            <h3>Subgraph Spookyswap   <button class="btn btn-dark">Activer</button>
                <button class="btn btn-dark" style={{ marginLeft: "10px" }}>désactiver</button></h3>
        </div >
    );
}

export default ApiConfig;



