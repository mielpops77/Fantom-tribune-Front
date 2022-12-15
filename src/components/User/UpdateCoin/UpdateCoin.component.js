
import UpdateCoinService from "../../../services/User/UpdateCoin.service";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import AuthService from "../../../services/auth/auth.service";
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import style from "./UpdateCoin.module.scss";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Select from 'react-select'
import axios from "axios";


const UpdateCoin = () => {
    const [urlUpload2, setUrlUpload2] = useState('');
    const [typeSelected, setTypeSelected] = useState({});
    const [typeInitial, setTypeInitial] = useState({});
    const [fieldOpen, setFieldOpen] = useState({});
    const [urlUpload, setUrlUpload] = useState('');
    const [field, setField] = useState(false);
    const [inputs, setInputs] = useState({
        name: "",
        symbol: "",
        launchDate: "",
        contractAddress: "",
        description: "",
        websiteLink: "",
        coinMarketCapLink: "",
        telegram: "",
        twitter: "",
        discord: "",
        comment: "",
        imageEdit: ""
    });
    const [items, setItems] = useState([]);
    const [prev, setPrev] = useState('');
    const [kyc, setKyc] = useState('');
    const [logo, setLogo] = useState('');
    const [idProject, setIdProject] = useState('');

    const [user, setUser] = useState([]);



    const styleBox = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '30%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const url = AuthService.getUrl();
    const navigate = useNavigate();


    function login() {
        navigate(`/login/`);
    }


    const initForm = {
        name: "",
        symbol: "",
        launchDate: "",
        contractAddress: "",
        description: "",
        websiteLink: "",
        coinMarketCapLink: "",
        telegram: "",
        twitter: "",
        discord: "",
        comment: ""
    };


    const options = [
        { label: "Select Field", value: "Select-field" },
        { label: "Logo", value: "Logo" },
        { label: "Name", value: "Name" },
        { label: "Symbol", value: "Symbol" },
        { label: "Launch phase?", value: "Launch-phase" },
        { label: "Contract Address", value: "Contract-address" },
        { label: "Description", value: "Description" },
        { label: "Type", value: "Type" },
        { label: "Website link", value: "Website-link" },
        { label: "Telegram link", value: "Telegram-link" },
        { label: "Discord link", value: "Discord-link" },
        { label: "Twitter link", value: "Twitter-link" },
        { label: " Coinmarketcap link", value: "Coinmarketcap-link" },
        { label: "Kyc?", value: "Kyc" },
    ];

    const optionsType = [
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



    useEffect(() => {
        getSearchCoinRequest('');
        setUser(AuthService.getCurrentUser());
        UpdateCoinService.initFieldOpenFlexible();
        setFieldOpen(UpdateCoinService.getFieldOpenFlexible());
    }, []);



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


    function nav(path) {
        navigate(path);
    }

    const handleSubmit = (event) => {
        if (user !== null) {
            let typeEdit = "";
            if (typeSelected.value !== typeInitial.value) {
                typeEdit = typeSelected.value;
            }
            // event.preventDefault();
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nameEdit: inputs.name, symbolEdit: inputs.symbol, launchDateEdit: inputs.launchDate, contractAddressEdit: inputs.contractAddress, descriptionEdit: inputs.description, typeEdit: typeEdit, websiteLinkEdit: inputs.websiteLink, coinMarketCapLinkEdit: inputs.coinMarketCapLink, telegramEdit: inputs.telegram, twitterEdit: inputs.twitter, discordEdit: inputs.discord, kycEdit: kyc, imageEdit: inputs.imageEdit, image: logo, idProject: idProject, comment: inputs.comment
                })
            };
            fetch(url + 'updateNew', requestOptions)
                .then(response => response.json(), nav(`/ValidationForm/Update`)
                )
        }
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }





    const handleOnSearch = (string, results) => {
        UpdateCoinService.initFieldOpenFlexible();
        setFieldOpen(UpdateCoinService.getFieldOpenFlexible());
        setField(false);
        setInputs({
            name: "",
            symbol: "",
            launchDate: "",
            contractAddress: "",
            description: "",
            websiteLink: "",
            coinMarketCapLink: "",
            telegram: "",
            twitter: "",
            discord: "",
            comment: "",
            imageEdit: ""
        });
        getSearchCoinRequest(string);



    }

    const handleOnHover = (result) => {
    }

    const handleOnSelect = (item) => {
        getSearchCoinById(item.id);
        setIdProject(item.id)
        setField(true);
        setTypeSelected({ label: item.type, value: item.type })
        setTypeInitial({ label: item.type, value: item.type });
    }

    const handleOnFocus = () => {
    }

    const formatResult = (item) => {
        return (
            <>
                <span className={style.updateCoin_search}>  <img className={style.updateCoin_img} src={url + item.image} alt='img' />  <span className={style.updateCoin_nameSearch}>{item.name}</span> 	<mat-chip>
                    <label htmlFor="chip-1">{item.symbol}</label>
                </mat-chip></span>
            </>
        )
    }





    function getSearchCoinById(id) {
        const pattern = "projetsValidadOnly"
        return axios.get(AuthService.getUrl() + `searchById?id=${id}&pattern=${pattern}`)
            .then(response => {
                setLogo(response.data[0].image);
                setUrlUpload("vide");
                setKyc(response.data[0].kyc.toString());
                prevCheck(response.data[0].launchDate);
                return response.data;
            })
    }

