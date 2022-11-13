import axios from "axios";
import AuthService from "../auth/auth.service";


let coin = [];

let type = [];

let promotedProjectLenght;

let coinMarketCapLink;
let coinMarketCapStatus;
let idProject;


function initIdProject() {
    idProject = "";
}

function getIdProject() {
    return idProject
}

function setIdProject(id) {
    idProject = id;
}

function initCoinMarketCapLink() {
    coinMarketCapLink = "";
}

function getCoinMarketCapLink() {
    return coinMarketCapLink
}

function setCoinMarketCapLink(coinMarketCapLinkNew) {
    coinMarketCapLink = coinMarketCapLinkNew;
}

function initMarketCapStatus() {
    coinMarketCapStatus = "";
}

function getMarketCapStatus() {
    return coinMarketCapStatus
}

function setMarketCapStatus(setCoinMarketCapStatusNew) {
    coinMarketCapStatus = setCoinMarketCapStatusNew;
}

function initCoin() {
    coin = [];
}

function getCoin() {
    return coin
}

function setCoin(coinTarget) {
    coin = coinTarget;
}

function setCoinEdit(coinTarget, attribut) {
    if (attribut == "name") {
        coin.name = coinTarget
    }
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
    initCoinMarketCapLink,
    getCoinMarketCapLink,
    setCoinMarketCapLink,
    initMarketCapStatus,
    getMarketCapStatus,
    setMarketCapStatus,
    initIdProject,
    getIdProject,
    setIdProject,
    setCoinEdit,
    initCoin,
    initType,
    getCoin,
    setCoin,
    getType,
    setType
};