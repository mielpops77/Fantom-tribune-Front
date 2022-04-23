import React, { useState, useEffect } from 'react';
import NavigationUserComponent from '../../Navigation/NavigationUser/NavigationUser.component';
import TableLaunchService from '../../../services/tableauLaunh/tableauLaunch.service';
import FooterComponent from '../../Navigation/Footer/Footer.component';
import style from "./InfoCoin.module.scss";

const InfoCoin = () => {
    const [posts, setPosts] = useState([]);
    var [database, seDatabase] = useState([])

    let url = window.location.href;
    const id = url.substring(31, url.length);
    console.log(id);

    function tableLaunch(limit, skip) {


        var totalReactPackages;
        TableLaunchService.getLaunchTab(limit, skip).then(function (result) {
          let userData = [];
          result.map((item, index) => {
            item.id = (
              {/* <div style={{ fontWeight: "bold", fontSize: "1.2em" }}>{item._id}</div> */ }
            );
            item.image = (
              <img src={"http://localhost:3000/" + result[index].image} />
            );
    
            userData.push(item);
          });
          totalReactPackages = userData;
    
          TableLaunchService.setDatabase(userData)
          if (totalReactPackages != null) {
            TableLaunchService.initDatabase();
    
            let data = TableLaunchService.getDatabase()
            for (let i = 0; i < totalReactPackages.length; i++) {
              data.rows.push(({ image: <img style={{ height: "100%", width: "95px", float: "left" }} src={totalReactPackages[i].image.props.src} />, name: totalReactPackages[i].name, symbol: totalReactPackages[i].symbol, launchDate: totalReactPackages[i].launchDate, id: totalReactPackages[i]._id, vote: totalReactPackages[i].vote }));
            }
    
    
    
            seDatabase(TableLaunchService.getDatabase());
    
    
    
          }
    
    
    
        }, err => {
          console.log(err);
        });
    
      }


    useEffect(() => {
        fetch('http://localhost:3000/launchDate/')
            .then((res) => res.json())
            .then((res) => {
                setPosts(res);
            });
    }, []);

    let postsArray = JSON.parse(JSON.stringify(posts));
    let coin = []

    for (let i = 0; i < postsArray.length; i++) {
        if (postsArray[i]._id === id) {
            coin = postsArray[i];
        }
    }

    console.log('coin', coin);
    return (

        <div>
            <NavigationUserComponent />
              <div className={style.divCorpCoin}>
                <div className={style.allInfoCoin}>
                  <div className={style.infoCoin}>
                    <div className={style.mainInfo}>
                      <div className={style.divImg}>
                        <img className={style.imgProjet} src="http://localhost:3000/05b99b37a51ccf499c0489389aef9e38.png"/>
                      </div>
                      <div>
                        <h1 className={style.coinName}>{coin.name}</h1>
                        <p className={style.coinSymbol}>{coin.symbol}</p>
                      </div>
                    </div>
                      <p className={style.coinInfoDesign}><p className={style.coinTextDesign}>launchDate</p>: {coin.launchDate}</p>
                      <p className={style.coinInfoDesign}><p className={style.coinTextDesign}>type</p>: {coin.launchDate}</p>
                      <p className={style.coinInfoDesign}><p className={style.coinTextDesign}>Contract Address</p>: {coin.launchDate}</p>
                      <p className={style.coinInfoDesign}><p className={style.coinTextDesign}>Description</p>: {coin.launchDate}</p>
                  </div>
                  <div className={style.divNewsTwitter}>
                    <h1 className={style.titleNewsTwitter}>Twit-News</h1>
                  </div>
                </div>
              </div>
              <div className={style.divFooter}>
                    <FooterComponent />
              </div>
        </div>
    )
}

export default InfoCoin;