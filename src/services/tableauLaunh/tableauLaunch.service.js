

import axios from "axios";
import AuthService from "../auth/auth.service";



//let totalPage = 1;
let action = 'launchDateAsc';

let typeFilter = 'All';
let priceList = { info: [] };
let supply = 0;
let compteur = 0;

function initCompteur() {
    compteur = 0;
}
function getCompteur() {
    return compteur;
}
function setCompteurImplementation() {
    compteur++;
}



function initPriceList(lenght) {

    if (priceList.info.length === 0) {
        for (let i = 0; i < lenght; i++) {
            priceList.info.push({
                price: 0,
                contract: 0,
                supply: 0,
                coinMarket: 0
            })
        }

    }

}

function getPriceList() {
    return priceList
}

function setPriceList(index, price, contract, supply) {
    console.log("setPriceList", index);
    priceList.info[index].price = price;
    priceList.info[index].contract = contract;
    priceList.info[index].supply = supply;

    setCompteurImplementation()
    if (getCompteur() === getListAllContract().length) {
        coinMarketCalcul();
        initCompteur();
    }
}



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

let listAllContract = [];





function initSupply() {

    supply = 0;
}

function getSupply() {
    return supply
}

function setSupply(supp) {
    supply = supp;
}



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

function initListAllContract() {
    listAllContract = [];
}

function getListAllContract() {
    return listAllContract;
}

function setListAllContract(listAllContractValue) {
    listAllContract = listAllContractValue;
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
    return axios.get(AuthService.getUrl() + `launchDate/?limite=${limit}&skip=${skip}&action=${action}&type=${typeFilter}`)
        .then(response => {
            return response.data;
        })
}



function getLaunchTabLenght() {
    return axios.get(AuthService.getUrl() + 'launchDateLenght/')
        .then(response => {
            return response.data;
        })

}


function getEcosystem(limit, skip) {
    return axios.get(AuthService.getUrl() + `ecosystem/?limite=${limit}&skip=${skip}`)
        .then(response => {
            return response.data;
        })
}

function getEcosystemLenght() {
    return axios.get(AuthService.getUrl() + 'ecosystemLenght/')
        .then(response => {
            return response.data;
        })

}


function voteHourVerif() {
    return axios.put(AuthService.getUrl() + `voteHourVerif`)
        .then(response => {
            voteHourApplication();
            return response.data;
        })
}

function voteHourApplication() {
    return axios.put(AuthService.getUrl() + `voteHourApplication`)
        .then(response => {
            return response.data;
        })
}

function theGraphe() {
    return axios.get(`https://api.thegraph.com/subgraphs/name/eerieeight/spookyswap/QmPJbGjktGa7c4UYWXvDRajPxpuJBSZxeQK5siNT3VpthP/spookyswap`, {
        query: `{
        tokenDayDatas
        (first: 1, orderBy: date, orderDirection: desc,
          where: { token: "0x841fad6eae12c286d1fd18d1d525dffa75c7effe"})
        
        { id date token { id symbol } priceUSD } }`})

        .then(response => {
            return response.data;
        })

}

function contractSpooky() {
    return axios.get(AuthService.getUrl() + `contractSpooky/`)
        .then(response => {
            setListAllContract(response.data)
            return response.data;
        })
}


function coinmarketCap(slug, coinMarketCapLink) {
    return axios.get(AuthService.getUrl() + `coinmarketCap?slug=${slug}&coinMarketCapLink=${coinMarketCapLink}`)
        .then(response => {
            /*   if (response.status === 200) {
                  console.log('ici status 200 lets goooo')
                  coinmarketCapStatus(coinMarketCapLink,"success");
  
              }
  
              else {
                  console.log('ici status 220 lets goooo')
  
                  coinmarketCapStatus(coinMarketCapLink,"fail");
  
              } */

            return response.data;
        })
}



/* function coinmarketCapStatus(coinMarketCapLink, status) {
    return axios.put(`https://fantom-tribune-back.herokuapp.com/coinmarketCapStatus?coinMarketCapLink=${coinMarketCapLink}&status=${status}`)
        .then(response => {

            console.log("??????Response", response)
            return response.data;
        })
}
 */

function configContract(configContract) {
    console.log("configContraaaaaaaaaact");
    return axios.put(`https://fantom-tribune-back.herokuapp.com/configContract`, {
        configContract: configContract
    })
        .then(response => {
            updatePrice(getPriceList())
            return response.data;
        })
}

function updatePrice(priceList) {
    return axios.put(`https://fantom-tribune-back.herokuapp.com/updatePrice`, {
        priceList: priceList
    })
        .then(response => {
            return response.data;
        })
}

function ftmScanTotalSupply(contract) {
    return axios.get(`https://api.ftmscan.com/api?module=stats&action=tokensupply&contractaddress=${contract}&apikey=HVJ8CKBSZGI6CQJD8PKS5EU4SJUZ5CH4JX`)
        .then(response => {
            const str = response.data.result.toString();
            const strEntier = str.substring(0, str.length - 18);
            const resultat = parseFloat(strEntier);
            setSupply(resultat);
            return resultat;
        })
}

function resolveAfter2Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 10000);
    });
}

function coinMarketCalcul() {
    for (let i = 0; i < getPriceList().info.length; i++) {
        getPriceList().info[i].coinMarket = (getPriceList().info[i].price * getPriceList().info[i].supply);
    }
    console.log('priceList', priceList);
    priceList = getPriceList();

    configContract(priceList);

}


export default {
    resolveAfter2Seconds,
    initListAllContract,
    voteHourApplication,
    ftmScanTotalSupply,
    getLaunchTabLenght,
    getEcosystemLenght,
    getListAllContract,
    setListAllContract,
    coinMarketCalcul,
    configContract,
    contractSpooky,
    initTypeFilter,
    initPriceList,
    getTypeFilter,
    setTypeFilter,
    coinmarketCap,
    voteHourVerif,
    initDatabase,
    getLaunchTab,
    getEcosystem,
    getPriceList,
    setPriceList,
    setDatabase,
    getDatabase,
    updatePrice,
    initAction,
    initSupply,
    getAction,
    setAction,
    theGraphe,
    getSupply,
    setSupply,
};