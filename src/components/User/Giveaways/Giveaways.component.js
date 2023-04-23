import NavigationUserComponent from '../../Navigation/NavigationUser/NavigationUser.component';

import React, { useEffect } from 'react';

import style from "./Giveaways.module.scss";





const Giveaways = () => {


  
useEffect(() => {
    let pattern = [];
    pattern[0]="0x2ab5c606a5aa2352f8072b9e2e8a213033e2c4c9";
    pattern[1]="0x5dbc2a8b01b7e37dfd7850237a3330c9939d6457";


    fetch(`https://api.paintswap.finance/v2/collections/${pattern}`)
      .then((res) => res.json())
      .then((res) => {
      console.log('heeeeeeeeeey',res);

  
      })
  
  }, [])
  return (
    <div className={style.giveaways_container}>
      {/* <NavigationUserComponent /> */}
      <p>dzzzzzzzzzzzzzzzzzzzz</p>
      <iframe className={style.iframe} title="Graphical Board" loading="lazy" src="63fe573920240b2f645f02d5" width="100%" height="100%" borderRadius="15px"  ></iframe>

    </div>

  )
}


export default Giveaways;



