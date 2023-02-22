

import axios from "axios";
import AuthService from "../auth/auth.service";



let totalPage = 0;
let action = 'launchDateAsc';

let typeFilter = 'All';
let liveFilter = 'All';

let priceList = { info: [] };
let supply = 0;
let compteur = 0;

let changePrice = 0;
let timeChangePrice = true;
let changePriceDataBase = 1;
let max = 101;
let min = -100;


function getTotalPage() {
    return totalPage;
}
function setTotalPage(value) {
    totalPage = value;
}
function initTotalPage() {
    totalPage = 1;
}


function initMin() {
    min = -100;
}

function getMin() {
    return min;
}
function setMin(value) {
    min = value;
}
function initMax() {
    max = 101;
}

function getMax() {
    return max;
}
function setMax(value) {
    max = value;
}

function initChangePriceDataBase() {
    changePriceDataBase = 1;
}

function getChangePriceDataBase() {
    return changePriceDataBase;
}
function setChangePriceDataBase(value) {
    changePriceDataBase = value;
}

function initTimeChangePrice() {
    timeChangePrice = true;
}

function getTimeChangePrice() {
    return timeChangePrice;
}
function setTimeChangePrice(value) {
    timeChangePrice = value;
}


function initChangePrice() {
    changePrice = 0;
}

