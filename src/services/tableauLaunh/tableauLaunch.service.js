

import axios from "axios";



let totalPage = 1;

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



function getLaunchTab(limit, skip) {
    return axios.get(`http://localhost:3000/launchDate/?limite=${limit}&skip=${skip}`)
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


export default {
    setDatabase,
    getDatabase,
    initDatabase,
    getLaunchTab,
    getLaunchTabLenght
};