// import MultiRangeSlider from "multi-range-slider-react";
import style from "./Filter2.module.scss";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import UpdateCoinService from "../../../services/User/UpdateCoin.service";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import AuthService from "../../../services/auth/auth.service";
import { useNavigate } from 'react-router-dom';


const Filter2 = () => {

    const [items, setItems] = useState([]);
    // const [idProject, setIdProject] = useState('');
    const url = AuthService.getUrl();
    const navigate = useNavigate();

    const handleOnSearch = (string, results) => {
        getSearchCoinRequest(string);
    }

    const handleOnSelect = (item) => {
        console.log('test');
        // getSearchCoinById(item.id);
        // setIdProject(item.id)
        navigate(`/infoCoin/${item._id}`)
    }


/*     function getSearchCoinById(id) {
        const pattern = "projetsValidadOnly"
        return axios.get(AuthService.getUrl() + `searchById?id=${id}&pattern=${pattern}`)
            .then(response => {
                return response.data;
            })
    } */

    const formatResult = (item) => {
        return (
            <>
                <span className={style.filter_search}>  <img className={style.filter_img} src={url + item.image} alt='img' />  <span className={style.filter_nameSearch}>{item.name}</span> 	<mat-chip>
                    <label htmlFor="chip-1">{item.symbol}</label>
                </mat-chip></span>
            </>
        )
    }

    function searchButton() {
       

    }

    function getSearchCoinRequest(search) {
        return axios.get(AuthService.getUrl() + `searchCoin?name=${search}`)
            .then(response => {
                /* setSearchCoin(response.data); */
                let result = [
                    {
                        id: 0,
                        name: 'vide',
                        image: 'vide',
                        symbol: 'vide',
                        type: 'vide'
                    },
                    {
                        id: 1,
                        name: 'vide',
                        image: 'vide',
                        symbol: 'vide',
                        type: 'vide'

                    },
                    {
                        id: 2,
                        name: 'vide',
                        image: 'vide',
                        symbol: 'vide',
                        type: 'vide'

                    },
                    {
                        id: 3,
                        name: 'vide',
                        image: 'vide',
                        symbol: 'vide',
                        type: 'vide'

                    },
                    {
                        id: 4,
                        name: 'vide',
                        image: 'vide',
                        symbol: 'vide',
                        type: 'vide'

                    }
                    ,
                    {
                        id: 5,
                        name: 'vide',
                        image: 'vide',
                        symbol: 'vide',
                        type: 'vide'

                    },
                    {
                        id: 6,
                        name: 'vide',
                        image: 'vide',
                        symbol: 'vide',
                        type: 'vide'

                    },
                    {
                        id: 7,
                        name: 'vide',
                        image: 'vide',
                        symbol: 'vide',
                        type: 'vide'

                    },
                    {
                        id: 8,
                        name: 'vide',
                        image: 'vide',
                        symbol: 'vide',
                        type: 'vide'

                    },
                    {
                        id: 9,
                        name: 'vide',
                        image: 'vide',
                        symbol: 'vide',
                        type: 'vide'

                    }
                ]
                for (let i = 0; i < response.data.length; i++) {
                    result[i].name = response.data[i].name;
                    result[i].id = response.data[i]._id;
                    result[i].image = response.data[i].image;
                    result[i].symbol = response.data[i].symbol;
                    result[i].type = response.data[i].type;

                }

                const result2 = result.filter((person) => person.name !== 'vide')
                setItems(result2);


                return response.data;
            })
    }
    return (
        <div className={style.searchFilter}>
            <div className={style.filter}>

                <ReactSearchAutocomplete
                    styling={
                        {

                            border: "0px",
                            fontSize: "40px",
                            height: "135px !IMPORTANT",
                            fontFamily: "arial",
                            fill: "blue !IMPORTANT",
                        }
                    }
                    placeholder="Search..."
                    items={items}
                    onSearch={handleOnSearch}
                    onSelect={handleOnSelect}
                    autoFocus
                    formatResult={formatResult}
                />



            </div>
            <button onClick={searchButton} className={style.searchButton}>
                <img src={url + "assets/search.png"} className={style.imgSearch} alt='search_img'></img>
                <p className={style.textSearch}>Search</p>
            </button>
        </div>

    );
};

export default Filter2;
