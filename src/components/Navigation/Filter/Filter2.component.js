import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import AuthService from "../../../services/auth/auth.service";
import { useNavigate } from 'react-router-dom';
import style from "./Filter2.module.scss";
import React, { useState } from 'react';
import axios from "axios";


const Filter2 = () => {

    const [items, setItems] = useState([
        {
            id: 0,
            name: 'vide',
            image: 'vide',
            symbol: 'vide',
            type: 'vide'
        }]);
    const url = AuthService.getUrl();
    const navigate = useNavigate();

    let b = [
        {
            id: 0,
            name: 'vide',
            image: 'vide',
            symbol: 'vide',
            type: 'vide'
        }];

    const items2 = [
        {
            id: 0,
            name: "aaaaa",
        },
        {
            id: 1,
            name: "aaaaaaaaa",
        },

    ];


    const handleOnSearch = (string, results) => {
        console.log('results', results);
        // getSearchCoinRequest(string);
    }


    const handleOnSelect = (item) => {
        navigate(`/infoCoin/${item.id}`);
    }



    const formatResult = (item) => {

        return (
            <>
                <span className={style.filter_search}><img className={style.filter_img} src={url + item.image} alt='img' />  <span className={style.filter_nameSearch}>{item.name}</span> 	<mat-chip>
                    <label htmlFor="chip-1">{item.symbol}</label>
                </mat-chip></span>
            </>
        )
    }

    function searchButton() {


    }

    function test(event) {
        console.log("event:", event.target.value)
        getSearchCoinRequest(event.target.value);
    }
    function getSearchCoinRequest(search) {
        return axios.get(AuthService.getUrl() + `searchCoin?name=${search}`)
            .then(response => {
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

                <div onChange={test}>
                    <ReactSearchAutocomplete
                        styling={
                            {

                                border: '1px solid #000',
                                fontSize: "40px",
                                height: "135px !IMPORTANT",
                                fontFamily: "arial",
                                fill: "blue !IMPORTANT",
                            }
                        }
                        fuseOptions={
                            {
                                shouldSort: true,
                                threshold: 0.6,
                                location: 0,
                                distance: 100,
                                maxPatternLength: 32,
                                minMatchCharLength: 1,
                                keys: [
                                    "name", "symbol"
                                ]
                            }
                        }
                        resultStringKeyName="name"

                        placeholder="Search..."
                        items={items}
                        onSearch={handleOnSearch}
                        onSelect={handleOnSelect}
                        // fuseOptions={{ keys: ["title", "description"] }}
                        /* autoFocus */
                        formatResult={formatResult}
                    />

                </div>

            </div>
            <button onClick={searchButton} className={style.searchButton}>
                <img src={url + "assets/search.png"} className={style.imgSearch} alt='search_img'></img>
                <p className={style.textSearch}>Search</p>
            </button>
        </div>

    );
};

export default Filter2;
