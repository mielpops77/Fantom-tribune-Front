import NavigationUserComponent from '../../Navigation/NavigationUser/NavigationUser.component';
import FooterComponent from '../../../components/Navigation/Footer/Footer.component';

import React from 'react';
import style from "./Giveaways.module.scss";

const Giveaways = () => {
  return (
    <div>
       <NavigationUserComponent/>
       <div className={style.divFooter}>
                <FooterComponent/>
            </div >
    </div>

  )
}


export default Giveaways;



