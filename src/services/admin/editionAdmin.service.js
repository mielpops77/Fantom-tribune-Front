import axios from "axios";
import AuthService from "../auth/auth.service";


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
    return axios.put(AuthService.getUrl() + `globalVoteTwentyHourStatus?status=${status}`)
        .then(response => {
            return response.data;
        })
}


function setCoinMarketCapStatus(status, listId) {
    console.log('yolosssssss', listId);
    return axios.put(AuthService.getUrl() + `coinMarketCapBoucleStatus?status=${status}`,
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