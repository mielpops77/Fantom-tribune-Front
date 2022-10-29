import NavigationUserComponent from '../../Navigation/NavigationUser/NavigationUser.component';
import FooterComponent from '../../../components/Navigation/Footer/Footer.component';
import style from "./UpdateCoin.module.scss";
import React from 'react';

const UpdateCoin = () => {
  return (
    <div className={style.updateCoin_fond}>
    <NavigationUserComponent/>
    <div className={style.divFooter}>
        <FooterComponent/>
    </div >
    
</div>

  )
}


export default UpdateCoin;



