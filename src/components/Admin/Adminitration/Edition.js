import NavigationAdminComponent from '../../Navigation/NavigationAdmin/NavigationAdmin.component';
import FooterComponent from '../../../components/Navigation/Footer/Footer.component';
import editionService from "../../../services/admin/editionAdmin.service";
import AuthService from "../../../services/auth/auth.service";
import React, { useState, useEffect } from 'react';
import style from "./Edition.module.scss";
import Select from 'react-select'
import axios from 'axios';

const Edition = () => {
    const [selected, setSelected] = useState(null);

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


    const [inputs, setInputs] = useState({});
    const [urlUpload, setToggle] = useState('');



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
                url: { url } + "images",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (response) {
                    //handle success
                    setToggle({ url } + inputImg.files.item(0).name);
                })
                .catch(function (response) {
                    //handle error
                });
        }
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }


    const handleSubmit = (event) => {
        editionService.initType();
        console.log(editionService.getType());
        event.preventDefault();
        let type = [];
        if (selected === null) {
            type = editionService.getType();
        }
        else {
            type = selected;
        }
        console.log('selected', selected);
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: inputs.name, symbol: inputs.symbol, launchDate: inputs.launchDate, contractAddress: inputs.contractAddress, description: inputs.description, type: type.value,
                websiteLink: inputs.websiteLink, telegram: inputs.telegram, twitter: inputs.twitter, discord: inputs.discord, image: inputs.image
            })
        };
        fetch(url + `adminEdit/${id}`, requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ postId: data.id }));
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
                        console.log('hmmmm', editionService.getType());
                        setToggle(url + editionService.getCoin().image);

                    }
                }

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
                                value={inputs.name || editionService.getCoin().name}
                                onChange={handleChange}
                            />
                        </label>
                        <label className={style.formLabel}>Symbol*:
                            <input className={style.formInput}
                                type="text"
                                name="symbol"
                                value={inputs.symbol || editionService.getCoin().symbol}
                                onChange={handleChange}
                            ></input>
                        </label>




                        <label className={style.formLabel}>LaunchDate (UTC)*:
                            <input className={style.formInput}
                                type="date"
                                name="launchDate"
                                value={inputs.launchDate || editionService.getCoin().launchDate}
                                onChange={handleChange}
                            />
                        </label>


                        <label className={style.formLabel}>Contract Address:
                            <input className={style.formInput}
                                type="text"
                                name="contractAddress"
                                value={inputs.contractAddress || editionService.getCoin().contractAddress}
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
                                value={inputs.description || editionService.getCoin().description}
                                onChange={handleChange}
                                required="required"
                            />
                        </label>

                        <label className={style.formLabel}>Type*:
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                value={selected || editionService.getType()}
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
                                value={inputs.websiteLink || editionService.getCoin().websiteLink}
                                onChange={handleChange}
                                required="required"
                            />
                        </label>

                        <label className={style.formLabel}>Telegram link:
                            <input className={style.formInput}
                                type="text"
                                name="telegram"
                                value={inputs.telegram || editionService.getCoin().telegram}
                                onChange={handleChange}>
                            </input>
                        </label>


                        <label className={style.formLabel}>Twitter link*:
                            <input className={style.formInput}
                                type="text"
                                name="twitter"
                                value={inputs.twitter || editionService.getCoin().twitter}
                                onChange={handleChange}
                                required="required" />
                        </label>


                        <label className={style.formLabel}>Discord link:
                            <input className={style.formInput}
                                type="text"
                                name="discord"
                                value={inputs.discord || editionService.getCoin().discord}
                                onChange={handleChange} />
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