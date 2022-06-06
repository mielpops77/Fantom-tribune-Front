

import axios from "axios";



let totalPage = 1;
let action = 'launchDateAsc';

let typeFilter = 'All';


var database = {
    columns: [
        {
            label: '#',
            field: 'id',
            sort: 'asc',
            width: 150
        },
        {
            label: '',
            field: 'image',
            sort: 'asc',
            width: 270
        },
        {
            label: 'Name',
            field: 'name',
            sort: 'asc',
            width: 200
        },
        {
            label: 'Symbol',
            field: 'symbol',
            sort: 'asc',
            width: 100
        },
        {
            label: 'LaunchDate',
            field: 'launchDate',
            sort: 'asc',
            width: 150
        },

    ],
    rows: [
    ]
};


function initDatabase() {

    database.rows = [];
}

function getDatabase() {
    return database
}

function setDatabase(test) {
    database.rows = test;
}

function initAction() {
    action = 'launchDateAsc';
}


function getAction() {
    return action
}

function setAction(actionValue) {
    action = actionValue;
}



function initTypeFilter() {
    typeFilter = 'All';
}


function getTypeFilter() {
    return typeFilter
}

function setTypeFilter(typeFilterValue) {
    typeFilter = typeFilterValue;
}

function getLaunchTab(limit, skip) {
    return axios.get(`http://localhost:3000/launchDate/?limite=${limit}&skip=${skip}&action=${action}&type=${typeFilter}`)
        .then(response => {
            return response.data;
        })
}



function getLaunchTabLenght() {
    return axios.get('http://localhost:3000/launchDateLenght/')
        .then(response => {
            return response.data;
        })

}


function getEcosystem(limit, skip) {
    return axios.get(`http://localhost:3000/ecosystem/?limite=${limit}&skip=${skip}`)
        .then(response => {
            return response.data;
        })
}

function getEcosystemLenght() {
    return axios.get('http://localhost:3000/ecosystemLenght/')
        .then(response => {
            return response.data;
        })

}


function global() {
    return axios.put(`http://localhost:3000/global`)
        .then(response => {
            global2();
            return response.data;
        })
}

function global2() {
    console.log('eeeee');
    return axios.put(`http://localhost:3000/global2`)
        .then(response => {
            return response.data;
        })
}

function theGraphe() {
    return axios.post(`https://api.thegraph.com/subgraphs/name/eerieeight/spookyswap/`,{ query: `{
        tokenDayDatas
        (first: 1, orderBy: date, orderDirection: desc,
          where: { token: "0x841fad6eae12c286d1fd18d1d525dffa75c7effe"})
        
        { id date token { id symbol } priceUSD } }`})

        .then(response => {
            return response.data;
        })

}


function coinmarketCap() {
    return axios.get(`http://localhost:3000/coinmarketCap`)
        .then(response => {
            return response.data;
        })
}







export default {
    setDatabase,
    getDatabase,
    initDatabase,
    getLaunchTab,
    getLaunchTabLenght,
    getEcosystem,
    getEcosystemLenght,
    initAction,
    getAction,
    setAction,
    initTypeFilter,
    getTypeFilter,
    setTypeFilter,
    global,
    global2,
    theGraphe,
    coinmarketCap

};