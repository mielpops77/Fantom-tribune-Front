import React, { useEffect } from 'react';
import TableLaunchService from '../../../services/tableauLaunh/tableauLaunch.service'

import style from "./Home.module.scss";
import HolderBalance from '../../../services/tableauLaunh/HolderBalance'
import tableauLaunchService from '../../../services/tableauLaunh/tableauLaunch.service';


const Home = () => {

    const list = [
        { key: 1, value: 10 },
        { key: 2, value: 20 },
        { key: 3, value: 30 },
        { key: 4, value: 10 },
        { key: 5, value: 20 },
        { key: 6, value: 30 },
        { key: 7, value: 10 },
        { key: 8, value: 20 }
    ];
    useEffect(() => {
        
        TableLaunchService.coinmarketCap('ethereum');
        console.log('okokokk');

        //On initialise listAllContract 
       /*  TableLaunchService.initListAllContract(); */
        //On add la liste des contract des projet non prevente dans listAllContract
       
    }, []);

/* 
    tableauLaunchService.initPriceList(TableLaunchService.getListAllContract().length) */

    return (
        <div >
            <p className={style.topTrendingTitle}>Top Trending <span className={style.spanTokenTitle}>Tokens</span> </p>
            <br /><br />
        {/*     <HolderBalance /> */}
            <div className={style.all}>
                {list.map(({ key, value }) => {
                    return <div key={key} className={style.rectangle} >
                        <h1>value</h1>
                    </div>
                })}
            </div>
        </div >


    );
}

export default Home;