function getChangePrice() {
    return changePrice;
}
function setchangePrice(value) {
    changePrice = value;
}

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

    if (price >= 100) {
        priceList.info[index].price = parseInt(price);
    }
    if (price >= 0 && (priceList.info[index].price == 0)) {
        priceList.info[index].price = Math.round((price) * 100) / 100;
    }
    if (price > 0.099999999999999999999999999999999999999999 && priceList.info[index].price == 0) {
        priceList.info[index].price = Math.round((price) * 1000) / 1000;
    }
    if (price > 0.0099999999999999999999999999999999999999999 && priceList.info[index].price == 0) {
        priceList.info[index].price = Math.round((price) * 10000) / 10000;
    }
    if (price > 0.00099999999999999999999999999999999999999999 && priceList.info[index].price == 0) {
        priceList.info[index].price = Math.round((price) * 100000) / 100000;
    }
    if (price > 0.000099999999999999999999999999999999999999999 && priceList.info[index].price == 0) {
        priceList.info[index].price = Math.round((price) * 1000000) / 1000000;
    }
    if (price > 0.0000099999999999999999999999999999999999999999 && priceList.info[index].price == 0) {
        priceList.info[index].price = Math.round((price) * 10000000) / 10000000;
    }
    if (price > 0.00000099999999999999999999999999999999999999999 && priceList.info[index].price == 0) {
        priceList.info[index].price = Math.round((price) * 100000000) / 100000000;
    }
    if (price > 0.000000099999999999999999999999999999999999999999 && priceList.info[index].price == 0) {
        priceList.info[index].price = Math.round((price) * 1000000000) / 1000000000;
    }
    if (price > 0.0000000099999999999999999999999999999999999999999 && priceList.info[index].price == 0) {
        priceList.info[index].price = Math.round((price) * 10000000000) / 10000000000;
    }
    if (price > 0.00000000099999999999999999999999999999999999999999 && priceList.info[index].price == 0) {
        priceList.info[index].price = Math.round((price) * 100000000000) / 100000000000;
    }
    if (price > 0.000000000099999999999999999999999999999999999999999 && priceList.info[index].price == 0) {
        priceList.info[index].price = Math.round((price) * 1000000000000) / 1000000000000;
    }
    if (price > 0.0000000000099999999999999999999999999999999999999999 && priceList.info[index].price == 0) {
        priceList.info[index].price = Math.round((price) * 10000000000000) / 10000000000000;
    }
    if (price > 0.00000000000099999999999999999999999999999999999999999 && priceList.info[index].price == 0) {
        priceList.info[index].price = Math.round((price) * 100000000000000) / 100000000000000;
    }
    if (price > 0.000000000000099999999999999999999999999999999999999999 && priceList.info[index].price == 0) {
        priceList.info[index].price = Math.round((price) * 1000000000000000) / 1000000000000000;
    }
    if (price > 0.0000000000000099999999999999999999999999999999999999999 && priceList.info[index].price == 0) {
        priceList.info[index].price = Math.round((price) * 10000000000000000) / 10000000000000000;
    }
    if (price > 0.00000000000000099999999999999999999999999999999999999999 && priceList.info[index].price == 0) {
        priceList.info[index].price = Math.round((price) * 100000000000000000) / 100000000000000000;
    }
    if (price > 0.000000000000000099999999999999999999999999999999999999999 && priceList.info[index].price == 0) {
        priceList.info[index].price = Math.round((price) * 1000000000000000000) / 1000000000000000000;
    }
    if (price > 0.0000000000000000099999999999999999999999999999999999999999 && priceList.info[index].price == 0) {
        priceList.info[index].price = Math.round((price) * 10000000000000000000) / 10000000000000000000;
    }
    if (price > 0.00000000000000000099999999999999999999999999999999999999999 && priceList.info[index].price == 0) {
        priceList.info[index].price = Math.round((price) * 100000000000000000000) / 100000000000000000000;
    }
    if (price > 0.000000000000000000099999999999999999999999999999999999999999 && priceList.info[index].price == 0) {
        priceList.info[index].price = Math.round((price) * 1000000000000000000000) / 1000000000000000000000;
    }
    if (price > 0.0000000000000000000099999999999999999999999999999999999999999 && priceList.info[index].price == 0) {
        priceList.info[index].price = Math.round((price) * 1000000000000000000000) / 10000000000000000000000;
    }
    if (price > 0.00000000000000000000099999999999999999999999999999999999999999 && priceList.info[index].price == 0) {
        priceList.info[index].price = Math.round((price) * 10000000000000000000000) / 100000000000000000000000;
    }
    if (price > 0.000000000000000000000099999999999999999999999999999999999999999 && priceList.info[index].price == 0) {
        priceList.info[index].price = Math.round((price) * 100000000000000000000000) / 1000000000000000000000000;
    }
    if (price > 0.0000000000000000000000099999999999999999999999999999999999999999 && priceList.info[index].price == 0) {
        priceList.info[index].price = Math.round((price) * 1000000000000000000000000) / 10000000000000000000000000;
    }
    if (price > 0.00000000000000000000000099999999999999999999999999999999999999999 && priceList.info[index].price == 0) {
        priceList.info[index].price = Math.round((price) * 10000000000000000000000000) / 100000000000000000000000000;
    }
    if (price > 0.000000000000000000000000099999999999999999999999999999999999999999 && priceList.info[index].price == 0) {
        priceList.info[index].price = Math.round((price) * 100000000000000000000000000) / 1000000000000000000000000000;
    }
    if (price > 0.0000000000000000000000000099999999999999999999999999999999999999999 && priceList.info[index].price == 0) {
        priceList.info[index].price = Math.round((price) * 1000000000000000000000000000) / 10000000000000000000000000000;
    }
    if (price > 0.00000000000000000000000000099999999999999999999999999999999999999999 && priceList.info[index].price == 0) {
        priceList.info[index].price = Math.round((price) * 10000000000000000000000000000) / 100000000000000000000000000000;
    }
    if (price > 0.000000000000000000000000000099999999999999999999999999999999999999999 && priceList.info[index].price == 0) {
        priceList.info[index].price = Math.round((price) * 100000000000000000000000000000) / 1000000000000000000000000000000;
    }


    // priceList.info[index].price = price;
    priceList.info[index].contract = contract;
    priceList.info[index].supply = supply;

    setCompteurImplementation()
    if (getCompteur() === getListAllContract().length) {
        coinMarketCalcul();
        initCompteur();
    }
}



