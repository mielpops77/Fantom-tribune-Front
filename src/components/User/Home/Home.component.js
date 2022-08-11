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
              <div className={style.list}>
                                <tr><td className={style.pointer}>Type: </td><td>{item.type}</td></tr>
                                <tr><td className={style.pointer}>Market Cap: </td><td className={style.pointedItem}>{item.marketCap}</td></tr>
                                <tr><td className={style.pointer}>Price: </td><td className={style.pointedItem}>{item.price}</td></tr>
                                <tr><td className={style.pointer}>Change in 24h: </td><td className={style.pointedItem}>{item.percent_change_24h}%</td></tr>
                                <tr><td className={style.pointer}>Launch: </td><td className={style.pointedItem}>{item.launchDate}</td></tr>
                                <tr><td className={style.pointer}>Votes: </td><td className={style.pointedItem}>{item.vote}</td></tr> 
                                <tr><td className={style.pointer}>Votes in 24h: </td><td className={style.pointedItem}>{item.voteTwentyHour}</td></tr>
                            </div> 
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



