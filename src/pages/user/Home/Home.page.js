import NavigationUserComponent from '../../../components/Navigation/NavigationUser/NavigationUser.component';
import PromotedTokenComponent from '../../../components/User/Home/PromotedTokens/PromotedToken.component';
import TopRankedTokens from '../../../components/User/Home/TopRankedTokens/TopRankedTokens.component';
import PresaleTokens from '../../../components/User/Home/PresaleTokens/PresaleToken.component';
import FooterComponent from '../../../components/Navigation/Footer/Footer.component';
import FilterComponent from '../../../components/Navigation/Filter/Filter2.component';
import HolderBalance from '../../../../src/services/tableauLaunh/HolderBalance';
import AuthService from '../../../../src/services/auth/auth.service';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Home.page.module.scss';

const Home = () => {
    const url = AuthService.getUrl();
    const [promotedNbr, setPromotedNbr] = useState([]);


    useEffect(() => {
        fetch(url + 'getPromotedProject')
            .then((res) => res.json())
            .then((res) => {
                setPromotedNbr(res.length);
            })
    }, []);
    const navigate = useNavigate();

    function nav(path) {
        navigate(path);
      }
    return (

        <div className={style.mainDiv}>
            <NavigationUserComponent />
            <h1 className={style.titleh1}>Discover ...</h1>
            <h2 className={style.titleh2}> .... your next Moon!</h2>
            <h3 className={style.titleh3}>Browse through the platform to find your next big project in the fantom blockchain.</h3>
            <div className={style.home_filterComponent}>
                <FilterComponent />
            </div>
            <br /><br /><br /><br /><br /><br />
            {promotedNbr !== 0 &&
                <div className={style.divSectionTitle}>
                    <img src={url + "assets/star.png"} className={style.imgLogoSection} alt='star'></img>
                    <p className={style.sectionTitle}>Promoted <span className={style.tokensTitle}>Tokens</span> </p>
                </div>}
            {promotedNbr !== 0 &&
                < PromotedTokenComponent />}
            <HolderBalance />
            <div className={style.divSectionTitle}>
                <img src={url + "assets/ranked_arrows.png"} className={style.imgLogoSection} alt='ranked_arrow'></img>
                <p className={style.sectionTitle}>Top Ranked <span className={style.tokensTitle}>Tokens</span> </p>
            </div>
            <TopRankedTokens />
            <div>
            <button onClick={() => nav(`/topTrending/`)} className={style.infosRubrique}>See more</button>

            </div>

            <div className={style.divSectionTitle}>
                <img src={url + "assets/presale2.png"} className={style.imgLogoSection} alt='ranked_arrow'></img>
                <p className={style.sectionTitle}>Presale <span className={style.tokensTitle}>Tokens</span> </p>
            </div>

            <PresaleTokens />
            <button onClick={() => nav(`/presales/`)}  className={style.infosRubrique}>See more</button>

            <br /><br /><br /><br /><br />
            <FooterComponent />
        </div >
    )
}

export default Home;