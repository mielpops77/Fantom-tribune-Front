import AuthService from "../../../services/auth/auth.service";
import React, { useState, useEffect, useRef } from 'react';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import style from "./FormulaireNft.module.scss";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from 'axios';

function FormulaireNft() {


    const url = AuthService.getUrl();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const [urlUpload2, setUrlUpload2] = useState('');
    const [verifUpl, setVerifUpl] = useState('');
    const [urlUpload, setToggle] = useState('');
    const [prev, setPrev] = useState('');

    const [user, setUser] = useState([]);

    const [paintswap, setPaintswap] = useState('');
    const [collectionFound, setCollectionFound] = useState('');
    // const [collection, setCollection] = useState([]);

    const [isSubmit, setIsSubmit] = useState(false);

    const navigate = useNavigate();



    useEffect(() => {
        setUser(AuthService.getCurrentUser());

    }, [])


    function nav(path) {
        navigate(path);
    }

    if (urlUpload !== '' && !verifUpl) {
        setVerifUpl(true);
    }

    function login() {
        navigate(`/login/`);
    }

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



    let date = new Date();
    let mondayUtc = (date.getUTCMonth() + 1)
    mondayUtc = parseInt(mondayUtc);
    let dayUtc = date.getUTCDate();
    dayUtc = parseInt(dayUtc);

    if (mondayUtc < 10) {
        mondayUtc = '0' + mondayUtc.toString()
    }

    if (dayUtc < 10) {
        dayUtc = '0' + dayUtc.toString()
    }
    let voteTodayUtc = [];

    let dateUtc = date.getFullYear() + '-' + mondayUtc + '-' + dayUtc;
    voteTodayUtc[0] = dateUtc;
    /* let today = date.toISOString().split('T')[0]; */

    function addDaysToDate(date, days) {
        let res = new Date(date);
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



    let pointsCacul = { twentyHourCalcul: [] }



    for (let i = 0; i < 24; i++) {
        pointsCacul.twentyHourCalcul.push({
            day: 0,
            hour: 0,
            vote: 0,
            website: 0,
            discord: 0,
            telegram: 0,
            twitter: 0,
            page: 0,
            buy: 0
        })

    }


    let statistique = {
        global: {
            vote: 0,
            website: 0,
            discord: 0,
            telegram: 0,
            twitter: 0,
            page: 0,
            buy: 0
        },
        twentyHour:
        {
            vote: 0,
            website: 0,
            discord: 0,
            telegram: 0,
            twitter: 0,
            page: 0,
            buy: 0
        }


    }



    const [inputs, setInputs] = useState({});

    const upload = async (event) => { // ajout du mot clé async pour gérer les promesses
        console.log('haaaaaaaaaaaaaaaaaaaaaaaaaaaaa');


        event.preventDefault();


        if (isSubmit !== "yes") {

            if (paintswap !== "yes") {
                console.log('goooooooooooooooo')
                const inputImg = document.querySelector("input[type=file]");
                const fileCount = inputImg.files.length; // utilisation de const plutôt que let car la valeur ne sera pas modifiée
                if (fileCount > 0) {
                    const formData = new FormData();
                    formData.append('image', inputImg.files.item(0));
                    try { // utilisation de try...catch pour gérer les erreurs
                        const response = await axios({
                            method: "post",
                            url: url + "images",
                            data: formData,
                            headers: { "Content-Type": "multipart/form-data" },
                        });

                        setToggle(url + inputImg.files.item(0).name);
                        handleSubmit();
                    } catch (error) {
                        console.error(error);
                    }
                }
            }
            else {
                handleSubmit();
            }
        }
    };


    function searchPaintswap() {

        fetch(`https://api.paintswap.finance/v2/collections/${inputs.address}`)
            .then((res) => res.json())
            .then((res) => {
                if (res.error == "Collection not found") {
                    setCollectionFound('false')
                }
                else {
                    console.log(res.collection);
                    setCollectionFound('true');
                    // setInputs(res.collection);
                    setInputs(values => ({ ...values, ["telegram"]: "https://t.me/" + res.collection.telegram.replace("@", "") }))
                    setInputs(values => ({ ...values, ["twitter"]: "https://twitter.com/" + res.collection.twitter.replace("@", "") }))
                    setInputs(values => ({ ...values, ["reddit"]: "https://www.reddit.com/" + res.collection.reddit }))

                    setInputs(values => ({ ...values, ["name"]: res.collection.name }));
                    setInputs(values => ({ ...values, ["websiteLink"]: res.collection.website }));
                    setInputs(values => ({ ...values, ["medium"]: res.collection.medium }));
                    setInputs(values => ({ ...values, ["discord"]: res.collection.discord }));
                    setInputs(values => ({ ...values, ["description"]: res.collection.description }));



                    const date = new Date(res.collection.createdAt);
                    const formattedDate = date.toISOString().split('T')[0];
                    setInputs(values => ({ ...values, ["launchDate"]: formattedDate }));




                    if (res.collection.thumbnail !== undefined || res.collection.thumbnail !== "") {
                        setInputs(values => ({ ...values, ["thumbnail"]: res.collection.thumbnail }));
                        setVerifUpl(true);
                        setPrev('no')
                    }

                    setInputs(values => ({ ...values, ["banner"]: res.collection.banner }));
                    setInputs(values => ({ ...values, ["poster"]: res.collection.poster }));


                }
            })
    }




    const handleChange = (event) => {
        const { name, value } = event.target;
        const newValue = name === "name" || name === "description" ? value.charAt(0).toUpperCase() + value.slice(1) : value;
        const isValidNumber = true;
        if (isValidNumber) {
            // Met à jour les valeurs des champs dans le state "inputs"
            setInputs((prevState) => ({
                ...prevState,
                [name]: newValue,
            }));
        }
    };



    const prevente = (event) => {
        setPrev(event.target.value);
    }

    const paintswapChange = (event) => {

        setInputs(values => ({ ...values, ["paintswap"]: event.target.value === "yes" }));

        setCollectionFound('');

        setPaintswap(event.target.value);
        if (event.target.value == "no") {
            setInputs([]);
        }
    }



    function handleSubmit() {


        setFormSubmitted(true);

        if (!inputs.name) {
            return;
        }

        if (user !== null) {

            if (inputs.launchDate === undefined) {
                if (prev === 'yes') {
                    inputs.launchDate = dateUtc;
                }
                if (prev === 'no') {
                    inputs.launchDate = dateUtcMax;
                }
            }






            // eslint-disable-next-line no-unused-expressions








            let contractAddress = inputs.address;

            if (inputs.address !== undefined) {
                contractAddress = contractAddress.toLowerCase();
            }
            else { contractAddress = "none" }

            const paintswapValue = paintswap === "yes" ? true : false;


            const body = {
                name: inputs.name, launchDate: inputs.launchDate, contractAddress: contractAddress, description: inputs.description,
                websiteLink: inputs.websiteLink, telegram: inputs.telegram, twitter: inputs.twitter, discord: inputs.discord,
                points: 0, pointsTwentyHour: 0, pointsCacul: pointsCacul, price: 0, marketCap: 0, supply: 0, percent_change_24h: 0, promotedStatus: false,
                emailCrea: user.email, usernameCrea: user.username, statistique: statistique, launchDateHour: inputs.launchDateHour,
                presale: prev, facebook: inputs.facebook, medium: inputs.medium, insta: inputs.insta,
                tiktok: inputs.tiktok, reddit: inputs.reddit, category: "nft", paintswap: paintswapValue,type:"Nft"
            };


            if (paintswap === "yes") {
                body.thumbnail = inputs.thumbnail;
                body.banner = inputs.banner;
                body.poster = inputs.poster;
              } else {
                body.image = inputs.image;
              }
              



            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            };


            fetch(url + 'launchDate', requestOptions)
                .then((response) => response.json())
                .then((res) => {
                    /*  if (inputs.coinMarketCapLink !== undefined) {
                         const searchTerm = '/currencies/'
                         const slug = coinMarketCapLink.substring(coinMarketCapLink.lastIndexOf(searchTerm) + 12, coinMarketCapLink.length - 1);
                         TableLaunchService.coinmarketCap(res._id, slug, coinMarketCapLink);
                     } */
                    nav(`/ValidationForm/Submit`);
                });
        }

    }



    function verifUpload() {
        // Scroll au début de la page
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Vérifie si le champ "image" est rempli
        setVerifUpl(inputs.thumbnail !== undefined);

        // Définit l'état "formSubmitted" sur true pour afficher les erreurs
        setFormSubmitted(true);

        // Vérifie si le champ "Name" est rempli
        if (!inputs.name) {
            setErrors(errors => ({ ...errors, name: "Le champ 'Name' est obligatoire" }));
        } else {
            // Efface l'erreur précédente du champ "Name" s'il est rempli
            setErrors(errors => ({ ...errors, name: "" }));
        }


        if (!inputs.description) {
            setErrors(errors => ({ ...errors, description: "Le champ 'Description' est obligatoire" }));
        } else {
            setErrors(errors => ({ ...errors, description: "" }));
        }
        if (!inputs.twitter) {
            setErrors(errors => ({ ...errors, twitter: "Le champ 'Twitter link' est obligatoire" }));
        } else {
            setErrors(errors => ({ ...errors, twitter: "" }));
        }

        if (!inputs.address) {
            setErrors(errors => ({ ...errors, address: "Le champ 'ContractAddress' est obligatoire" }));
        } else {
            setErrors(errors => ({ ...errors, address: "" }));
        }


        if (prev == "") {
            setErrors(errors => ({ ...errors, question: "Le champ 'Launch phase' est obligatoire" }));
        } else {
            setErrors(errors => ({ ...errors, question: "" }));
        }




        if (paintswap == "") {
            setErrors(errors => ({ ...errors, questionPaintswap: "Le champ 'Paintswap' est obligatoire" }));
        } else {
            setErrors(errors => ({ ...errors, questionPaintswap: "" }));
        }

        setIsSubmit(true);


    }

    /*     if(inputs.name)
        if (formSubmitted && name === "name" && !value) {
          setErrors((errors) => ({
            ...errors,
            name: "Le champ 'Name' est obligatoire",
          }));
        } else {
          setErrors((errors) => ({ ...errors, [name]: "" }));
        } */


    // La fonction previewPicture
    let previewPicture = function (event) {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
        const [picture] = event.target.files
        if (picture) {
            // On change l'URL de l'image
            // image.src = URL.createObjectURL(picture)
            setUrlUpload2(URL.createObjectURL(picture));
        }
    }

    return (

        <div>



            <form className={style.formulaireNeftSubmit} onSubmit={upload}>

                <label className={style.formLabel}>Is the nft already listed on paintswap?*:
                    <div>
                        <input onChange={paintswapChange} type="radio" name="questionPaintswap" value="yes" id="yes" required="required"
                        /> <label style={{ marginRight: "1%" }} htmlFor="yes">yes</label>
                        <input onChange={paintswapChange} type="radio" name="questionPaintswap" value="no" id="no" required="required"
                        /> <label htmlFor="no">no</label>
                    </div>
                    {formSubmitted && paintswap == "" && errors.question && (
                        <span className={style.errorMessage}>{errors.questionPaintswap}</span>
                    )}
                </label>

                {
                    paintswap === "yes" &&
                    <label className={style.formLabel}>Contract Address* :
                        <div className={style.inputWrapper}>
                            <input className={style.formInputContract}
                                type="text"
                                name="address"
                                value={inputs.address || ""}
                                onChange={handleChange}
                                maxLength={42}
                                required="required"

                            />
                            <button onClick={searchPaintswap} className={style.searchButton}>
                                Rechercher
                            </button>
                        </div>
                        {collectionFound == "false" && (
                            <span className={style.errorMessagePaintswap}>collection not found try check contract Address
                            </span>
                        )}
                        {formSubmitted && !inputs.address && errors.address && (
                            <span className={style.errorMessage}>{errors.address}</span>
                        )}
                    </label>}









                {
                    verifUpl === false && (paintswap == "no") && <div className={style.messageError} style={{ marginTop: "1rem" }}>
                        Please upload the logo for your coin.
                    </div>}

                {(paintswap == "no" || (paintswap == 'yes' && collectionFound == "true")) &&
                    <label className={style.formLabelFileEmpty} htmlFor="file-input">
                        <div className={style.formLabel}>Logo Upload*</div>
                        {paintswap == "no" &&
                            <img alt='img' style={{ height: "100%", float: "left", maxWidth: "30%", maxHeight: "30%", cursor: 'pointer' }} src={url + "assets/upload.png"} />
                        }
                        {(urlUpload2 !== '' && paintswap == "no") && <img alt='img' style={{ height: "100%", float: "left", maxWidth: "25%", maxHeight: "25%" }} src={urlUpload2} />}
                        {(urlUpload2 == '' && inputs.thumbnail !== undefined && paintswap == 'yes') && <img alt='img' style={{ height: "100%", float: "left", maxWidth: "25%", maxHeight: "25%" }} src={inputs.thumbnail} />}

                    </label>
                }
                {paintswap == "no" &&
                    <input id="file-input" className={style.file} type="file" name="image" value={inputs.image || ""}
                        onChange={previewPicture}
                        accept="image/png, image/jpeg"
                        required="required"
                    >
                    </input>}




                {(paintswap == 'yes' && collectionFound == "true") &&
                    <label className={style.formLabelFileEmpty} htmlFor="file-input">
                        <div className={style.formLabel}>Banner Upload*</div>
                        {(inputs.banner !== undefined && paintswap == 'yes') && <img alt='img' style={{ height: "100%", float: "left", maxWidth: "100%", maxHeight: "100%" }} src={inputs.banner} />}

                    </label>
                }

                {(paintswap == 'yes' && collectionFound == "true") &&
                    <label className={style.formLabelFileEmpty} htmlFor="file-input">
                        <div className={style.formLabel}>Poster Upload*</div>
                        {(inputs.banner !== undefined && paintswap == 'yes') && <img alt='img' style={{ height: "100%", float: "left", maxWidth: "25%", maxHeight: "25%" }} src={inputs.poster} />}

                    </label>
                }


                {(paintswap == "no" || (paintswap == 'yes' && collectionFound == "true")) &&
                    <label className={style.formLabel}>Name* :
                        <input className={style.formInput}
                            type="text"
                            name="name"
                            value={inputs.name || ""}

                            onChange={handleChange}
                            required="required"
                            maxLength={15}
                        />
                        {formSubmitted && !inputs.name && errors.name && (
                            <span className={style.errorMessage}>{errors.name}</span>
                        )}
                    </label>
                }


                {(paintswap == "no" || (paintswap == 'yes' && collectionFound == "true")) &&
                    <label className={style.formLabel}>Nft in mint phase?*:
                        <div>

                            <input onChange={prevente} type="radio" name="question" value="yes" id="yes" required="required"
                            /> <label style={{ marginRight: "1%" }} htmlFor="yes">yes</label>
                            {paintswap == "yes" && <input onChange={prevente} type="radio" name="question" value="no" id="no" required="required" checked
                            />}
                            {paintswap == "no" && <input onChange={prevente} type="radio" name="question" value="no" id="no" required="required"
                            />}
                            <label htmlFor="no">no</label>
                        </div>
                        {formSubmitted && prev == "" && errors.question && (
                            <span className={style.errorMessage}>{errors.question}</span>
                        )}
                    </label>
                }
                {
                    prev === "yes" && (paintswap == "no" || (paintswap == 'yes' && collectionFound == "true")) && <label className={style.formLabel}>LaunchDate (UTC)*:
                        <input className={style.formInput}
                            type="date"
                            name="launchDate"
                            min={dateUtc}
                            value={inputs.launchDate || dateUtc}
                            onChange={handleChange}
                        />
                    </label>
                }

                {
                    prev === "no" && (paintswap == "no" || (paintswap == 'yes' && collectionFound == "true")) && <label className={style.formLabel}>LaunchDate (UTC)*:
                        <input className={style.formInput}
                            type="date"
                            name="launchDate"
                            max={dateUtcMax}
                            value={inputs.launchDate || dateUtcMax}
                            onChange={handleChange}
                        />
                    </label>
                }

                {
                    prev === "yes" && (paintswap == "no" || (paintswap == 'yes' && collectionFound == "true")) &&
                    <label htmlFor="appt-time" className={style.formLabel}>Presale time (UTC)*:
                        <input className={style.formInput}
                            id="appt-time"
                            type="time"
                            name="launchDateHour"
                            // value="13:30"
                            value={inputs.launchDateHour || ""}
                            onChange={handleChange}
                        />

                    </label>}


                {(paintswap == "no" || (paintswap == 'yes' && collectionFound == "true")) &&
                    <label className={style.formLabel}>Description* :
                        <textarea className={style.formInput} style={{
                            maxHeight: "40em",
                            minHeight: "8em"
                        }}
                            type="text"
                            name="description"
                            value={inputs.description || ""}
                            onChange={handleChange}
                            required="required"
                            maxLength={500}
                        />

                        {formSubmitted && !inputs.description && errors.description && (
                            <span className={style.errorMessage}>{errors.description}</span>
                        )}
                    </label>}
                {/* 
                <label className={style.formLabel}>Type*:
                    <Select

                        styles={{
                            option: (provided) => ({
                                ...provided,
                                color: 'black',
                            }),
                        }}
                        className="basic-single"
                        classNamePrefix="select"
                        color="red"
                        defaultValue={options[0]}
                        isSearchable={true}
                        options={options}
                        onChange={setSelected}
                        selectOption="required"
                    />

                </label> */}



                {/*     <label className={style.formLabel}>Type*:
        <MultiSelect
          className={style.multiSelect}
          options={options}
          value={selected}
          hasSelectAll={false}
          onChange={setSelected}
          labelledBy="Select"
          required="required"
        />

      </label>
 */}
                {(paintswap == "no" || (paintswap == 'yes' && collectionFound == "true")) &&
                    <label className={style.formLabel}>Website link :
                        <input className={style.formInput}
                            type="text"
                            name="websiteLink"
                            value={inputs.websiteLink || ""}
                            onChange={handleChange}
                            maxLength={50}
                        />
                    </label>}


                {(paintswap == "no" || (paintswap == 'yes' && collectionFound == "true")) &&
                    <label className={style.formLabel}>Telegram link :
                        <input className={style.formInput}
                            type="text"
                            name="telegram"
                            value={inputs.telegram || ""}
                            onChange={handleChange}
                            maxLength={50}
                        >

                        </input>
                    </label>}


                {(paintswap == "no" || (paintswap == 'yes' && collectionFound == "true")) &&
                    <label className={style.formLabel}>Twitter link* :
                        <input className={style.formInput}
                            type="text"
                            name="twitter"
                            value={inputs.twitter || ""}
                            onChange={handleChange}
                            required="required"
                            maxLength={50}
                        />
                        {formSubmitted && !inputs.twitter && errors.twitter && (
                            <span className={style.errorMessage}>{errors.twitter}</span>
                        )}

                    </label>}

                {(paintswap == "no" || (paintswap == 'yes' && collectionFound == "true")) &&
                    <label className={style.formLabel}>Medium link :
                        <input className={style.formInput}
                            type="text"
                            name="medium"
                            value={inputs.medium || ""}
                            onChange={handleChange}
                            maxLength={50}
                        >

                        </input>
                    </label>}



                {(paintswap == "no" || (paintswap == 'yes' && collectionFound == "true")) &&
                    <label className={style.formLabel}>Facebook link :
                        <input className={style.formInput}
                            type="text"
                            name="facebook"
                            value={inputs.facebook || ""}
                            onChange={handleChange}
                            maxLength={50}
                        >

                        </input>
                    </label>}

                {(paintswap == "no" || (paintswap == 'yes' && collectionFound == "true")) &&
                    <label className={style.formLabel}>Instagram link :
                        <input className={style.formInput}
                            type="text"
                            name="insta"
                            value={inputs.insta || ""}
                            onChange={handleChange}
                            maxLength={50}
                        >

                        </input>
                    </label>}

                {(paintswap == "no" || (paintswap == 'yes' && collectionFound == "true")) &&
                    <label className={style.formLabel}>Reddit link :
                        <input className={style.formInput}
                            type="text"
                            name="reddit"
                            value={inputs.reddit || ""}
                            onChange={handleChange}
                            maxLength={50}
                        >

                        </input>
                    </label>}

                {(paintswap == "no" || (paintswap == 'yes' && collectionFound == "true")) &&
                    <label className={style.formLabel}>Tiktok link :
                        <input className={style.formInput}
                            type="text"
                            name="tiktok"
                            value={inputs.tiktok || ""}
                            onChange={handleChange}
                            maxLength={50}
                        >

                        </input>

                    </label>}

                {(paintswap == "no" || (paintswap == 'yes' && collectionFound == "true")) &&
                    <label className={style.formLabel}>Discord link :
                        <input className={style.formInput}
                            type="text"
                            name="discord"
                            value={inputs.discord || ""}
                            maxLength={50}
                            onChange={handleChange} />
                    </label>}


                <br />
                <input className={style.blueButton} type="submit" onClick={verifUpload} />
            </form >




            <Modal
                open={user == null}
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

export default FormulaireNft; 