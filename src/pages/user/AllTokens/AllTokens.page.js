import NavigationUserComponent from '../../../components/Navigation/NavigationUser/NavigationUser.component';
import AllTokensComponent from '../../../components/User/AllTokens/AllTokens.component';
import FooterComponent from '../../../components/Navigation/Footer/Footer.component';
import AuthService from "../../../services/auth/auth.service";
import style from './AllTokens.page.module.scss';
import React from 'react';
// import TopTrendingComponent from '../../../components/User/TopTrending/TopTrending.component';

const AllTokens = () => {
  const url = AuthService.getUrl();

    return (
        <div className={style.allTokens_fond}>
            <NavigationUserComponent />
            <div className={style.divSectionTitle}>
                <img src={url + "assets/ftm2.png"} className={style.imgLogoSection} alt='ranked_arrow'></img>
                <p className={style.sectionTitle}>All <span className={style.tokensTitle}>Tokens</span> </p>
            </div>
            {/* <p className={style.allTokens_sectionTitle}>All Tokens</p> */}
            <AllTokensComponent />

            <div /* className={style.divFooter} */>
                <FooterComponent />
            </div >

        </div>
    );
};

export default AllTokens;