import NavigationUserComponent from './components/Navigation/NavigationUser/NavigationUser.component';
import PromotedTokenComponent from './components/User/Home/PromotedToken/PromotedToken.component';
import TopRankedTokens from './components/User/Home/TopRankedTokens/TopRankedTokens.component';
import FooterComponent from './components/Navigation/Footer/Footer.component';
import FilterComponent from './components/Navigation/Filter/Filter.component';
import AuthService from "../src/services/auth/auth.service";
import style from './components/User/Home/Home.module.scss';


const Home = () => {
    const url = AuthService.getUrl();

    return (
        <div className={style.mainDiv}>
            <NavigationUserComponent />
            <h1 className={style.titleh1}>Discover ...</h1>
            <h2 className={style.titleh2}> .... your next Moon!</h2>
            <h3 className={style.titleh3}>Browse through the platform to find your next big project in the presale phase.</h3>
            <div className={style.home_filterComponent}>
                <FilterComponent/>
            </div>
            <br/><br/><br/><br/><br/>
            <div className={style.divSectionTitle}>
                <img src={url + "assets/star.png"} className={style.imgLogoSection} alt='star'></img>
                <p className={style.sectionTitle}>Promoted <span className={style.tokensTitle}>Tokens</span> </p>
            </div>
            <PromotedTokenComponent />

            <div className={style.divSectionTitle}>
                <img src={url + "assets/ranked_arrows.png"} className={style.imgLogoSection} alt='ranked_arrow'></img>
                <p className={style.sectionTitle}>Top Ranked <span className={style.tokensTitle}>Tokens</span> </p>
            </div>
            <TopRankedTokens />
            <br /><br /><br /><br /><br />
            <FooterComponent />
        </div >
    )
}

export default Home;