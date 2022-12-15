var fieldOpenFlexible = {};


function initFieldOpenFlexible() {
    fieldOpenFlexible = {
        logo: false,
        name: false,
        symbole: false,
        launchPhase: false,
        contractAdress: false,
        description: false,
        type: false,
        website: false,
        telegram: false,
        discord: false,
        twitter: false,
        coinMarketCapLink: false,
        kyc: false,
        comment: false
    };
}
function getFieldOpenFlexible() {
    return fieldOpenFlexible;
}

function setFieldOpenFlexible(event, bool) {

    if (bool) {
        switch (event.value) {
            case 'Logo':
                fieldOpenFlexible.logo = true;
                break;
            case 'Name':
                fieldOpenFlexible.name = true;
                break;
            case 'Symbol':
                fieldOpenFlexible.symbole = true;
                break;
            case 'Launch-phase':
                fieldOpenFlexible.launchPhase = true;
                break;
            case 'Contract-address':
                fieldOpenFlexible.contractAdress = true;
                break;
            case 'Description':
                fieldOpenFlexible.description = true;
                break;
            case 'Type':
                fieldOpenFlexible.type = true;
                break;
            case 'Website-link':
                fieldOpenFlexible.website = true;
                break;
            case 'Telegram-link':
                fieldOpenFlexible.telegram = true;
                break;
            case 'Discord-link':
                fieldOpenFlexible.discord = true;
                break;
            case 'Twitter-link':
                fieldOpenFlexible.twitter = true;
                break;
            case 'Coinmarketcap-link':
                fieldOpenFlexible.coinMarketCapLink = true;
                break;
            case 'Kyc':
                fieldOpenFlexible.kyc = true;
                break;
            default:
        }
    }

    else {
        switch (event) {
            case 'Logo':
                fieldOpenFlexible =
                {
                    logo: false,
                    name: fieldOpenFlexible.name,
                    symbole: fieldOpenFlexible.symbole,
                    launchPhase: fieldOpenFlexible.launchPhase,
                    contractAdress: fieldOpenFlexible.contractAdress,
                    description: fieldOpenFlexible.description,
                    type: fieldOpenFlexible.type,
                    website: fieldOpenFlexible.website,
                    telegram: fieldOpenFlexible.telegram,
                    discord: fieldOpenFlexible.discord,
                    twitter: fieldOpenFlexible.twitter,
                    coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
                    kyc: fieldOpenFlexible.kyc
                };
                break;
            case 'Name':
                fieldOpenFlexible =
                {
                    logo: fieldOpenFlexible.logo,
                    name: false,
                    symbole: fieldOpenFlexible.symbole,
                    launchPhase: fieldOpenFlexible.launchPhase,
                    contractAdress: fieldOpenFlexible.contractAdress,
                    description: fieldOpenFlexible.description,
                    type: fieldOpenFlexible.type,
                    website: fieldOpenFlexible.website,
                    telegram: fieldOpenFlexible.telegram,
                    discord: fieldOpenFlexible.discord,
                    twitter: fieldOpenFlexible.twitter,
                    coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
                    kyc: fieldOpenFlexible.kyc
                };
                break;
            case 'Symbol':
                fieldOpenFlexible =
                {
                    logo: fieldOpenFlexible.logo,
                    name: fieldOpenFlexible.name,
                    symbole: false,
                    launchPhase: fieldOpenFlexible.launchPhase,
                    contractAdress: fieldOpenFlexible.contractAdress,
                    description: fieldOpenFlexible.description,
                    type: fieldOpenFlexible.type,
                    website: fieldOpenFlexible.website,
                    telegram: fieldOpenFlexible.telegram,
                    discord: fieldOpenFlexible.discord,
                    twitter: fieldOpenFlexible.twitter,
                    coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
                    kyc: fieldOpenFlexible.kyc
                };
                break;
            case 'Launch-phase':
                fieldOpenFlexible =
                {
                    logo: fieldOpenFlexible.logo,
                    name: fieldOpenFlexible.name,
                    symbole: fieldOpenFlexible.symbole,
                    launchPhase: false,
                    contractAdress: fieldOpenFlexible.contractAdress,
                    description: fieldOpenFlexible.description,
                    type: fieldOpenFlexible.type,
                    website: fieldOpenFlexible.website,
                    telegram: fieldOpenFlexible.telegram,
                    discord: fieldOpenFlexible.discord,
                    twitter: fieldOpenFlexible.twitter,
                    coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
                    kyc: fieldOpenFlexible.kyc
                };
                break;
            case 'Contract-address':
                fieldOpenFlexible =
                {
                    logo: fieldOpenFlexible.logo,
                    name: fieldOpenFlexible.name,
                    symbole: fieldOpenFlexible.symbole,
                    launchPhase: fieldOpenFlexible.launchPhase,
                    contractAdress: false,
                    description: fieldOpenFlexible.description,
                    type: fieldOpenFlexible.type,
                    website: fieldOpenFlexible.website,
                    telegram: fieldOpenFlexible.telegram,
                    discord: fieldOpenFlexible.discord,
                    twitter: fieldOpenFlexible.twitter,
                    coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
                    kyc: fieldOpenFlexible.kyc
                };
                break;
            case 'Description':
                fieldOpenFlexible =
                {
                    logo: fieldOpenFlexible.logo,
                    name: fieldOpenFlexible.name,
                    symbole: fieldOpenFlexible.symbole,
                    launchPhase: fieldOpenFlexible.launchPhase,
                    contractAdress: fieldOpenFlexible.contractAdress,
                    description: false,
                    type: fieldOpenFlexible.type,
                    website: fieldOpenFlexible.website,
                    telegram: fieldOpenFlexible.telegram,
                    discord: fieldOpenFlexible.discord,
                    twitter: fieldOpenFlexible.twitter,
                    coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
                    kyc: fieldOpenFlexible.kyc
                };
                break;
            case 'Type':
                fieldOpenFlexible =
                {
                    logo: fieldOpenFlexible.logo,
                    name: fieldOpenFlexible.name,
                    symbole: fieldOpenFlexible.symbole,
                    launchPhase: fieldOpenFlexible.launchPhase,
                    contractAdress: fieldOpenFlexible.contractAdress,
                    description: fieldOpenFlexible.description,
                    type: false,
                    website: fieldOpenFlexible.website,
                    telegram: fieldOpenFlexible.telegram,
                    discord: fieldOpenFlexible.discord,
                    twitter: fieldOpenFlexible.twitter,
                    coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
                    kyc: fieldOpenFlexible.kyc
                };
                break;
            case 'Website-link':
                fieldOpenFlexible =
                {
                    logo: fieldOpenFlexible.logo,
                    name: fieldOpenFlexible.name,
                    symbole: fieldOpenFlexible.symbole,
                    launchPhase: fieldOpenFlexible.launchPhase,
                    contractAdress: fieldOpenFlexible.contractAdress,
                    description: fieldOpenFlexible.description,
                    type: fieldOpenFlexible.type,
                    website: false,
                    telegram: fieldOpenFlexible.telegram,
                    discord: fieldOpenFlexible.discord,
                    twitter: fieldOpenFlexible.twitter,
                    coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
                    kyc: fieldOpenFlexible.kyc
                };
                break;
            case 'Telegram-link':
                fieldOpenFlexible =
                {
                    logo: fieldOpenFlexible.logo,
                    name: fieldOpenFlexible.name,
                    symbole: fieldOpenFlexible.symbole,
                    launchPhase: fieldOpenFlexible.launchPhase,
                    contractAdress: fieldOpenFlexible.contractAdress,
                    description: fieldOpenFlexible.description,
                    type: fieldOpenFlexible.type,
                    website: fieldOpenFlexible.website,
                    telegram: false,
                    discord: fieldOpenFlexible.discord,
                    twitter: fieldOpenFlexible.twitter,
                    coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
                    kyc: fieldOpenFlexible.kyc
                };
                break;
            case 'Discord-link':
                fieldOpenFlexible =
                {
                    logo: fieldOpenFlexible.logo,
                    name: fieldOpenFlexible.name,
                    symbole: fieldOpenFlexible.symbole,
                    launchPhase: fieldOpenFlexible.launchPhase,
                    contractAdress: fieldOpenFlexible.contractAdress,
                    description: fieldOpenFlexible.description,
                    type: fieldOpenFlexible.type,
                    website: fieldOpenFlexible.website,
                    telegram: fieldOpenFlexible.telegram,
                    discord: false,
                    twitter: fieldOpenFlexible.twitter,
                    coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
                    kyc: fieldOpenFlexible.kyc
                };
                break;
            case 'Twitter-link':
                fieldOpenFlexible =
                {
                    logo: fieldOpenFlexible.logo,
                    name: fieldOpenFlexible.name,
                    symbole: fieldOpenFlexible.symbole,
                    launchPhase: fieldOpenFlexible.launchPhase,
                    contractAdress: fieldOpenFlexible.contractAdress,
                    description: fieldOpenFlexible.description,
                    type: fieldOpenFlexible.type,
                    website: fieldOpenFlexible.website,
                    telegram: fieldOpenFlexible.telegram,
                    discord: fieldOpenFlexible.discord,
                    twitter: false,
                    coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
                    kyc: fieldOpenFlexible.kyc
                };
                break;
            case 'Coinmarketcap-link':
                fieldOpenFlexible =
                {
                    logo: fieldOpenFlexible.logo,
                    name: fieldOpenFlexible.name,
                    symbole: fieldOpenFlexible.symbole,
                    launchPhase: fieldOpenFlexible.launchPhase,
                    contractAdress: fieldOpenFlexible.contractAdress,
                    description: fieldOpenFlexible.description,
                    type: fieldOpenFlexible.type,
                    website: fieldOpenFlexible.website,
                    telegram: fieldOpenFlexible.telegram,
                    discord: fieldOpenFlexible.discord,
                    twitter: fieldOpenFlexible.twitter,
                    coinMarketCapLink: false,
                    kyc: fieldOpenFlexible.kyc
                };
                break;
            case 'Kyc':
                fieldOpenFlexible =
                {
                    logo: fieldOpenFlexible.logo,
                    name: fieldOpenFlexible.name,
                    symbole: fieldOpenFlexible.symbole,
                    launchPhase: fieldOpenFlexible.launchPhase,
                    contractAdress: fieldOpenFlexible.contractAdress,
                    description: fieldOpenFlexible.description,
                    type: fieldOpenFlexible.type,
                    website: fieldOpenFlexible.website,
                    telegram: fieldOpenFlexible.telegram,
                    discord: fieldOpenFlexible.discord,
                    twitter: fieldOpenFlexible.twitter,
                    coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
                    kyc: false
                };
                break;
            default:
        }
    }

    if (fieldOpenFlexible.logo || fieldOpenFlexible.name || fieldOpenFlexible.symbole || fieldOpenFlexible.launchPhase || fieldOpenFlexible.contractAdress || fieldOpenFlexible.type || fieldOpenFlexible.website || fieldOpenFlexible.telegram || fieldOpenFlexible.discord || fieldOpenFlexible.twitter || fieldOpenFlexible.coinMarketCapLink || fieldOpenFlexible.kyc) {
        fieldOpenFlexible =
        {
            logo: fieldOpenFlexible.logo,
            name: fieldOpenFlexible.name,
            symbole: fieldOpenFlexible.symbole,
            launchPhase: fieldOpenFlexible.launchPhase,
            contractAdress: fieldOpenFlexible.contractAdress,
            description: fieldOpenFlexible.description,
            type: fieldOpenFlexible.type,
            website: fieldOpenFlexible.website,
            telegram: fieldOpenFlexible.telegram,
            discord: fieldOpenFlexible.discord,
            twitter: fieldOpenFlexible.twitter,
            coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
            kyc: fieldOpenFlexible.kyc,
            comment: true
        };
    }
    else {
        fieldOpenFlexible =
        {
            logo: fieldOpenFlexible.logo,
            name: fieldOpenFlexible.name,
            symbole: fieldOpenFlexible.symbole,
            launchPhase: fieldOpenFlexible.launchPhase,
            contractAdress: fieldOpenFlexible.contractAdress,
            description: fieldOpenFlexible.description,
            type: fieldOpenFlexible.type,
            website: fieldOpenFlexible.website,
            telegram: fieldOpenFlexible.telegram,
            discord: fieldOpenFlexible.discord,
            twitter: fieldOpenFlexible.twitter,
            coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
            kyc: fieldOpenFlexible.kyc,
            comment: false
        };
    }
}




export default {
    initFieldOpenFlexible,
    getFieldOpenFlexible,
    setFieldOpenFlexible
};