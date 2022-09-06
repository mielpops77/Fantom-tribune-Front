import React from "react";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import AuthService from "../../../services/auth/auth.service";
// import MultiRangeSlider from "multi-range-slider-react";
import MultiRangeSlider from "../../../package/MultiRangeSlider";
import style from "./Filter.module.scss";


const Filter = () => {
    const url = AuthService.getUrl();
    const [presaleCheckbox, setPresaleCheckbox] = useState(true);
    const [kyc, setKyc] = useState(false);
    const [categorySelect, setCategorySelect] = useState("All Tokens");
    const [typeSelect, setTypeSelect] = useState("All");
    const [minValue, set_minValue] = useState(-100);
    const [maxValue, set_maxValue] = useState(100);
    const navigate = useNavigate();
    
    const changePresaleCheckbox = (event) => {

        if (document.getElementById("category").value !== "presale") {
           /*  if (!presaleCheckbox) {
                setKyc(false);
            } */
            setPresaleCheckbox(!presaleCheckbox);
        }
    }

    const changePresaleKyc = (event) => {
      /*   if (document.getElementById("category").value !== "Presales") {
            if (presaleCheckbox) {
                setPresaleCheckbox(false);
            } */
            setKyc(!kyc);
     /*    } */
    }


    function changeCategory() {
        let element = document.getElementById("category");
        if (element !== null) {
            document.getElementById("category").onchange = function () {
                setCategorySelect(document.getElementById("category").value);
              /*   if (document.getElementById("category").value === "Presales") {
                    setPresaleCheckbox(true);
                    setKyc(false);
                } */

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

    function changePrice(min, max) {
        set_minValue(min);
        set_maxValue(max);

    }

    function searchButton() {
        switch (categorySelect) {
            case 'Presales':
                navigate(`/presales/`)
                break;
            case 'All Tokens':
                navigate(`/allTokens/`)
                break;
            case 'Top Trending':
                navigate(`/topTrending/`)

                break;
            default:
                console.log(`Sorry, unknown page`);
        }

        // navigate(`/login/`);

    }

  return (
    <div className={style.searchFilter}>
        <div className={style.filter}>
            <div className={style.fullCategoryContainer}>
                <p>Presale</p>
                <label className={style.switch}>
                    <input type="checkbox"
                        value={presaleCheckbox}
                        checked={presaleCheckbox}
                        onChange={changePresaleCheckbox} >
                    </input>

                    <span></span>
                </label>
            </div>
            <div className={style.fullCategoryContainer}>
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
                {/* <p className={style.priceChange}>{minValue}% to {maxValue}%</p> */}
                <MultiRangeSlider
                    min={-100}
                    max={100}
                    onChange={({ min, max }) => changePrice(min, max)}
                />
            </div>
            <div className={style.fullCategoryContainer}>
                <div className={style.category}>
                    <p>Category</p>

                </div>
                <select className={style.priceChange}
                        onClick={changeCategory}
                        id="category"
                        /* className={style.selectClass} */>
                        <option value="All Tokens">All Tokens</option>
                        <option value="Top Trending">Top Trending</option>
                        <option value="Presales" >Presales</option>

                    </select>
               {/*  <p className={style.priceChange}>{categorySelect}</p> */}
            </div>
            <div className={style.fullCategoryContainer}>
                <div className={style.category}>
                    <p>Type</p> 
                </div>
                <select className={style.priceChange} 
                /* className={style.selectClass} */
                        id="type"
                        onClick={changeType}>
                        <option value="All">All</option>
                        <option value="Dex">Dex</option>
                        <option value="Nft" >Nft</option>
                        <option value="Lending">Lending</option>
                        <option value="Algo-Stables">Algo-Stables</option>
                        <option value="Aggregator">Aggregator</option>
                        <option value="Reflect token">Reflect token</option>
                        <option value="Yield">Yield</option>
                        <option value="Bridge">Bridge</option>
                    </select>
                {/* <p className={style.priceChange}>{typeSelect}</p> */}
            </div>
        </div>
        <button onClick={searchButton} className={style.searchButton}>
            <img src={url + "assets/search.png"} className={style.imgSearch} alt='search_img'></img>
            <p className={style.textSearch}>Search</p>
        </button>
    </div>
    
    );
};

export default Filter;
