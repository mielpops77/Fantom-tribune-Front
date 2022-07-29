import axios from "axios";


let coin = [];

let type = [];


function initCoin() {
    coin = [];
}


function getCoin() {
    return coin
}

function setCoin(coinTarget) {
    coin = coinTarget;
}


function initType() {
    type = [];
}


function getType() {
    return type
}

function setType(typeTarget) {
    type = typeTarget;
}


function setGlobalVoteTwentyHourStatus(status) {
    return axios.put(`http://localhost:3000/globalVoteTwentyHourStatus?status=${status}`)
        .then(response => {
            return response.data;
        })
}



export default {
    setGlobalVoteTwentyHourStatus,
    initCoin,
    initType,
    getCoin,
    setCoin,
    getType,
    setType,
};