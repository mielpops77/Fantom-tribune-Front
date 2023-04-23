import TableLaunchService from "../../../services/tableauLaunh/tableauLaunch.service";
import editionService from "../../../services/admin/editionAdmin.service";
import AuthService from "../../../services/auth/auth.service";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from "./Edition.module.scss";
import Select from 'react-select'
import axios from 'axios';

const EditionUser = () => {

    const [imgChange, setImgChange] = useState(false);
    const [selected, setSelected] = useState(null);
    const [inputs, setInputs] = useState({
    });
    const [inputsEdit, setInputsEdit] = useState({
        comment: "",
        coinMarketCapLinkEdit: "",
        contractAddressEdit: "",
        contractAddress: "",
        descriptionEdit: "",
        discordEdit: "",
        facebookEdit: "",
        mediumEdit: "",
        githubEdit: "",
        whitePaperEdit: "",
        instaEdit: "",
        redditEdit: "",
        tiktokEdit: "",
        idProject: "",
        imageEdit: "",
        kycEdit: "",
        auditEdit: "",
        launchDateEdit: "",
        launchDateHourEdit: "",
        nameEdit: "",
        symbolEdit: "",
        telegramEdit: "",
        twitterEdit: "",
        typeEdit: "",
        websiteLinkEdit: "",
        kycProofEdit: "",
        auditProofEdit: ""

    });
    const [urlUpload, setToggle] = useState('');
    const [prev, setPrev] = useState('');
    const [kyc, setKyc] = useState('');
    const [audit, setAudit] = useState('');
    const [stat, setStat] = useState({
        name: "",
        symbol: "",
        launchDate: "",
        launchDateHour: "",
        contractAddress: "",
        description: "",
        websiteLink: "",
        coinMarketCapLink: "",
        telegram: "",
        twitter: "",
        discord: "",
        facebook: "",
        medium: "",
        github: "",
        whitePaper: "",
        insta: "",
        reddit: "",
        tiktok: "",
        kycProof: "",
        auditProof: ""

    });

    const [statType, setStatType] = useState("");
    let a = "pouet"
    let navigate = useNavigate();
    const url = AuthService.getUrl();

    //let date = new Date()
    //let today = date.toISOString().split('T')[0];

    let path = window.location.href;
    const id = path.substring(34, path.length);


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


    const customStyles = {
        control: (base, state) => ({
            ...base,
            background: "yellow",
            // match with the menu
            borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
            // Overwrittes the different states of border
            borderColor: state.isFocused ? "yellow" : "green",
            // Removes weird border around container
            boxShadow: state.isFocused ? null : null,
            "&:hover": {
                // Overwrittes the different states of border
                borderColor: state.isFocused ? "red" : "blue"
            }
        }),
        menu: base => ({
            ...base,
            // override border radius to match the box
            borderRadius: 0,
            // kill the gap
            marginTop: 0
        }),
        menuList: base => ({
            ...base,
            // kill the white space on first and last option
            padding: 0
        })
    };

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
    const auditChange = (event) => {
        setAudit(event.target.value);
    }

    function prevCheck(dateProject) {
        if (dateProject >= dateUtc) {
            setPrev("yes");
        }
        else {
            setPrev("no");


        }

    }


    /*     const handleChangeFile = (event) => {
            const name = event.target.name;
            const value = event.target.value;
            setInputs(values => ({ ...values, [name]: value }))
            upload();
        }
     */


    /*     const upload = () => {
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
                        setToggle(url + inputImg.files.item(0).name);
                    })
                    .catch(function (response) {
                    });
            } 
        }*/

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
                TableLaunchService.coinmarketCap(editionService.getIdProject(), slug, editionService.getCoinMarketCapLink(), editionService.getCoin().coinMarketCapStatus, editionService.getCoin().idCoinMarketCap);
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
                name: inputs.name, symbol: inputs.symbol, launchDate: inputs.launchDate, launchDateHour: inputs.launchDateHour, contractAddress: inputs.contractAddress,
                description: inputs.description, type: type.value, websiteLink: inputs.websiteLink, telegram: inputs.telegram, twitter: inputs.twitter, discord: inputs.discord,
                image: inputs.image, coinMarketCapLink: inputs.coinMarketCapLink, coinMarketCapStatus: editionService.getMarketCapStatus(), kyc: kyc, kycProof: inputs.kycProof, audit: audit, auditProof: inputs.auditProof,
                facebook: inputs.facebook, medium: inputs.medium, github: inputs.github, whitePaper: inputs.whitePaper, insta: inputs.insta, reddit: inputs.reddit, tiktok: inputs.tiktok
            })
        };
        let imageDelete = ""
        if (imgChange) { imageDelete = editionService.getCoin().image }
        fetch(url + `adminEditUser?id=${editionService.getIdProject()}&imageDelete=${imageDelete}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (imgChange) { updateDelete(inputs.image, "") }
                navigate("/administration")
            });
    }



    function handleSelect(event) {
        setSelected(event);
    }

    function searchUpdateById(id) {
        return axios.get(AuthService.getUrl() + `updateSearchById?id=${id}`)
            .then(response => {
                console.log('herf', response.data)
                setInputsEdit(response.data[0]);
                editionService.initIdProject();
                editionService.setIdProject(response.data[0].idProject);
                getSearchCoinById(response.data[0].idProject);
                return response.data;
            })
    }


    function getSearchCoinById(id) {
        const pattern = "allProjects"
        return axios.get(AuthService.getUrl() + `searchById?id=${id}&pattern=${pattern}`)
            .then(response => {
                editionService.initCoin();
                editionService.initType();
                editionService.setCoin(response.data[0]);
                editionService.setType({ label: response.data[0].type, value: response.data[0].type },);

                setToggle(url + editionService.getCoin().image);
                setStat(editionService.getCoin());
                setStatType(editionService.getType());
                editionService.initMarketCapStatus();
                editionService.setMarketCapStatus(editionService.getCoin().coinMarketCapStatus);

                console.log("haaaaaaaaaaaaaaaaaaaaaaa", editionService.getCoin());
                prevCheck(editionService.getCoin().launchDate);
                setKyc(editionService.getCoin().kyc.toString());
                setAudit(editionService.getCoin().audit.toString());
                return response.data;
            })
    }

    function changeImage(event) {
        event.preventDefault();
        setImgChange(true);
        const name = "image";
        const value = inputsEdit.imageEdit;
        setInputs(values => ({ ...values, [name]: value }))
        setToggle(url + inputsEdit.imageEdit);
    }


    useEffect(() => {
        console.log('inputsEdit', inputsEdit.auditEdit.toString())
        searchUpdateById(id);
    }, [id]);




    let updateDelete = (idImage, idImageEdit) => {


        fetch(url + `updateDelete/${id}`, {
            method: "Put",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: idImage, imageEdit: idImageEdit })
        })
            .then((res) => res.json())

    };


    return (

        <div>
            <div className={style.divCorpSubmit}>
                <h1 className={style.titleSubmit}>Modify a coin to Fantom Tribune</h1>
                <p className={style.subtitleSubmit}>Here you can edit projects</p>
                <hr></hr>
                <div>
                    <form className={style.formulaireSubmit} onSubmit={handleSubmit}>


                        {inputsEdit.comment !== "" &&
                            <label className={style.formLabel}>Comment:
                                <textarea className={style.formInputUpdate} style={{
                                    maxHeight: "40em",
                                    minHeight: "8em"
                                }}
                                    type="text"
                                    name="Comment:"
                                    value={inputsEdit.comment}
                                    onChange={handleChange}
                                    required="required"
                                />
                            </label>}

                        <label className={style.formLabelFileEmpty} htmlFor="file-input">
                            <div className={style.formLabel}>Logo Upload*</div>
                            {/* <img style={{ height: "100%", float: "left", maxWidth: "30%", maxHeight: "30%", cursor: 'pointer' }} src={url + "assets/upload.png"} alt='img' /> */}
                            <img style={{ height: "100%", float: "left", maxWidth: "25%", maxHeight: "25%" }} src={urlUpload} alt='img' />
                        </label>
                        {inputsEdit.imageEdit !== "" &&
                            <button onClick={changeImage} className="btn btn-success">Attribuer la nouvelle image</button>
                        }
                        {/*   <input id="file-input" className={style.file} type="file" name="image" value={inputs.image || ""}
                            onChange={handleChangeFile}
                            accept="image/png, image/jpeg"
                        >
                        </input> */}
                        {inputsEdit.imageEdit !== "" &&
                            <label className={style.formLabelFileEmpty} htmlFor="file-input">
                                <div className={style.formLabel}>Logo Update</div>
                                <img style={{ height: "100%", float: "left", maxWidth: "25%", maxHeight: "25%" }} src={(url + inputsEdit.imageEdit)} alt='img' />
                            </label>
                        }
                        <label className={style.formLabel}>Name*:
                            <input className={style.formInput}
                                type="text"
                                name="name"
                                value={inputs.name || stat.name}
                                onChange={handleChange}
                            />
                        </label>
                        {inputsEdit.nameEdit !== "" &&
                            <label className={style.formLabel}>Name*:
                                <input className={style.formInputUpdate}
                                    type="text"
                                    name="name"
                                    defaultValue={inputsEdit.nameEdit}
                                />
                            </label>}
                        <label className={style.formLabel}>Symbol*:
                            <input className={style.formInput}
                                type="text"
                                name="symbol"
                                value={inputs.symbol || stat.symbol}
                                onChange={handleChange}
                            ></input>
                        </label>

                        {inputsEdit.symbolEdit !== "" &&
                            <label className={style.formLabel}>Symbol*:
                                <input className={style.formInputUpdate}
                                    type="text"
                                    name="name"
                                    defaultValue={inputsEdit.symbolEdit}
                                />
                            </label>}




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
                        {
                            prev === "yes" &&
                            <label htmlFor="appt-time" className={style.formLabel}>Presale time (UTC)*:
                                <input className={style.formInput}
                                    id="appt-time"
                                    type="time"
                                    name="launchDateHour"
                                    value={inputs.launchDateHour || stat.launchDateHour}
                                    onChange={handleChange}
                                />

                            </label>}


                        {inputsEdit.launchDateEdit !== "" &&
                            <label className={style.formLabel}>LaunchDate (UTC)*:
                                <input className={style.formInputUpdate}
                                    type="date"
                                    name="launchDate"
                                    /* min={dateUtc} */
                                    defaultValue={inputsEdit.launchDateEdit}
                                />
                            </label>}



                        {
                            inputsEdit.launchDateHourEdit !== "" &&
                            <label htmlFor="appt-time" className={style.formLabel}>Presale time (UTC)*:
                                <input className={style.formInputUpdate}
                                    id="appt-time"
                                    type="time"
                                    name="launchDateHourEdit"
                                    defaultValue={inputsEdit.launchDateHourEdit}
                                />

                            </label>}




                        <label className={style.formLabel}>Contract Address:
                            <input className={style.formInput}
                                type="text"
                                name="contractAddress"
                                value={inputs.contractAddress || stat.contractAddress}
                                onChange={handleChange}
                            />

                        </label>

                        {inputsEdit.contractAddressEdit !== "" &&
                            <label className={style.formLabel}>Contract Address:
                                <input className={style.formInputUpdate}
                                    type="text"
                                    name="contractAddress"
                                    defaultValue={inputsEdit.contractAddressEdit}
                                />

                            </label>}

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
                        {inputsEdit.typeEdit !== "" &&
                            <label className={style.formLabel}>Type*:
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    value={{ label: inputsEdit.typeEdit, value: inputsEdit.typeEdit }}
                                    isSearchable={true}
                                    options={options}
                                    /* value={selected} */
                                    selectOption="required"
                                    styles={customStyles}
                                />
                            </label>}

                        {inputsEdit.descriptionEdit !== "" &&
                            <label className={style.formLabel}>Description*:
                                <textarea className={style.formInput} style={{
                                    maxHeight: "40em",
                                    minHeight: "8em"
                                }}
                                    type="text"
                                    name="description"
                                    maxLength={500}
                                    value={inputs.description || stat.description}
                                    onChange={handleChange}
                                    required="required"
                                />
                            </label>}

                        {inputsEdit.descriptionEdit !== "" &&
                            <label className={style.formLabel}>Description*:
                                <textarea className={style.formInputUpdate} style={{
                                    maxHeight: "40em",
                                    minHeight: "8em"
                                }}
                                    type="text"
                                    name="description"
                                    maxLength={500}
                                    defaultValue={inputsEdit.descriptionEdit}
                                    required="required"
                                />
                            </label>
                        }


                        <label className={style.formLabel}>Website link*:
                            <input className={style.formInput}
                                type="text"
                                name="websiteLink"
                                value={inputs.websiteLink || stat.websiteLink}
                                onChange={handleChange}
                                required="required"
                            />
                        </label>
                        {inputsEdit.websiteLinkEdit !== "" &&
                            <label className={style.formLabel}>Website link*:
                                <input className={style.formInputUpdate}
                                    type="text"
                                    name="websiteLink"
                                    defaultValue={inputsEdit.websiteLinkEdit}
                                    required="required"
                                />
                            </label>
                        }

                        <label className={style.formLabel}>coinmarketcap link:
                            <input className={style.formInput}
                                type="text"
                                name="coinMarketCapLink"
                                value={inputs.coinMarketCapLink || stat.coinMarketCapLink}
                                onChange={handleChange} />
                        </label>

                        {inputsEdit.coinMarketCapLinkEdit !== "" &&
                            <label className={style.formLabel}>coinmarketcap link:
                                <input className={style.formInputUpdate}
                                    type="text"
                                    name="coinMarketCapLink"
                                    defaultValue={inputsEdit.coinMarketCapLinkEdit}
                                />
                            </label>
                        }


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
                        {inputsEdit.telegramEdit !== "" &&
                            <label className={style.formLabel}>Telegram link:
                                <input className={style.formInputUpdate}
                                    type="text"
                                    name="telegram"
                                    defaultValue={inputsEdit.telegramEdit}
                                >
                                </input>
                            </label>}


                        <label className={style.formLabel}>Twitter link*:
                            <input className={style.formInput}
                                type="text"
                                name="twitter"
                                value={inputs.twitter || stat.twitter}
                                onChange={handleChange}
                                required="required" />
                        </label>

                        {inputsEdit.twitterEdit !== "" &&
                            <label className={style.formLabel}>Twitter link*:
                                <input className={style.formInputUpdate}
                                    type="text"
                                    name="twitter"
                                    defaultValue={inputsEdit.twitterEdit}
                                    required="required" />
                            </label>}



                        <label className={style.formLabel}>Discord link:
                            <input className={style.formInput}
                                type="text"
                                name="discord"
                                value={inputs.discord || stat.discord}
                                onChange={handleChange} />
                        </label>
                        {inputsEdit.discordEdit !== "" &&
                            <label className={style.formLabel}>Discord link:
                                <input className={style.formInputUpdate}
                                    type="text"
                                    name="discord"
                                    defaultValue={inputsEdit.discordEdit}
                                />
                            </label>}


                        {/*       facebook: "",
                        medium: "",
                        github: "",
                        whitePaper: "",
                        insta: "",
                        reddit: "",
                        tiktok: "", */}
                        <label className={style.formLabel}>Facebook link:
                            <input className={style.formInput}
                                type="text"
                                name="facebook"
                                value={inputs.facebook || stat.facebook}
                                onChange={handleChange} />
                        </label>
                        {inputsEdit.facebookEdit !== "" &&
                            <label className={style.formLabel}>Facebook link:
                                <input className={style.formInputUpdate}
                                    type="text"
                                    name="facebook"
                                    defaultValue={inputsEdit.facebookEdit}
                                />
                            </label>}

                        <label className={style.formLabel}>Medium link:
                            <input className={style.formInput}
                                type="text"
                                name="medium"
                                value={inputs.medium || stat.medium}
                                onChange={handleChange} />
                        </label>
                        {inputsEdit.mediumEdit !== "" &&
                            <label className={style.formLabel}>Medium link:
                                <input className={style.formInputUpdate}
                                    type="text"
                                    name="medium"
                                    defaultValue={inputsEdit.mediumEdit}
                                />
                            </label>}

                        <label className={style.formLabel}>github link:
                            <input className={style.formInput}
                                type="text"
                                name="github"
                                value={inputs.github || stat.github}
                                onChange={handleChange} />
                        </label>
                        {inputsEdit.githubEdit !== "" &&
                            <label className={style.formLabel}>Github link:
                                <input className={style.formInputUpdate}
                                    type="text"
                                    name="github"
                                    defaultValue={inputsEdit.githubEdit}
                                />
                            </label>}

                        <label className={style.formLabel}>WhitePaper link:
                            <input className={style.formInput}
                                type="text"
                                name="whitePaper"
                                value={inputs.whitePaper || stat.whitePaper}
                                onChange={handleChange} />
                        </label>
                        {inputsEdit.whitePaperEdit !== "" &&
                            <label className={style.formLabel}>WhitePaper link:
                                <input className={style.formInputUpdate}
                                    type="text"
                                    name="whitePaper"
                                    defaultValue={inputsEdit.whitePaperEdit}
                                />
                            </label>}

                        <label className={style.formLabel}>Insta link:
                            <input className={style.formInput}
                                type="text"
                                name="insta"
                                value={inputs.insta || stat.insta}
                                onChange={handleChange} />
                        </label>
                        {inputsEdit.instaEdit !== "" &&
                            <label className={style.formLabel}>Insta link:
                                <input className={style.formInputUpdate}
                                    type="text"
                                    name="insta"
                                    defaultValue={inputsEdit.instaEdit}
                                />
                            </label>}

                        <label className={style.formLabel}>Reddit link:
                            <input className={style.formInput}
                                type="text"
                                name="reddit"
                                value={inputs.reddit || stat.reddit}
                                onChange={handleChange} />
                        </label>
                        {inputsEdit.redditEdit !== "" &&
                            <label className={style.formLabel}>Reddit link:
                                <input className={style.formInputUpdate}
                                    type="text"
                                    name="reddit"
                                    defaultValue={inputsEdit.redditEdit}
                                />
                            </label>}

                        <label className={style.formLabel}>Tiktok link:
                            <input className={style.formInput}
                                type="text"
                                name="tiktok"
                                value={inputs.tiktok || stat.tiktok}
                                onChange={handleChange} />
                        </label>
                        {inputsEdit.tiktokEdit !== "" &&
                            <label className={style.formLabel}>Tiktok link:
                                <input className={style.formInputUpdate}
                                    type="text"
                                    name="tiktok"
                                    defaultValue={inputsEdit.tiktokEdit}
                                />
                            </label>}

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

                        {inputsEdit.kycEdit.toString() !== kyc &&
                            <label className={style.formLabel}>Kyc? *:
                                <div>
                                    {
                                        inputsEdit.kycEdit.toString() === "true" &&
                                        < input readOnly type="radio" name="questionKycEdit" value="true" id="true" required="required" checked
                                        />}
                                    {
                                        inputsEdit.kycEdit.toString() === "false" &&
                                        <input readOnly type="radio" name="questionKycEdit" value="true" id="true" required="required"
                                        />}
                                    <label style={{ marginRight: "1%", color: "red" }} htmlFor="yes">yes</label>

                                    {
                                        inputsEdit.kycEdit.toString() === "false" &&
                                        <input readOnly type="radio" name="questionKycEdit" value="false" id="false" required="required" checked
                                        />
                                    }
                                    {
                                        inputsEdit.kycEdit.toString() === "true" &&
                                        <input readOnly type="radio" name="questionKycEdit" value="false" id="false" required="required"
                                        />
                                    }
                                    <label style={{ color: "red" }} htmlFor="no">no</label>
                                </div>
                            </label>}


                        {
                            kyc === "true" &&
                            <label className={style.formLabel}>Kyc proof Link
                                <input className={style.formInput}
                                    type="text"
                                    name="kycProof"
                                    value={inputs.kycProof || stat.kycProof}
                                    onChange={handleChange} />
                            </label>}

                        {inputsEdit.kycProofEdit !== "" &&
                            <label className={style.formLabel}>kyc proof Link
                                <input className={style.formInputUpdate}
                                    type="text"
                                    name="kycProofEdit"
                                    defaultValue={inputsEdit.kycProofEdit}
                                />
                            </label>}















                        <label className={style.formLabel}>Audit? *:
                            <div>
                                {
                                    audit === "true" &&
                                    < input onChange={auditChange} type="radio" name="questionAudit" value="true" id="true" required="required" checked
                                    />}
                                {
                                    audit === "false" &&
                                    <input onChange={auditChange} type="radio" name="questionAudit" value="true" id="true" required="required"
                                    />}
                                <label style={{ marginRight: "1%" }} htmlFor="yes">yes</label>

                                {
                                    audit === "false" &&
                                    <input onChange={auditChange} type="radio" name="questionAudit" value="false" id="false" required="required" checked
                                    />
                                }
                                {
                                    audit === "true" &&
                                    <input onChange={auditChange} type="radio" name="questionAudit" value="false" id="false" required="required"
                                    />
                                }
                                <label htmlFor="no">no</label>
                            </div>
                        </label>
                        <p>{console.log("heeeeeeeeey", inputsEdit)}</p>

                        {inputsEdit.auditEdit.toString() !== audit &&
                            <label className={style.formLabel}>audit? *:
                                <div>
                                    {
                                        inputsEdit.auditEdit.toString() === "true" &&
                                        < input readOnly type="radio" name="questionAuditEdit" value="true" id="true" required="required" checked
                                        />}
                                    {
                                        inputsEdit.auditEdit.toString() === "false" &&
                                        <input readOnly type="radio" name="questionAuditEdit" value="true" id="true" required="required"
                                        />}
                                    <label style={{ marginRight: "1%", color: "red" }} htmlFor="yes">yes</label>

                                    {
                                        inputsEdit.auditEdit.toString() === "false" &&
                                        <input readOnly type="radio" name="questionAuditEdit" value="false" id="false" required="required" checked
                                        />
                                    }
                                    {
                                        inputsEdit.auditEdit.toString() === "true" &&
                                        <input readOnly type="radio" name="questionAuditEdit" value="false" id="false" required="required"
                                        />
                                    }
                                    <label style={{ color: "red" }} htmlFor="no">no</label>
                                </div>
                            </label>}


                        {
                            audit === "true" &&
                            <label className={style.formLabel}>Audit proof Link
                                <input className={style.formInput}
                                    type="text"
                                    name="auditProof"
                                    value={inputs.auditProof || stat.auditProof}
                                    onChange={handleChange} />
                            </label>}

                        {inputsEdit.auditProofEdit !== "" &&
                            <label className={style.formLabel}>audit proof Link
                                <input className={style.formInputUpdate}
                                    type="text"
                                    name="auditProofEdit"
                                    defaultValue={inputsEdit.auditProofEdit}
                                />
                            </label>}


                        <br />
                        <input className="btn btn-primary btn-block" id="submitInput" type="submit" />
                    </form >
                </div>
            </div>
            {/* <FooterComponent /> */}
        </div >


    )
}

export default EditionUser;