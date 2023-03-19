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
        facebook: false,
        medium: false,
        github: false,
        whitePaper: false,
        insta: false,
        reedit: false,
        tiktok: false,
        twitter: false,
        coinMarketCapLink: false,
        kyc: false,
        audit: false,
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
            case 'Facebook-link':
                fieldOpenFlexible.facebook = true;
                break;
            case 'Medium-link':
                fieldOpenFlexible.medium = true;
                break;
            case 'Github-link':
                fieldOpenFlexible.github = true;
                break;
            case 'WhitePaper-link':
                fieldOpenFlexible.whitePaper = true;
                break;
            case 'Insta-link':
                fieldOpenFlexible.insta = true;
                break;
            case 'Reedit-link':
                fieldOpenFlexible.reedit = true;
                break;
            case 'Tiktok-link':
                fieldOpenFlexible.tiktok = true;
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
            case 'Audit':
                fieldOpenFlexible.audit = true;
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
                    facebook: fieldOpenFlexible.facebook,
                    medium: fieldOpenFlexible.medium,
                    github: fieldOpenFlexible.github,
                    whitePaper: fieldOpenFlexible.whitePaper,
                    insta: fieldOpenFlexible.insta,
                    reedit: fieldOpenFlexible.reedit,
                    tiktok: fieldOpenFlexible.tiktok,
                    twitter: fieldOpenFlexible.twitter,
                    coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
                    kyc: fieldOpenFlexible.kyc,
                    audit: fieldOpenFlexible.audit
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
                    facebook: fieldOpenFlexible.facebook,
                    medium: fieldOpenFlexible.medium,
                    github: fieldOpenFlexible.github,
                    whitePaper: fieldOpenFlexible.whitePaper,
                    insta: fieldOpenFlexible.insta,
                    reedit: fieldOpenFlexible.reedit,
                    tiktok: fieldOpenFlexible.tiktok,
                    twitter: fieldOpenFlexible.twitter,
                    coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
                    kyc: fieldOpenFlexible.kyc,
                    audit: fieldOpenFlexible.audit
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
                    facebook: fieldOpenFlexible.facebook,
                    medium: fieldOpenFlexible.medium,
                    github: fieldOpenFlexible.github,
                    whitePaper: fieldOpenFlexible.whitePaper,
                    insta: fieldOpenFlexible.insta,
                    reedit: fieldOpenFlexible.reedit,
                    tiktok: fieldOpenFlexible.tiktok,
                    twitter: fieldOpenFlexible.twitter,
                    coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
                    kyc: fieldOpenFlexible.kyc,
                    audit: fieldOpenFlexible.audit
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
                    facebook: fieldOpenFlexible.facebook,
                    medium: fieldOpenFlexible.medium,
                    github: fieldOpenFlexible.github,
                    whitePaper: fieldOpenFlexible.whitePaper,
                    insta: fieldOpenFlexible.insta,
                    reedit: fieldOpenFlexible.reedit,
                    tiktok: fieldOpenFlexible.tiktok,
                    twitter: fieldOpenFlexible.twitter,
                    coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
                    kyc: fieldOpenFlexible.kyc,
                    audit: fieldOpenFlexible.audit
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
                    facebook: fieldOpenFlexible.facebook,
                    medium: fieldOpenFlexible.medium,
                    github: fieldOpenFlexible.github,
                    whitePaper: fieldOpenFlexible.whitePaper,
                    insta: fieldOpenFlexible.insta,
                    reedit: fieldOpenFlexible.reedit,
                    tiktok: fieldOpenFlexible.tiktok,
                    twitter: fieldOpenFlexible.twitter,
                    coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
                    kyc: fieldOpenFlexible.kyc,
                    audit: fieldOpenFlexible.audit
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
                    facebook: fieldOpenFlexible.facebook,
                    medium: fieldOpenFlexible.medium,
                    github: fieldOpenFlexible.github,
                    whitePaper: fieldOpenFlexible.whitePaper,
                    insta: fieldOpenFlexible.insta,
                    reedit: fieldOpenFlexible.reedit,
                    tiktok: fieldOpenFlexible.tiktok,
                    twitter: fieldOpenFlexible.twitter,
                    coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
                    kyc: fieldOpenFlexible.kyc,
                    audit: fieldOpenFlexible.audit
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
                    facebook: fieldOpenFlexible.facebook,
                    medium: fieldOpenFlexible.medium,
                    github: fieldOpenFlexible.github,
                    whitePaper: fieldOpenFlexible.whitePaper,
                    insta: fieldOpenFlexible.insta,
                    reedit: fieldOpenFlexible.reedit,
                    tiktok: fieldOpenFlexible.tiktok,
                    twitter: fieldOpenFlexible.twitter,
                    coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
                    kyc: fieldOpenFlexible.kyc,
                    audit: fieldOpenFlexible.audit
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
                    facebook: fieldOpenFlexible.facebook,
                    medium: fieldOpenFlexible.medium,
                    github: fieldOpenFlexible.github,
                    whitePaper: fieldOpenFlexible.whitePaper,
                    insta: fieldOpenFlexible.insta,
                    reedit: fieldOpenFlexible.reedit,
                    tiktok: fieldOpenFlexible.tiktok,
                    twitter: fieldOpenFlexible.twitter,
                    coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
                    kyc: fieldOpenFlexible.kyc,
                    audit: fieldOpenFlexible.audit
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
                    facebook: fieldOpenFlexible.facebook,
                    medium: fieldOpenFlexible.medium,
                    github: fieldOpenFlexible.github,
                    whitePaper: fieldOpenFlexible.whitePaper,
                    insta: fieldOpenFlexible.insta,
                    reedit: fieldOpenFlexible.reedit,
                    tiktok: fieldOpenFlexible.tiktok,
                    twitter: fieldOpenFlexible.twitter,
                    coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
                    kyc: fieldOpenFlexible.kyc,
                    audit: fieldOpenFlexible.audit
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
                    facebook: fieldOpenFlexible.facebook,
                    medium: fieldOpenFlexible.medium,
                    github: fieldOpenFlexible.github,
                    whitePaper: fieldOpenFlexible.whitePaper,
                    insta: fieldOpenFlexible.insta,
                    reedit: fieldOpenFlexible.reedit,
                    tiktok: fieldOpenFlexible.tiktok,
                    twitter: fieldOpenFlexible.twitter,
                    coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
                    kyc: fieldOpenFlexible.kyc,
                    audit: fieldOpenFlexible.audit
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
                    facebook: fieldOpenFlexible.facebook,
                    medium: fieldOpenFlexible.medium,
                    github: fieldOpenFlexible.github,
                    whitePaper: fieldOpenFlexible.whitePaper,
                    insta: fieldOpenFlexible.insta,
                    reedit: fieldOpenFlexible.reedit,
                    tiktok: fieldOpenFlexible.tiktok,
                    twitter: false,
                    coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
                    kyc: fieldOpenFlexible.kyc,
                    audit: fieldOpenFlexible.audit
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
                    facebook: fieldOpenFlexible.facebook,
                    medium: fieldOpenFlexible.medium,
                    github: fieldOpenFlexible.github,
                    whitePaper: fieldOpenFlexible.whitePaper,
                    insta: fieldOpenFlexible.insta,
                    reedit: fieldOpenFlexible.reedit,
                    tiktok: fieldOpenFlexible.tiktok,
                    twitter: fieldOpenFlexible.twitter,
                    coinMarketCapLink: false,
                    kyc: fieldOpenFlexible.kyc,
                    audit: fieldOpenFlexible.audit
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
                    facebook: fieldOpenFlexible.facebook,
                    medium: fieldOpenFlexible.medium,
                    github: fieldOpenFlexible.github,
                    whitePaper: fieldOpenFlexible.whitePaper,
                    insta: fieldOpenFlexible.insta,
                    reedit: fieldOpenFlexible.reedit,
                    tiktok: fieldOpenFlexible.tiktok,
                    twitter: fieldOpenFlexible.twitter,
                    coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
                    kyc: false,
                    audit: fieldOpenFlexible.audit
                }
                break;
                case 'Audit':
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
                        facebook: fieldOpenFlexible.facebook,
                        medium: fieldOpenFlexible.medium,
                        github: fieldOpenFlexible.github,
                        whitePaper: fieldOpenFlexible.whitePaper,
                        insta: fieldOpenFlexible.insta,
                        reedit: fieldOpenFlexible.reedit,
                        tiktok: fieldOpenFlexible.tiktok,
                        twitter: fieldOpenFlexible.twitter,
                        coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
                        kyc: fieldOpenFlexible.kyc,
                        audit: false
                    }
                    break;
            case 'Facebook-link':
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
                    facebook: false,
                    medium: fieldOpenFlexible.medium,
                    github: fieldOpenFlexible.github,
                    whitePaper: fieldOpenFlexible.whitePaper,
                    insta: fieldOpenFlexible.insta,
                    reedit: fieldOpenFlexible.reedit,
                    tiktok: fieldOpenFlexible.tiktok,
                    twitter: fieldOpenFlexible.twitter,
                    coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
                    kyc: fieldOpenFlexible.kyc,
                    audit: fieldOpenFlexible.audit
                };
                break;
            case 'Medium-link':
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
                    facebook: fieldOpenFlexible.facebook,
                    medium: false,
                    github: fieldOpenFlexible.github,
                    whitePaper: fieldOpenFlexible.whitePaper,
                    insta: fieldOpenFlexible.insta,
                    reedit: fieldOpenFlexible.reedit,
                    tiktok: fieldOpenFlexible.tiktok,
                    twitter: fieldOpenFlexible.twitter,
                    coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
                    kyc: fieldOpenFlexible.kyc,
                    audit: fieldOpenFlexible.audit
                };
                break;
            case 'Github-link':
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
                    facebook: fieldOpenFlexible.facebook,
                    medium: fieldOpenFlexible.medium,
                    github: false,
                    whitePaper: fieldOpenFlexible.whitePaper,
                    insta: fieldOpenFlexible.insta,
                    reedit: fieldOpenFlexible.reedit,
                    tiktok: fieldOpenFlexible.tiktok,
                    twitter: fieldOpenFlexible.twitter,
                    coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
                    kyc: fieldOpenFlexible.kyc,
                    audit: fieldOpenFlexible.audit
                };
                break;
            case 'WhitePaper-link':
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
                    facebook: fieldOpenFlexible.facebook,
                    medium: fieldOpenFlexible.medium,
                    github: fieldOpenFlexible.github,
                    whitePaper: false,
                    insta: fieldOpenFlexible.insta,
                    reedit: fieldOpenFlexible.reedit,
                    tiktok: fieldOpenFlexible.tiktok,
                    twitter: fieldOpenFlexible.twitter,
                    coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
                    kyc: fieldOpenFlexible.kyc,
                    audit: fieldOpenFlexible.audit
                };
                break;
            case 'Insta-link':
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
                    facebook: fieldOpenFlexible.facebook,
                    medium: fieldOpenFlexible.medium,
                    github: fieldOpenFlexible.github,
                    whitePaper: fieldOpenFlexible.whitePaper,
                    insta: false,
                    reedit: fieldOpenFlexible.reedit,
                    tiktok: fieldOpenFlexible.tiktok,
                    twitter: fieldOpenFlexible.twitter,
                    coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
                    kyc: fieldOpenFlexible.kyc,
                    audit: fieldOpenFlexible.audit
                };
                break;
            case 'Reedit-link':
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
                    facebook: fieldOpenFlexible.facebook,
                    medium: fieldOpenFlexible.medium,
                    github: fieldOpenFlexible.github,
                    whitePaper: fieldOpenFlexible.whitePaper,
                    insta: fieldOpenFlexible.insta,
                    reedit: false,
                    tiktok: fieldOpenFlexible.tiktok,
                    twitter: fieldOpenFlexible.twitter,
                    coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
                    kyc: fieldOpenFlexible.kyc,
                    audit: fieldOpenFlexible.audit
                };
                break;
            case 'Tiktok-link':
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
                    facebook: fieldOpenFlexible.facebook,
                    medium: fieldOpenFlexible.medium,
                    github: fieldOpenFlexible.github,
                    whitePaper: fieldOpenFlexible.whitePaper,
                    insta: fieldOpenFlexible.insta,
                    reedit: fieldOpenFlexible.reedit,
                    tiktok: false,
                    twitter: fieldOpenFlexible.twitter,
                    coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
                    kyc: fieldOpenFlexible.kyc,
                    audit: fieldOpenFlexible.audit
                };
                break;
            default:
        }
    }

    if (fieldOpenFlexible.logo || fieldOpenFlexible.name || fieldOpenFlexible.symbole || fieldOpenFlexible.launchPhase || fieldOpenFlexible.contractAdress ||
        fieldOpenFlexible.type || fieldOpenFlexible.website || fieldOpenFlexible.telegram || fieldOpenFlexible.discord || fieldOpenFlexible.twitter ||
        fieldOpenFlexible.coinMarketCapLink || fieldOpenFlexible.kyc ||fieldOpenFlexible.audit ||  fieldOpenFlexible.facebook || fieldOpenFlexible.medium || fieldOpenFlexible.github || fieldOpenFlexible.whitePaper || fieldOpenFlexible.insta || fieldOpenFlexible.reedit || fieldOpenFlexible.tiktok) {
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
            facebook: fieldOpenFlexible.facebook,
            medium: fieldOpenFlexible.medium,
            github: fieldOpenFlexible.github,
            whitePaper: fieldOpenFlexible.whitePaper,
            insta: fieldOpenFlexible.insta,
            reedit: fieldOpenFlexible.reedit,
            tiktok: fieldOpenFlexible.tiktok,
            twitter: fieldOpenFlexible.twitter,
            coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
            kyc: fieldOpenFlexible.kyc,
            audit: fieldOpenFlexible.audit,

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
            facebook: fieldOpenFlexible.facebook,
            medium: fieldOpenFlexible.medium,
            github: fieldOpenFlexible.github,
            whitePaper: fieldOpenFlexible.whitePaper,
            insta: fieldOpenFlexible.insta,
            reedit: fieldOpenFlexible.reedit,
            tiktok: fieldOpenFlexible.tiktok,
            twitter: fieldOpenFlexible.twitter,
            coinMarketCapLink: fieldOpenFlexible.coinMarketCapLink,
            kyc: fieldOpenFlexible.kyc,
            audit: fieldOpenFlexible.audit,
            comment: false
        };
    }
}




export default {
    initFieldOpenFlexible,
    getFieldOpenFlexible,
    setFieldOpenFlexible
};