import NavigationAdminComponent from '../../Navigation/NavigationAdmin/NavigationAdmin.component';
import TableLaunchService from "../../../services/tableauLaunh/tableauLaunch.service";
import FooterComponent from '../../../components/Navigation/Footer/Footer.component';
import editionService from "../../../services/admin/editionAdmin.service";
import AuthService from "../../../services/auth/auth.service";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from "./Edition.module.scss";
import Select from 'react-select'
import axios from 'axios';

const Edition = () => {
    const [selected, setSelected] = useState(null);
    const [inputs, setInputs] = useState({});
    const [urlUpload, setToggle] = useState('');
    const [prev, setPrev] = useState('');
    const [kyc, setKyc] = useState('');
    const [stat, setStat] = useState({
        name: "drgerrzdadaz",
        symbol: "",
        launchDate: "",
        contractAddress: "",
        description: "",
        websiteLink: "",
        coinMarketCapLink: "",
        telegram: "",
        twitter: "",
        discord: ""
    });

    const [statType, setStatType] = useState("");


    let navigate = useNavigate();
    const url = AuthService.getUrl();

    //let date = new Date()
    //let today = date.toISOString().split('T')[0];


    let paths = window.location.href;
    const id = paths.substring(34, paths.length);
    const options = [
        { label: "Dex", value: "Dex" },
        { label: "Gaming", value: "Gaming" },
        { label: "Nft", value: "Nft" },
        { label: "Lending", value: "Lending" },
        { label: "Algo-Stables", value: "Algo-Stables" },
        { label: "Derivatives", value: "Derivatives" },
        { label: "Yield Aggregatort", value: "Yield Aggregatort" },
        { label: "Reflect token", value: "Reflect token" },
        { label: "Yield", value: "Yield" },

    ];



    let date = new Date();
    let mondayUtc = (date.getUTCMonth() + 1)
    mondayUtc = parseInt(mondayUtc);
    let dayUtc = date.getUTCDate();
    dayUtc = parseInt(dayUtc);
    let type = 'Dex';

    if (mondayUtc < 10) {
        mondayUtc = '0' + mondayUtc.toString()
    }

    if (dayUtc < 10) {
        dayUtc = '0' + dayUtc.toString()
    }


    let dateUtc = date.getFullYear() + '-' + mondayUtc + '-' + dayUtc;

    /* let today = date.toISOString().split('T')[0]; */

    function addDaysToDate(date, days) {
        var res = new Date(date);
        res.setDate(res.getDate() + days);
        return res;
    }

    let dateMax = new Date();
    dateMax = addDaysToDate(dateMax, -1);

    let mondayUtcMax = (dateMax.getUTCMonth() + 1)
    mondayUtcMax = parseInt(mondayUtcMax);
    let dayUtcMax = dateMax.getUTCDate();
    dayUtcMax = parseInt(dayUtcMax);

    if (mondayUtcMax < 10) {
        mondayUtcMax = '0' + mondayUtcMax.toString()
    }

    if (dayUtcMax < 10) {
        dayUtcMax = '0' + dayUtcMax.toString()
    }

    let dateUtcMax = dateMax.getFullYear() + '-' + mondayUtcMax + '-' + dayUtcMax;


    const prevente = (event) => {
        setPrev(event.target.value);
    }
    const kycChange = (event) => {
        setKyc(event.target.value);
    }


    function prevCheck(dateProject) {
        if (dateProject >= dateUtc) {
            setPrev("yes");
        }
        else {
            setPrev("no");


        }

    }


    const handleChangeFile = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
        upload();
    }



    const upload = () => {
        const inputImg = document.querySelector("input[type=file]");
        let fileCount = inputImg.files.length;
        if (fileCount > 0) {


            let formData = new FormData();
            formData.append('image', inputImg.files.item(0))
            axios({
                method: "post",
                url: url + "images",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (response) {
                    //handle success
                    setToggle(url + inputImg.files.item(0).name);
                })
                .catch(function (response) {
                    //handle error
                });
        }
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        editionService.setCoinEdit("", name);

        if (name == "coinMarketCapLink") {
            editionService.initCoinMarketCapLink();
            editionService.setCoinMarketCapLink(value);
        }
        setInputs(values => ({ ...values, [name]: value }))
    }

    function coinmarketCapLinkEdit() {
        if (editionService.getCoin().coinMarketCapLink !== editionService.getCoinMarketCapLink()) {
            if (inputs.coinMarketCapLink === "") {
                editionService.setMarketCapStatus('none');

            }
            if (inputs.coinMarketCapLink === undefined) {
                editionService.setMarketCapStatus(editionService.getCoin().coinMarketCapStatus);

            }
            else {
                editionService.setMarketCapStatus("en cours de validation");
                const searchTerm = '/currencies/'
                const slug = inputs.coinMarketCapLink.substring(inputs.coinMarketCapLink.lastIndexOf(searchTerm) + 12, inputs.coinMarketCapLink.length - 1)
                TableLaunchService.coinmarketCap(slug, editionService.getCoinMarketCapLink());
            }

        }

    }
    const handleSubmit = (event) => {
        editionService.initType();
        event.preventDefault();
        coinmarketCapLinkEdit();
        let type = [];
        if (selected === null) {
            type = editionService.getType();
        }
        else {
            type = selected;
        }
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: inputs.name, symbol: inputs.symbol, launchDate: inputs.launchDate, contractAddress: inputs.contractAddress, description: inputs.description, type: type.value,
                websiteLink: inputs.websiteLink, telegram: inputs.telegram, twitter: inputs.twitter, discord: inputs.discord, image: inputs.image, coinMarketCapLink: inputs.coinMarketCapLink, coinMarketCapStatus: editionService.getMarketCapStatus(), kyc: kyc
            })
        };
        fetch(url + `adminEdit/${id}`, requestOptions)
            .then(response => response.json())
            .then(data => navigate("/administration"));

    }



    function handleSelect(event) {
        setSelected(event);
    }


    useEffect(() => {
        fetch(url + 'launchDateAdmin/')
            .then((res) => res.json())
            .then((res) => {
                editionService.initCoin();
                editionService.initType();

                let postsArray = JSON.parse(JSON.stringify(res));

                for (let i = 0; i < postsArray.length; i++) {
                    if (postsArray[i]._id === id) {
                        editionService.setCoin(postsArray[i]);
                        editionService.setType({ label: postsArray[i].type, value: postsArray[i].type },);
                        setToggle(url + editionService.getCoin().image);
                    }
                }
                setStat(editionService.getCoin());
                setStatType(editionService.getType());
                editionService.initMarketCapStatus();
                editionService.setMarketCapStatus(editionService.getCoin().coinMarketCapStatus);

                prevCheck(editionService.getCoin().launchDate);
                setKyc(editionService.getCoin().kyc.toString());
            });
    }, [id]);


    return (

        <div>
            <NavigationAdminComponent />

            <div className={style.divCorpSubmit}>
                <h1 className={style.titleSubmit}>Modify a coin to Fantom Tribune</h1>
                <p className={style.subtitleSubmit}>Here you can edit projects</p>
                <p className={style.subtitleSubmit}>David likes to take cocks in the ass</p>
                <hr></hr>
                <div>
                    <form className={style.formulaireSubmit} onSubmit={handleSubmit}>

                        <label className={style.formLabelFileEmpty} htmlFor="file-input">
                            <div className={style.formLabel}>Logo Upload*</div>
                            <img style={{ height: "100%", float: "left", maxWidth: "30%", maxHeight: "30%", cursor: 'pointer' }} src={url + "assets/upload.png"} alt='img' />
                            <img style={{ height: "100%", float: "left", maxWidth: "25%", maxHeight: "25%" }} src={urlUpload} alt='img' />
                        </label>

                        <input id="file-input" className={style.file} type="file" name="image" value={inputs.image || ""}
                            onChange={handleChangeFile}
                            accept="image/png, image/jpeg"
                        >
                        </input>

                        <label className={style.formLabel}>Name*:
                            <input className={style.formInput}
                                type="text"
                                name="name"
                                value={inputs.name || stat.name}
                                onChange={handleChange}
                            />
                        </label>
                        <label className={style.formLabel}>Symbol*:
                            <input className={style.formInput}
                                type="text"
                                name="symbol"
                                value={inputs.symbol || stat.symbol}
                                onChange={handleChange}
                            ></input>
                        </label>




                        <label className={style.formLabel}>Project in the launch phase?*:
                            <div>

                                {
                                    prev === "yes" &&
                                    < input onChange={prevente} type="radio" name="question" value="yes" id="yes" required="required" checked
                                    />}
                                {
                                    prev === "no" &&
                                    <input onChange={prevente} type="radio" name="question" value="yes" id="yes" required="required"
                                    />}
                                <label style={{ marginRight: "1%" }} htmlFor="yes">yes</label>

                                {
                                    prev === "no" &&
                                    <input onChange={prevente} type="radio" name="question" value="no" id="no" required="required" checked
                                    />
                                }
                                {
                                    prev === "yes" &&
                                    <input onChange={prevente} type="radio" name="question" value="no" id="no" required="required"
                                    />
                                }
                                <label htmlFor="no">no</label>
                            </div>
                        </label>

                        {
                            prev === "yes" && <label className={style.formLabel}>LaunchDate (UTC)*:
                                <input className={style.formInput}
                                    type="date"
                                    name="launchDate"
                                    min={dateUtc}
                                    value={inputs.launchDate || stat.launchDate}
                                    onChange={handleChange}
                                />
                            </label>
                        }

                        {
                            prev === "no" && <label className={style.formLabel}>LaunchDate (UTC)*:
                                <input className={style.formInput}
                                    type="date"
                                    name="launchDate"
                                    max={dateUtcMax}
                                    value={inputs.launchDate || stat.launchDate}
                                    onChange={handleChange}
                                />
                            </label>
                        }



                        <label className={style.formLabel}>Contract Address:
                            <input className={style.formInput}
                                type="text"
                                name="contractAddress"
                                value={inputs.contractAddress || stat.contractAddress}
                                onChange={handleChange}
                            />

                        </label>

                        <label className={style.formLabel}>Description*:
                            <textarea className={style.formInput} style={{
                                maxHeight: "40em",
                                minHeight: "8em"
                            }}
                                type="text"
                                name="description"
                                value={inputs.description || stat.description}
                                onChange={handleChange}
                                required="required"
                            />
                        </label>

                        <label className={style.formLabel}>Type*:
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                value={selected || statType}
                                isSearchable={true}
                                options={options}
                                /* value={selected} */
                                onChange={handleSelect}
                                selectOption="required"
                            />

                        </label>

                        <label className={style.formLabel}>Website link*:
                            <input className={style.formInput}
                                type="text"
                                name="websiteLink"
                                value={inputs.websiteLink || stat.websiteLink}
                                onChange={handleChange}
                                required="required"
                            />
                        </label>

                        <label className={style.formLabel}>coinmarketcap link:
                            <input className={style.formInput}
                                type="text"
                                name="coinMarketCapLink"
                                value={inputs.coinMarketCapLink || stat.coinMarketCapLink}
                                onChange={handleChange} />
                        </label>

                        <label className={style.formLabel}>coinMarketCapStatus: {editionService.getCoin().coinMarketCapStatus}
                        </label>

                        <label className={style.formLabel}>Telegram link:
                            <input className={style.formInput}
                                type="text"
                                name="telegram"
                                value={inputs.telegram || stat.telegram}
                                onChange={handleChange}>
                            </input>
                        </label>


                        <label className={style.formLabel}>Twitter link*:
                            <input className={style.formInput}
                                type="text"
                                name="twitter"
                                value={inputs.twitter || stat.twitter}
                                onChange={handleChange}
                                required="required" />
                        </label>


                        <label className={style.formLabel}>Discord link:
                            <input className={style.formInput}
                                type="text"
                                name="discord"
                                value={inputs.discord || stat.discord}
                                onChange={handleChange} />
                        </label>
                        <label className={style.formLabel}>Kyc? *:
                            <div>
                                {
                                    kyc === "true" &&
                                    < input onChange={kycChange} type="radio" name="questionKyc" value="true" id="true" required="required" checked
                                    />}
                                {
                                    kyc === "false" &&
                                    <input onChange={kycChange} type="radio" name="questionKyc" value="true" id="true" required="required"
                                    />}
                                <label style={{ marginRight: "1%" }} htmlFor="yes">yes</label>

                                {
                                    kyc === "false" &&
                                    <input onChange={kycChange} type="radio" name="questionKyc" value="false" id="false" required="required" checked
                                    />
                                }
                                {
                                    kyc === "true" &&
                                    <input onChange={kycChange} type="radio" name="questionKyc" value="false" id="false" required="required"
                                    />
                                }
                                <label htmlFor="no">no</label>
                            </div>
                        </label>






                        <br />
                        <input className="btn btn-primary btn-block" id="submitInput" type="submit" />
                    </form >
                </div>
            </div>
            <FooterComponent />
        </div >






    )
}

export default Edition;