import NavigationUserComponent from '../../../components/Navigation/NavigationUser/NavigationUser.component';
import TopTrendingComponent from '../../../components/User/TopTrending/TopTrending.component';
import FooterComponent from '../../../components/Navigation/Footer/Footer.component';
import AuthService from "../../../services/auth/auth.service";
import style from './TopTrending.page.module.scss';
import React from 'react';

const TopTrending = () => {
    const url = AuthService.getUrl();

    return (
        <div className={style.topTrending_fond}>
            <NavigationUserComponent />
            <div className={style.mainDiv}>
                <div className={style.divSectionTitle}>
                    <img src={url + "assets/ranked_arrows.png"} className={style.imgLogoSection} alt='ranked_arrow'></img>
                    <p className={style.sectionTitle}>Top Ranked <span className={style.tokensTitle}>Tokens</span> </p>
                </div>
            </div>
            {/* <div className={style.divSectionTitle}>
                <img src={url + "assets/ftm.png"} className={style.imgLogoSection} alt='ranked_arrow'></img>
                <p className={style.sectionTitle}>All <span className={style.tokensTitle}>Tokens</span> </p>
            </div> */}
            <TopTrendingComponent />
            <div /* className={style.divFooter} */>
                <FooterComponent />
            </div >

        </div>
    );
};

export default TopTrending;