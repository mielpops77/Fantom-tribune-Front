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


export default {
    initCoin,
    getCoin,
    setCoin,
    initType,
    getType,
    setType
};