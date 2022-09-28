import NavigationUserComponent from '../../Navigation/NavigationUser/NavigationUser.component';
import AuthService from "../../../services/auth/auth.service";
import style from './TopTrending.module.scss';

import React from 'react';

const TopTrending = () => {
  const url = AuthService.getUrl();

  return (
    <div className={style.topTrending_mainDiv}>
      <NavigationUserComponent />
      <div className={style.topTrending_divSectionTitle}>
        <img src={url + "assets/ranked_arrows.png"} className={style.topTrending_imgLogoSection} alt='ranked_arrow'></img>
        <p className={style.topTrending_sectionTitle}>Top Ranked <span className={style.topTrending_tokensTitle}>Tokens</span> </p>
      </div>
    </div>

  )
}

export default TopTrending;



