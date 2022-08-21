import NavigationUserComponent from './components/Navigation/NavigationUser/NavigationUser.component';
import PromotedTokenComponent from './components/User/Home/PromotedToken/PromotedToken.component';
import TopRankedTokens from './components/User/Home/TopRankedTokens/TopRankedTokens.component';
import FooterComponent from './components/Navigation/Footer/Footer.component';
import style from './components/User/Home/Home.module.scss';

const Home = () => {
    return (
        <div className ={style.mainDiv}>
            <NavigationUserComponent/>
            <div className={style.firstPage}>
                <h1 className={style.titleh1}>Discover ...</h1>
                <h2 className={style.titleh2}> .... your next Moon!</h2>
                <h3 className={style.titleh3}>Browse through the platform to find your next big project in the presale phase.</h3>
                <div className={style.searchFilter}>
                    <div className={style.filter}>
                        <div>
                            <p>Presale</p>  
                            <label className={style.switch}>
                                <input type="checkbox" />
                                <span></span>
                            </label>
                        </div>
                        <div>
                            <p>KYC</p>  
                            <label className={style.switch}>
                                <input type="checkbox" />
                                <span></span>
                            </label>
                        </div>
                        <div>
                            <p>24h price change</p> 
                                <p className={style.priceChange}> place for numbers</p>
                        </div>
                        <div>
                            <div className={style.category}>
                                 <p>Category</p> <select className={style.selectClass}>{/*<svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" class="css-tj5bde-Svg"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>*/}</select>
                            </div>
                            <p className={style.priceChange}> place for value</p>
                        </div>
                        <div>
                            <div className={style.category}>
                                <p>Type</p> <select className={style.selectClass}>{/* <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" class="css-tj5bde-Svg"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg> */}</select>
                            </div>
                            <p className={style.priceChange}> place for value</p>
                        </div>
                    </div>
                    <button className={style.searchButton}>
                        <img src="https://fantom-tribune-back.herokuapp.com/search.png" className={style.imgSearch} alt='search_img'></img>
                        <p className={style.textSearch}>Search</p>
                    </button>
                </div>
            </div>

            <br/><br/><br/><br/><br/><br/>
        <div className={style.divSectionTitle}>
            <img src="https://fantom-tribune-back.herokuapp.com/star.png" className={style.imgLogoSection} alt='star'></img>
            <p className={style.sectionTitle}>Promoted <span className={style.tokensTitle}>Tokens</span> </p>
        </div>
        <PromotedTokenComponent/>

        <div className={style.divSectionTitle}>
                <img src="https://fantom-tribune-back.herokuapp.com/ranked_arrows.png" className={style.imgLogoSection} alt='ranked_arrow'></img>
                <p className={style.sectionTitle}>Top Ranked <span className={style.tokensTitle}>Tokens</span> </p>
            </div>
        <TopRankedTokens/>
        <br/><br/><br/><br/><br/>
        <FooterComponent/>
        </div>
    )
}

export default Home;