let database = {
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


function initLiveFilter() {
    liveFilter = 'All';
}

function getLiveFilter() {
    return liveFilter
}

function setLiveFilter(liveFilterValue) {
    liveFilter = liveFilterValue;
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
    return axios.get(AuthService.getUrl() + `launchDate/?limite=${limit}&skip=${skip}&action=${action}&type=${typeFilter}&live=${liveFilter}`)
        .then(response => {
            return response.data;
        })
}

function getLaunchDateTrending(limit, skip) {
    return axios.get(AuthService.getUrl() + `launchDateTrending/?limite=${limit}&skip=${skip}`)
        .then(response => {
            return response.data;
        })
}

function getPromotedProject() {

    return axios.get(AuthService.getUrl() + `getPromotedProjectTrending/`)
        .then(response => {
            return response.data;
        })
}

function getLaunchDateLenght() {
    return axios.get(AuthService.getUrl() + 'launchDateLenght/')
        .then(response => {
            return response.data;
        })

}


let getPromotedProjectLenght = () => {
    return axios.get(AuthService.getUrl() + 'getPromotedProjectLenght/')
        .then(response => {
            return response.data;
        })

};


function getEcosystem(limit, skip, action, type, min, max) {
    return axios.get(AuthService.getUrl() + `ecosystem/?limite=${limit}&skip=${skip}&action=${action}&type=${type}&minPriceChange=${parseInt(min)}&maxPriceChange=${parseInt(max)}`)
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


function getTopTrending(limit, skip) {
    return axios.get(AuthService.getUrl() + `topTrending/?limite=${limit}&skip=${skip}`)
        .then(response => {
            return response.data;
        })
}

function getTopTrendingToday(limit, skip) {
    return axios.get(AuthService.getUrl() + `topTrendingToday/?limite=${limit}&skip=${skip}`)
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
            console.log('heeey', response.data);
            setListAllContract(response.data)
            return response.data;
        })
}


function coinmarketCap(id, slug, coinMarketCapLink, coinMarketCapStatus, idCoinMarketCap) {
    return axios.get(AuthService.getUrl() + `coinmarketCap?id=${id}&slug=${slug}&coinMarketCapLink=${coinMarketCapLink}&coinMarketCapStatus=${coinMarketCapStatus}&idCoinMarketCap=${idCoinMarketCap}`)
        .then(response => {
            /*   if (response.status === 200) {
                  coinmarketCapStatus(coinMarketCapLink,"success");
  
              }
  
              else {
                  coinmarketCapStatus(coinMarketCapLink,"fail");
  
              } */

            return response.data;
        })
}



/* function coinmarketCapStatus(coinMarketCapLink, status) {
    return axios.put(AuthService.getUrl()+`coinmarketCapStatus?coinMarketCapLink=${coinMarketCapLink}&status=${status}`)
        .then(response => {

            return response.data;
        })
}
 */

function configContract(configContract) {
    return axios.put(AuthService.getUrl() + `configContract`, {
        configContract: configContract
    })
        .then(response => {
            console.log('updatePrice', getPriceList());
            updatePrice(getPriceList())
            return response.data;
        })
}

function updatePrice(priceList) {
    return axios.put(AuthService.getUrl() + `updatePrice`, {
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
        getPriceList().info[i].coinMarket = parseInt(getPriceList().info[i].price * getPriceList().info[i].supply);
    }
    priceList = getPriceList();
    configContract(priceList);
}


export default {
    getPromotedProjectLenght,
    resolveAfter2Seconds,
    getTopTrendingToday,
    initListAllContract,
    voteHourApplication,
    ftmScanTotalSupply,
    getLaunchDateLenght,
    getLaunchDateTrending,
    getEcosystemLenght,
    getListAllContract,
    getPromotedProject,
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
    getTopTrending,
    initChangePrice,
    getChangePrice,
    setchangePrice,
    initTimeChangePrice,
    getTimeChangePrice,
    setTimeChangePrice,
    initChangePriceDataBase,
    getChangePriceDataBase,
    setChangePriceDataBase,
    initMax,
    getMax,
    setMax,
    initMin,
    getMin,
    setMin,
    getTotalPage,
    setTotalPage,
    initTotalPage,
    initLiveFilter,
    getLiveFilter,
    setLiveFilter

};