/*     const handleChangeFile = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
        upload();
    }
 */

    const upload = (event) => {
        event.preventDefault()
        const inputImg = document.querySelector("input[type=file]");
        if(inputImg !== null)
        {
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
                    setUrlUpload(url + inputImg.files.item(0).name);
                    handleSubmit()
                })
                .catch(function (response) {
                    //handle error
                });
        }
    }

        else
        {
            handleSubmit();
        }

    }
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


    function handleSelect(event) {
        // setSelected({});
        UpdateCoinService.setFieldOpenFlexible(event, true);
        setFieldOpen(UpdateCoinService.getFieldOpenFlexible());


    }

    function handleSelectType(event) {
        setTypeSelected(event);
    }

    function removeField(event) {
        if(event == "Logo") {setUrlUpload2("")}
        UpdateCoinService.setFieldOpenFlexible(event, false);
        setFieldOpen(UpdateCoinService.getFieldOpenFlexible());

    }

    var previewPicture = function (event) {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
        // var image = document.getElementById("image");
        // e.files contient un objet FileList
        const [picture] = event.target.files
        // "picture" est un objet File
        if (picture) {
            // On change l'URL de l'image
            // image.src = URL.createObjectURL(picture)
            setUrlUpload2(URL.createObjectURL(picture));
        }
    }


    return (
        <div >
            <div className={style.updateCoin_formulaire}>

                <label className={style.updateCoin_formLabel}>Select the token listing you want to update.

                </label>
                <ReactSearchAutocomplete
                    styling={
                        {

                            border: "1px solid #ccc",
                            width: "50% !important",
                        }
                    }
                    items={items}
                    onSearch={handleOnSearch}
                    onHover={handleOnHover}
                    onSelect={handleOnSelect}
                    onFocus={handleOnFocus}
                    autoFocus
                    formatResult={formatResult}
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
                />
            </div>

            {field && <form className={style.updateCoin_formulaire} onSubmit={upload}>
                <label className={style.updateCoin_formLabel}> Select which field you want to update.:
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        /* defaultValue={options[0]} */
                        /*  isClearable={true} */
                        defaultValue={options[0]}
                        isSearchable={true}
                        options={options}
                        value={options[0]}
                        onChange={handleSelect}
                        selectOption="required"
                    />

                </label>


                {fieldOpen.logo &&
                    <label className={style.updateCoin_formLabelFileEmpty} htmlFor="file-input">
                        <div className={style.updateCoin_formLabel}>Logo Upload</div>
                        <img style={{ height: "100%", float: "left", maxWidth: "30%", maxHeight: "30%", cursor: 'pointer' }} src={url + "assets/upload.png"} alt='img' />
                        {urlUpload2 !== "" &&
                            <img style={{ height: "100%", float: "left", maxWidth: "25%", maxHeight: "25%" }} src={urlUpload2} alt='img' />
                        }
                    </label>}
                {fieldOpen.logo &&
                    <input id="file-input" className={style.updateCoin_file} type="file" name="imageEdit"
                        onChange={previewPicture}
                        accept="image/png, image/jpeg"
                    >
                    </input>}
                {fieldOpen.logo &&
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a className={style.updateCoin_removeField} onClick={function (event) { removeField("Logo") }} >Remove this field</a>}

                {fieldOpen.name &&
                    <label className={style.updateCoin_formLabel}>Name:
                        <input className={style.updateCoin_formInput}
                            type="text"
                            name="name"
                            value={inputs.name || initForm.name}
                            onChange={handleChange}
                        />
                    </label>}
                {fieldOpen.name &&
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a className={style.updateCoin_removeField} onClick={function (event) { removeField("Name") }} >Remove this field</a>}

                {fieldOpen.symbole &&
                    <label className={style.updateCoin_formLabel}>Symbol:
                        <input className={style.updateCoin_formInput}
                            type="text"
                            name="symbol"
                            value={inputs.symbol || initForm.symbol}
                            onChange={handleChange}
                        ></input>
                    </label>}

                {fieldOpen.symbole &&
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a className={style.updateCoin_removeField} onClick={function (event) { removeField("Symbol") }} >Remove this field</a>}

                {fieldOpen.launchPhase &&
                    <label className={style.updateCoin_formLabel}>Project in the launch phase?:
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
                    </label>}

                {fieldOpen.launchPhase && <div>
                    {
                        prev === "yes" && <label className={style.updateCoin_formLabel}>LaunchDate (UTC):
                            <input className={style.updateCoin_formInput}
                                type="date"
                                name="launchDate"
                                min={dateUtc}
                                value={inputs.launchDate || initForm.launchDate}
                                onChange={handleChange}
                            />
                        </label>
                    }


                    {
                        prev === "no" && <label className={style.updateCoin_formLabel}>LaunchDate (UTC):
                            <input className={style.updateCoin_formInput}
                                type="date"
                                name="launchDate"
                                max={dateUtcMax}
                                value={inputs.launchDate || initForm.launchDate}
                                onChange={handleChange}
                            />
                        </label>
                    }
                    {fieldOpen.launchPhase &&
                        // eslint-disable-next-line jsx-a11y/anchor-is-valid
                        <a className={style.updateCoin_removeField} onClick={function (event) { removeField("Launch-phase") }} >Remove this field</a>}

                </div>}

                {fieldOpen.contractAdress &&
                    <label className={style.updateCoin_formLabel}>Contract Address:
                        <input className={style.updateCoin_formInput}
                            type="text"
                            name="contractAddress"
                            value={inputs.contractAddress || initForm.contractAddress}
                            onChange={handleChange}
                        />

                    </label>
                }
                {fieldOpen.contractAdress &&
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a className={style.updateCoin_removeField} onClick={function (event) { removeField("Contract-address") }} >Remove this field</a>}
                {fieldOpen.description &&
                    <label className={style.updateCoin_formLabel}>Description:
                        <textarea className={style.updateCoin_formInput} style={{
                            maxHeight: "40em",
                            minHeight: "8em"
                        }}
                            type="text"
                            name="description"
                            value={inputs.description || initForm.description}
                            onChange={handleChange}
                            required="required"
                        />
                    </label>}

                {fieldOpen.description &&
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a className={style.updateCoin_removeField} onClick={function (event) { removeField("Description") }} >Remove this field</a>}
                {fieldOpen.type &&
                    <label className={style.updateCoin_formLabel}>Type:
                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            value={typeSelected || initForm.type}
                            isSearchable={true}
                            options={optionsType}
                            onChange={handleSelectType}
                            selectOption="required"
                        />

                    </label>}
                {fieldOpen.type &&
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a className={style.updateCoin_removeField} onClick={function (event) { removeField("Type") }} >Remove this field</a>}
                {fieldOpen.website &&
                    <label className={style.updateCoin_formLabel}>Website link:
                        <input className={style.updateCoin_formInput}
                            type="text"
                            name="websiteLink"
                            value={inputs.websiteLink || initForm.websiteLink}
                            onChange={handleChange}
                            required="required"
                        />
                    </label>}

                {fieldOpen.website &&
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a className={style.updateCoin_removeField} onClick={function (event) { removeField("Website-link") }} >Remove this field</a>}

                {fieldOpen.coinMarketCapLink &&
                    <label className={style.updateCoin_formLabel}>Coinmarketcap link:
                        <input className={style.updateCoin_formInput}
                            type="text"
                            name="coinMarketCapLink"
                            value={inputs.coinMarketCapLink || initForm.coinMarketCapLink}
                            onChange={handleChange} />
                    </label>
                }

                {fieldOpen.coinMarketCapLink &&
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a className={style.updateCoin_removeField} onClick={function (event) { removeField("Coinmarketcap-link") }} >Remove this field</a>}

                {fieldOpen.telegram &&
                    <label className={style.updateCoin_formLabel}>Telegram link:
                        <input className={style.updateCoin_formInput}
                            type="text"
                            name="telegram"
                            value={inputs.telegram || initForm.telegram}
                            onChange={handleChange}>
                        </input>
                    </label>
                }
                {fieldOpen.telegram &&
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a className={style.updateCoin_removeField} onClick={function (event) { removeField("Telegram-link") }} >Remove this field</a>}

                {fieldOpen.twitter &&
                    <label className={style.updateCoin_formLabel}>Twitter link:
                        <input className={style.updateCoin_formInput}
                            type="text"
                            name="twitter"
                            value={inputs.twitter || initForm.twitter}
                            onChange={handleChange}
                            required="required" />
                    </label>}
                {fieldOpen.twitter &&
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a className={style.updateCoin_removeField} onClick={function (event) { removeField("Twitter-link") }} >Remove this field</a>}

                {fieldOpen.discord &&
                    <label className={style.updateCoin_formLabel}>Discord link:
                        <input className={style.updateCoin_formInput}
                            type="text"
                            name="discord"
                            value={inputs.discord || initForm.discord}
                            onChange={handleChange} />
                    </label>
                }
                {fieldOpen.discord &&
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a className={style.updateCoin_removeField} onClick={function (event) { removeField("Discord-link") }} >Remove this field</a>}

                {fieldOpen.kyc &&
                    <label className={style.updateCoin_formLabel}>Kyc? :
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
                }
                {fieldOpen.kyc &&
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a className={style.updateCoin_removeField} onClick={function (event) { removeField("Kyc") }} >Remove this field</a>}

                {fieldOpen.comment &&
                    <label className={style.updateCoin_formLabel}>Comment:
                        <textarea className={style.updateCoin_formInput} style={{
                            maxHeight: "40em",
                            minHeight: "8em"
                        }}
                            type="text"
                            name="comment"
                            value={inputs.comment || initForm.comment}
                            onChange={handleChange}
                            required="required"
                        />
                    </label>}
                <br />
                <br />
                {fieldOpen.comment &&
                    <input className="btn btn-primary btn-block" style={{ margin: " 0 auto", display: "block" }} id="submitInput" type="submit" />

                }
            </form >}


            <Modal
                open={user == null}
                /* onClose={handleClose} */
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleBox}>
                    <Typography className={style.typo} id="modal-modal-title" variant="h6" component="h2">
                        You must be logged in to be able to submit a new project
                    </Typography>
                    <br />
                    <button style={{ width: "100%" }} className="btn btn-success" onClick={login}>login</button>
                </Box>
            </Modal>
        </div>

    )
}


export default UpdateCoin;



