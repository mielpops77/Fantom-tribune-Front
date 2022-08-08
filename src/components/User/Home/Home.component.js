import React, { useState, useEffect } from 'react';
import style from "./Home.module.scss";


const Home = () => {

  const [elements, setElements] = useState([]);

  useEffect(() => {

    fetch('http://localhost:3000/getPromotedProject')
      .then((res) => res.json())
      .then((res) => {
        setElements(res);
      })
  }, []);

  return (
    <div >
      <div className={style.divSingleBlock}>
        <div className={style.sectionBackground}></div>
        {elements.map((item) => {
          return <div className={style.rectangle}>
            <div className={style.divAllInfo}>
              <p className={style.KYCButton}>KYC</p>
              <div className={style.imgCrown}></div>
              <img src="http://localhost:3000/planet9.png" className={style.imgProjectLogo}></img>
              <h1 className={style.projectName}>{item.name}</h1>
              <p className={style.presaleButton}>PreSale</p>
              <p className={style.thPointer} scope="col">Type: {item.type}</p>
              <p className={style.thPointer} scope="col">Market Cap: {item.marketCap}</p>
              <p className={style.thPointer} scope="col">Price: {item.price}</p>
              <p className={style.thPointer} scope="col">Change in 24h: {item.percent_change_24h}%</p>
              <p className={style.thPointer} scope="col">Launch: {item.launchDate}</p>
              <p className={style.thPointer} scope="col">Votes: {item.vote}</p>
              <p className={style.thPointer} scope="col">Votes in 24h: {item.voteTwentyHour}</p>
              <div className={style.cardFooter}>
                <button className={style.voteButton}>Vote</button>
                <button className={style.buyButton}>Buy</button>
              </div>
            </div>
          </div>
        })}

      </div>
    </div >


  );
}

export default Home;



