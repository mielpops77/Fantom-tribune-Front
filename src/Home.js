import NavigationUserComponent from './components/Navigation/NavigationUser/NavigationUser.component';
import PromotedTokenComponent from './components/User/Home/PromotedToken/PromotedToken.component';
import TopRankedTokens from './components/User/Home/TopRankedTokens/TopRankedTokens.component';
import FooterComponent from './components/Navigation/Footer/Footer.component';
import AuthService from "../src/services/auth/auth.service";
import style from './components/User/Home/Home.module.scss';
import MultiRangeSlider from "multi-range-slider-react";


import { useState } from "react";

const Home = () => {
    const url = AuthService.getUrl();
    const [presaleCheckbox, setPresaleCheckbox] = useState(true);
    const [kyc, setKyc] = useState(false);
    const [categorySelect, setCategorySelect] = useState("All token");
    const [typeSelect, setTypeSelect] = useState("All");
    const [minValue, set_minValue] = useState(-100);
    const [maxValue, set_maxValue] = useState(100);



    const changePresaleCheckbox = (event) => {

        if(document.getElementById("category").value !== "presale")
        {
            if (presaleCheckbox) {
                setKyc(true);
            }
            setPresaleCheckbox(!presaleCheckbox);
        }
    }

    const changePresaleKyc = (event) => {
        if(document.getElementById("category").value !== "presale")
        {
        if (!presaleCheckbox) {
            setPresaleCheckbox(true);
        }
        setKyc(!kyc);
    }
}


    function changeCategory() {
        let element = document.getElementById("category");
        if (element !== null) {
            document.getElementById("category").onchange = function () {
                setCategorySelect(document.getElementById("category").value);
                if (document.getElementById("category").value == "presale")
                {
                    setPresaleCheckbox(false);
                    setKyc(true);
                }
                
            };
        }
    }

    function changeType() {
        let element = document.getElementById("type");
        if (element !== null) {
            document.getElementById("type").onchange = function () {

                setTypeSelect(document.getElementById("type").value);

              
            };
        }
    }

    const handleInput = (e) => {
        set_minValue(e.minValue);
        set_maxValue(e.maxValue);
        console.log('koo0');
    };


    return (
        <div className={style.mainDiv}>
            <NavigationUserComponent />
            <div className={style.firstPage}>
                <h1 className={style.titleh1}>Discover ...</h1>
                <h2 className={style.titleh2}> .... your next Moon!</h2>
                <h3 className={style.titleh3}>Browse through the platform to find your next big project in the presale phase.</h3>
                <div className={style.searchFilter}>
                    <div className={style.filter}>
                        <div>
                            <p>Presale</p>
                            <label className={style.switch}>
                                <input type="checkbox"
                                    /* name="presaleCheckbox" */
                                    /* value={inputs.presaleCheckbox || "checked"} */
                                    value={presaleCheckbox}
                                    checked={presaleCheckbox}
                                    onChange={changePresaleCheckbox} >
                                </input>

                                <span></span>
                            </label>
                        </div>
                        <div>
                            <p>KYC</p>
                            <label className={style.switch}>
                                <input type="checkbox"
                                    value={kyc}
                                    checked={kyc}
                                    onChange={changePresaleKyc} />
                                <span></span>
                            </label>
                        </div>
                        <div>
                            <p>24h price change</p>
                            <MultiRangeSlider
                                min={-100}
                                max={100} 
                                /* step={0} */
                                ruler={false}
                                label={true}
                                preventWheel={false}
                                minValue={minValue}
                                maxValue={maxValue}
                                onInput={(e) => {
                                    handleInput(e);
                                }}
                            />
                            {/* <p className={style.priceChange}> place for numbers</p> */}
                        </div>
                        <div>
                            <div className={style.category}>
                                <p>Category</p>

                                {/* <Select className={style.selectClass} onchange={onChangeCategory} options={options} /> */}
                                <select
                                    onClick={changeCategory}
                                    id="category"
                                    className={style.selectClass}>
                                    <option value="topTrending">Top trending</option>
                                    <option value="allToken">All Token</option>
                                    <option value="presale" >Presale</option>

                                </select>
                            </div>
                            <p className={style.priceChange}>{categorySelect}</p>
                        </div>
                        <div>
                            <div className={style.category}>
                                <p>Type</p> <select className={style.selectClass}
                                    id="type"
                                    onClick={changeType}>
                                    <option value="All">All</option>
                                    <option value="Dex">Dex</option>
                                    <option value="Nft" >Nft</option>
                                    <option value="Lending">Lending</option>
                                    <option value="Algo-Stables">Algo-Stables</option>
                                    <option value="Yield Aggregatort">Yield Aggregatort</option>
                                    <option value="Reflect token">Reflect token</option>
                                    <option value="Yield">Yield</option>
                                    <option value="Bridge">Bridge</option>
                                </select>
                            </div>
                            <p className={style.priceChange}>{typeSelect}</p>
                        </div>
                    </div>
                    <button className={style.searchButton}>
                        <img src={url + "search.png"} className={style.imgSearch} alt='search_img'></img>
                        <p className={style.textSearch}>Search</p>
                    </button>
                </div>
            </div>

            <br /><br /><br /><br /><br /><br />
            <div className={style.divSectionTitle}>
                <img src={url + "star.png"} className={style.imgLogoSection} alt='star'></img>
                <p className={style.sectionTitle}>Promoted <span className={style.tokensTitle}>Tokens</span> </p>
            </div>
            <PromotedTokenComponent />

            <div className={style.divSectionTitle}>
                <img src={url + "ranked_arrows.png"} className={style.imgLogoSection} alt='ranked_arrow'></img>
                <p className={style.sectionTitle}>Top Ranked <span className={style.tokensTitle}>Tokens</span> </p>
            </div>
            <TopRankedTokens />
            <br /><br /><br /><br /><br />
            <FooterComponent />
        </div >
    )
}

export default Home;