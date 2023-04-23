import TableLaunchService from '../../../services/tableauLaunh/tableauLaunch.service'
import AuthService from "../../../services/auth/auth.service";
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import style from "./Formulaire.module.scss";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Select from 'react-select'
import axios from 'axios';

function Formulaire() {


  const url = AuthService.getUrl();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const [urlUpload2, setUrlUpload2] = useState('');
  const [selected, setSelected] = useState('Dex');
  const [verifUpl, setVerifUpl] = useState('');
  const [urlUpload, setToggle] = useState('');
  const [audit, setAudit] = useState('');
  const [prev, setPrev] = useState('');
  const [user, setUser] = useState([]);
  const [kyc, setKyc] = useState('');


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
  let type = 'Dex';

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

  let listePriceIdCoinMarketCap = {
    priceId: [
      {
        price: 0,
        id: 0,
      }
    ]
  };




  let pointsCacul = { twentyHourCalcul: [] }



  for (let i = 0; i < 24; i++) {
    pointsCacul.twentyHourCalcul.push({
      day: 0,
      hour: 0,
      vote: 0,
      coinMarketCap: 0,
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
      coinMarketCap: 0,
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
      coinMarketCap: 0,
      website: 0,
      discord: 0,
      telegram: 0,
      twitter: 0,
      page: 0,
      buy: 0
    }


  }

  const options = [
    { label: "Dex", value: "Dex" },
    { label: "Gaming", value: "Gaming" },
    { label: "Lending", value: "Lending" },
    { label: "Algo-Stables", value: "Algo-Stables" },
    { label: "Derivatives", value: "Derivatives" },
    { label: "Yield Aggregatort", value: "Yield Aggregatort" },
    { label: "Reflect token", value: "Reflect token" },
    { label: "Yield", value: "Yield" },
    { label: "Bridge", value: "Bridge" },
  ];


  const [inputs, setInputs] = useState({});

  const upload = async (event) => { // ajout du mot clé async pour gérer les promesses
    event.preventDefault();

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
  };


  const handleChange = (event) => {
    const { name, value } = event.target;

    // Transforme la première lettre en majuscule pour les champs "name" et "description"
    // Transforme toutes les lettres en majuscule pour le champ "symbol"
    const newValue =
      name === "name" || name === "description"
        ? value.charAt(0).toUpperCase() + value.slice(1)
        : name === "symbol"
          ? value.toUpperCase()
          : value;

    // Vérifie si les champs "capMax", "capMin", "buyTax" et "sellTax" ne contiennent que des chiffres
    const isValidNumber =
      name === "capMax" || name === "capMin" || name === "buyTax" || name === "sellTax"
        ? /^\d*$/.test(value)
        : true;

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

  const kycEdit = (event) => {
    setKyc(event.target.value);
  }

  const auditEdit = (event) => {
    setAudit(event.target.value);
  }

  /*   const handleChangeFile = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({ ...values, [name]: value }))
      upload();
    }
   */
  function handleSubmit() {

    console.log("heeey");

    setFormSubmitted(true);

    if (!inputs.name) {
      return;
    }

    if (user !== null) {
      let coinMarketCapLink;
      let coinMarketCapStatus;

      if (inputs.coinMarketCapLink === undefined) {
        coinMarketCapLink = 'none';
        coinMarketCapStatus = 'none';
      }
      else {
        coinMarketCapStatus = "en cours de validation"


        // const searchTerm = '/currencies/'
        // const slug = inputs.coinMarketCapLink.substring(inputs.coinMarketCapLink.lastIndexOf(searchTerm) + 12, inputs.coinMarketCapLink.length - 1)
        if (!inputs.coinMarketCapLink.endsWith('/')) {
          coinMarketCapLink = inputs.coinMarketCapLink + '/';

        }
        else {

          coinMarketCapLink = inputs.coinMarketCapLink;

        }
        // TableLaunchService.coinmarketCap(slug, coinMarketCapLink);
      }
      if (inputs.launchDate === undefined) {
        if (prev === 'yes') {
          inputs.launchDate = dateUtc;
        }
        if (prev === 'no') {
          inputs.launchDate = dateUtcMax;
        }
      }

      if (selected === null || selected === 'Dex') {
        type = 'Dex'
      }
      else {
        type = selected.value;
      }


      if (inputs.capMaxToken === undefined) {
        inputs.capMaxToken = '$';
      }

      if (inputs.capMinToken === undefined) {
        inputs.capMinToken = '$';
      }



      // eslint-disable-next-line no-unused-expressions
      // audit ? requestOptions.body.auditProof = inputs.auditProof : null;








      let contractAddress = inputs.contractAddress;

      if (inputs.contractAddress !== undefined) {
        contractAddress = contractAddress.toLowerCase();
      }
      else { contractAddress = "none" }

      const body = {
        name: inputs.name, symbol: inputs.symbol, launchDate: inputs.launchDate, contractAddress: contractAddress, description: inputs.description, type: type,
        websiteLink: inputs.websiteLink, coinMarketCapLink: coinMarketCapLink, telegram: inputs.telegram, twitter: inputs.twitter, discord: inputs.discord,
        image: inputs.image, points: 0, pointsTwentyHour: 0, pointsCacul: pointsCacul, price: 0, marketCap: 0, supply: 0, coinMarketCapStatus: coinMarketCapStatus,
        idCoinMarketCap: 0, listePriceIdCoinMarketCap: listePriceIdCoinMarketCap, percent_change_24h: 0, promotedStatus: false, kyc: kyc,
        emailCrea: user.email, usernameCrea: user.username, statistique: statistique, kycProof: inputs.kycProof, launchDateHour: inputs.launchDateHour,
        capMax: inputs.capMax, capMin: inputs.capMin, capMaxToken: inputs.capMaxToken, capMinToken: inputs.capMinToken, presale: prev,
        facebook: inputs.facebook, medium: inputs.medium, github: inputs.github, whitePaper: inputs.whitePaper, insta: inputs.insta,
        tiktok: inputs.tiktok, reddit: inputs.reddit, audit: audit, auditProof: inputs.auditProof, buyTax: inputs.buyTax, sellTax: inputs.sellTax, category: "token"
      };


      if (audit == "no") {
        delete body.auditProof
      }
      if (kyc == "no") {
        delete body.kycProof
      }

      if (type !== "Reflect token") {
        delete body.sellTax;
        delete body.buyTax;

      }




      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      };


      fetch(url + 'launchDate', requestOptions)
        .then((response) => response.json())
        .then((res) => {
          if (inputs.coinMarketCapLink !== undefined) {
            const searchTerm = '/currencies/'
            const slug = coinMarketCapLink.substring(coinMarketCapLink.lastIndexOf(searchTerm) + 12, coinMarketCapLink.length - 1);
            TableLaunchService.coinmarketCap(res._id, slug, coinMarketCapLink);
          }
          nav(`/ValidationForm/Submit`);
        });
    }

  }



  function verifUpload() {
    // Scroll au début de la page
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Vérifie si le champ "image" est rempli
    setVerifUpl(inputs.image !== undefined);

    // Définit l'état "formSubmitted" sur true pour afficher les erreurs
    setFormSubmitted(true);

    // Vérifie si le champ "Name" est rempli
    if (!inputs.name) {
      setErrors(errors => ({ ...errors, name: "Le champ 'Name' est obligatoire" }));
    } else {
      // Efface l'erreur précédente du champ "Name" s'il est rempli
      setErrors(errors => ({ ...errors, name: "" }));
    }

    // Vérifie si le champ "Symbol" est rempli
    if (!inputs.symbol) {
      setErrors(errors => ({ ...errors, symbol: "Le champ 'Symbol' est obligatoire" }));
    } else {
      // Efface l'erreur précédente du champ "Symbol" s'il est rempli
      setErrors(errors => ({ ...errors, symbol: "" }));
    }
    if (!inputs.description) {
      setErrors(errors => ({ ...errors, description: "Le champ 'Description' est obligatoire" }));
    } else {
      // Efface l'erreur précédente du champ "Symbol" s'il est rempli
      setErrors(errors => ({ ...errors, description: "" }));
    }
    if (!inputs.twitter) {
      setErrors(errors => ({ ...errors, twitter: "Le champ 'Twitter link' est obligatoire" }));
    } else {
      // Efface l'erreur précédente du champ "Symbol" s'il est rempli
      setErrors(errors => ({ ...errors, twitter: "" }));
    }

    if (!inputs.contractAddress) {
      setErrors(errors => ({ ...errors, contractAddress: "Le champ 'ContractAddress' est obligatoire" }));
    } else {
      // Efface l'erreur précédente du champ "Symbol" s'il est rempli
      setErrors(errors => ({ ...errors, contractAddress: "" }));
    }
    if (!inputs.auditProof) {
      setErrors(errors => ({ ...errors, auditProof: "Le champ 'AuditProof' est obligatoire" }));
    } else {
      // Efface l'erreur précédente du champ "Symbol" s'il est rempli
      setErrors(errors => ({ ...errors, auditProof: "" }));
    }
    if (!inputs.kycProof) {
      setErrors(errors => ({ ...errors, kycProof: "Le champ 'KycProof' est obligatoire" }));
    } else {
      // Efface l'erreur précédente du champ "Symbol" s'il est rempli
      setErrors(errors => ({ ...errors, kycProof: "" }));
    }
    if (prev == "") {
      setErrors(errors => ({ ...errors, question: "Le champ 'Launch phase' est obligatoire" }));
    } else {
      // Efface l'erreur précédente du champ "Symbol" s'il est rempli
      setErrors(errors => ({ ...errors, question: "" }));
    }

    if (kyc == "") {
      setErrors(errors => ({ ...errors, questionKyc: "Le champ 'Kyc' est obligatoire" }));
    } else {
      // Efface l'erreur précédente du champ "Symbol" s'il est rempli
      setErrors(errors => ({ ...errors, questionKyc: "" }));
    }

    if (audit == "") {
      setErrors(errors => ({ ...errors, questionAudit: "Le champ 'Audit' est obligatoire" }));
    } else {
      // Efface l'erreur précédente du champ "Symbol" s'il est rempli
      setErrors(errors => ({ ...errors, questionAudit: "" }));
    }



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



      <form className={style.formulaireSubmit} onSubmit={upload}>

        {/* <input type="file" name="picture" onChange={previewPicture} required />
        <img src={urlUpload2} alt="" id="image" style={{ height: "100%", float: "left", maxWidth: "25%", maxHeight: "25%" }} /> */}
        {
          verifUpl === false && <div className={style.messageError} style={{ marginTop: "1rem" }}>
            Please upload the logo for your coin.
          </div>}

        <label className={style.formLabelFileEmpty} htmlFor="file-input">
          <div className={style.formLabel}>Logo Upload*</div>
          <img alt='img' style={{ height: "100%", float: "left", maxWidth: "30%", maxHeight: "30%", cursor: 'pointer' }} src={url + "assets/upload.png"} />
          {urlUpload2 !== '' && <img alt='img' style={{ height: "100%", float: "left", maxWidth: "25%", maxHeight: "25%" }} src={urlUpload2} />}
        </label>

        <input id="file-input" className={style.file} type="file" name="image" value={inputs.image || ""}
          onChange={previewPicture}
          accept="image/png, image/jpeg"
          required="required"
        >
        </input>

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
        <label className={style.formLabel}>Symbol* :
          <input className={style.formInput}
            type="text"
            name="symbol"
            value={inputs.symbol || ""}
            onChange={handleChange}
            required="required"
            maxLength={10}
          />
          {formSubmitted && !inputs.symbol && errors.symbol && (
            <span className={style.errorMessage}>{errors.symbol}</span>
          )}
        </label>





        <label className={style.formLabel}>Project in the launch phase?*:
          <div>

            <input onChange={prevente} type="radio" name="question" value="yes" id="yes" required="required"
            /> <label style={{ marginRight: "1%" }} htmlFor="yes">yes</label>
            <input onChange={prevente} type="radio" name="question" value="no" id="no" required="required"
            /> <label htmlFor="no">no</label>
          </div>
          {formSubmitted && prev == "" && errors.question && (
            <span className={style.errorMessage}>{errors.question}</span>
          )}
        </label>

        {
          prev === "yes" && <label className={style.formLabel}>LaunchDate (UTC)*:
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
          prev === "no" && <label className={style.formLabel}>LaunchDate (UTC)*:
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
          prev === "yes" &&
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


        {
          prev === "yes" &&
          <div className={style.inline}>
            <label className={style.formLabel2}>Token Sale Hard CapMax Fund Raising Goal:
              <input className={style.formInput2}
                type="text"
                name="capMax"
                value={inputs.capMax || ""}
                onChange={handleChange}
                maxLength={20}


              /></label>
            <label className={style.formLabel2}> Token Sale Hard Cap Currency:
              <select className={style.formInput2}
                type="text"
                name="capMaxToken"
                // value={inputs.websiteLink || ""}
                onChange={handleChange}
              > <option value="$">$</option>
                <option value="FTM">FTM</option></select></label>

          </div>}

        {
          prev === "yes" &&
          <div className={style.inline}>
            <label className={style.formLabel2}>Token Sale Soft CapMinimum amount required:
              <input className={style.formInput2}
                type="text"
                name="capMin"
                value={inputs.capMin || ""}
                onChange={handleChange}
                maxLength={20}
              /></label>
            <label className={style.formLabel2}>Token Sale Soft Cap Currency:
              <select className={style.formInput2}
                type="text"
                name="capMinToken"
                // value={inputs.websiteLink || ""}
                onChange={handleChange}
              > <option value="$">$</option>
                <option value="FTM">FTM</option></select></label>

          </div>}

        {
          prev === "no" &&
          <label className={style.formLabel}>Contract Address* :
            <input className={style.formInput}
              type="text"
              name="contractAddress"
              value={inputs.contractAddress || ""}
              onChange={handleChange}
              maxLength={42}
              required="required"

            />
            {formSubmitted && !inputs.contractAddress && errors.contractAddress && (
              <span className={style.errorMessage}>{errors.contractAddress}</span>
            )}
          </label>}

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
        </label>

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
            /* defaultValue={options[0]} */
            /*  isClearable={true} */
            color="red"
            defaultValue={options[0]}
            isSearchable={true}
            options={options}
            /* value={selected} */
            onChange={setSelected}
            selectOption="required"
          />

        </label>
        {
          selected.value == "Reflect token" &&
          <label className={style.formLabel}>BuyTax :
            <input className={style.formInput}
              type="text"
              name="buyTax"
              value={inputs.buyTax || ""}
              onChange={handleChange}
              maxLength={20}
            >

            </input>
          </label>
        }
        {
          selected.value == "Reflect token" &&
          <label className={style.formLabel}>SellTax :
            <input className={style.formInput}
              type="text"
              name="sellTax"
              value={inputs.sellTax || ""}
              onChange={handleChange}
              maxLength={20}
            >

            </input>
          </label>}

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
        <label className={style.formLabel}>Website link :
          <input className={style.formInput}
            type="text"
            name="websiteLink"
            value={inputs.websiteLink || ""}
            onChange={handleChange}
            maxLength={50}
          />
        </label>

        {
          prev === "no" &&
          <label className={style.formLabel}>coinmarketcap link :
            <input className={style.formInput}
              type="text"
              name="coinMarketCapLink"
              value={inputs.coinMarketCapLink || ""}
              onChange={handleChange}
              maxLength={90} />

          </label>}

        <label className={style.formLabel}>Telegram link :
          <input className={style.formInput}
            type="text"
            name="telegram"
            value={inputs.telegram || ""}
            onChange={handleChange}
            maxLength={50}
          >

          </input>
        </label>


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

        </label>

        <label className={style.formLabel}>Medium link :
          <input className={style.formInput}
            type="text"
            name="medium"
            value={inputs.medium || ""}
            onChange={handleChange}
            maxLength={50}
          >

          </input>
        </label>



        <label className={style.formLabel}>Facebook link :
          <input className={style.formInput}
            type="text"
            name="facebook"
            value={inputs.facebook || ""}
            onChange={handleChange}
            maxLength={50}
          >

          </input>
        </label>
        <label className={style.formLabel}>Instagram link :
          <input className={style.formInput}
            type="text"
            name="insta"
            value={inputs.insta || ""}
            onChange={handleChange}
            maxLength={50}
          >

          </input>
        </label>
        <label className={style.formLabel}>Reddit link :
          <input className={style.formInput}
            type="text"
            name="reddit"
            value={inputs.reddit || ""}
            onChange={handleChange}
            maxLength={50}
          >

          </input>
        </label>
        <label className={style.formLabel}>Tiktok link :
          <input className={style.formInput}
            type="text"
            name="tiktok"
            value={inputs.tiktok || ""}
            onChange={handleChange}
            maxLength={50}
          >

          </input>

        </label>
        <label className={style.formLabel}>Discord link :
          <input className={style.formInput}
            type="text"
            name="discord"
            value={inputs.discord || ""}
            maxLength={50}
            onChange={handleChange} />
        </label>

        <label className={style.formLabel}>Github :
          <input className={style.formInput}
            type="text"
            name="github"
            value={inputs.github || ""}
            maxLength={50}
            onChange={handleChange} />
        </label>

        <label className={style.formLabel}>White paper link :
          <input className={style.formInput}
            type="text"
            name="whitePaper"
            value={inputs.whitePaper || ""}
            onChange={handleChange}
            maxLength={50}
          >
          </input>
        </label>

        <label className={style.formLabel}>Audit? *:
          <div>
            <input onChange={auditEdit} type="radio" name="questionAudit" value="yes" id="yes" required="required"
            /> <label style={{ marginRight: "1%" }} htmlFor="yes">yes</label>
            <input onChange={auditEdit} type="radio" name="questionAudit" value="no" id="no" required="required"
            /> <label htmlFor="no">no</label>
          </div>
          {formSubmitted && audit == "" && errors.questionAudit && (
            <span className={style.errorMessage}>{errors.questionAudit}</span>
          )}
        </label>

        {audit == "yes" &&
          <label className={style.formLabel}>Audit proof Link * :
            <input className={style.formInput}
              type="text"
              name="auditProof"
              value={inputs.auditProof || ""}
              onChange={handleChange}
              required="required"
              maxLength={50}
            />
            {formSubmitted && !inputs.auditProof && errors.auditProof && (
              <span className={style.errorMessage}>{errors.auditProof}</span>
            )}
          </label>}


        <label className={style.formLabel}>Kyc? *:
          <div>
            <input onChange={kycEdit} type="radio" name="questionKyc" value="yes" id="yes" required="required"
            /> <label style={{ marginRight: "1%" }} htmlFor="yes">yes</label>
            <input onChange={kycEdit} type="radio" name="questionKyc" value="no" id="no" required="required"
            />
            <label htmlFor="no">no</label>
          </div>
          {formSubmitted && kyc == "" && errors.questionKyc && (
            <span className={style.errorMessage}>{errors.questionKyc}</span>
          )}
        </label>

        {kyc == "yes" &&
          <label className={style.formLabel}>kyc proof Link * :
            <input className={style.formInput}
              type="text"
              name="kycProof"
              value={inputs.kycProof || ""}
              onChange={handleChange}
              required="required"
              maxLength={50}
            />
            {formSubmitted && !inputs.kycProof && errors.kycProof && (
              <span className={style.errorMessage}>{errors.kycProof}</span>
            )}
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

export default Formulaire; 