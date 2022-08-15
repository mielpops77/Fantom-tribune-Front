import axios from "axios";


let coin = [];

let type = [];

let promotedProjectLenght;


function initCoin() {
    coin = [];
}

function getCoin() {
    return coin
}

function setCoin(coinTarget) {
    coin = coinTarget;
}

function initPromotedProjectLenght() {
    promotedProjectLenght = 0;
}

function getPromotedProjectLenght() {
    return promotedProjectLenght
}

function setPromotedProjectLenght(promotedProjectLenghtValue) {
    promotedProjectLenght = promotedProjectLenghtValue;
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
    return axios.put(`https://fantom-tribune-back.herokuapp.com/globalVoteTwentyHourStatus?status=${status}`)
        .then(response => {
            return response.data;
        })
}


function setCoinMarketCapStatus(status, listId) {
    console.log('yolosssssss',listId);
    return axios.put(`https://fantom-tribune-back.herokuapp.com/coinMarketCapBoucleStatus?status=${status}`,
    {
        data: { listId }
    })
        .then(response => {
            return response.data;
        })
}



export default {
    setGlobalVoteTwentyHourStatus,
    initPromotedProjectLenght,
    getPromotedProjectLenght,
    setPromotedProjectLenght,
    setCoinMarketCapStatus,
    initCoin,
    initType,
    getCoin,
    setCoin,
    getType,
    setType,
};