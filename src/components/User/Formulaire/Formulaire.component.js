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

  const [selected, setSelected] = useState('Dex');
  const [urlUpload, setToggle] = useState('');
  const [prev, setPrev] = useState('');
  const [kyc, setKyc] = useState('');
  const [verifUpl, setVerifUpl] = useState('');
  const [user, setUser] = useState([]);
  const [urlUpload2, setUrlUpload2] = useState('');


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
    { label: "Nft", value: "Nft" },
    { label: "Lending", value: "Lending" },
    { label: "Algo-Stables", value: "Algo-Stables" },
    { label: "Derivatives", value: "Derivatives" },
    { label: "Yield Aggregatort", value: "Yield Aggregatort" },
    { label: "Reflect token", value: "Reflect token" },
    { label: "Yield", value: "Yield" },
    { label: "Bridge", value: "Bridge" },
  ];


  const [inputs, setInputs] = useState({});

  const upload = (event) => {
    event.preventDefault();
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
          handleSubmit();
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
  const prevente = (event) => {
    setPrev(event.target.value);
  }

  const kycEdit = (event) => {
    console.log("event.target.value", event.target.value)
    setKyc(event.target.value);
  }

  /*   const handleChangeFile = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({ ...values, [name]: value }))
      upload();
    }
   */
  function handleSubmit() {
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
        coinMarketCapLink = inputs.coinMarketCapLink;
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



      let contractAddress = inputs.contractAddress;

      if (inputs.contractAddress !== undefined) {
        contractAddress = contractAddress.toLowerCase();
      }
      else { contractAddress = "none" }


      /* event.preventDefault(); */
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: inputs.name, symbol: inputs.symbol, launchDate: inputs.launchDate, contractAddress: contractAddress, description: inputs.description, type: type,
          websiteLink: inputs.websiteLink, coinMarketCapLink: coinMarketCapLink, telegram: inputs.telegram, twitter: inputs.twitter, discord: inputs.discord, image: inputs.image, points: 0, pointsTwentyHour: 0, pointsCacul: pointsCacul, price: 0, marketCap: 0, supply: 0, coinMarketCapStatus: coinMarketCapStatus, idCoinMarketCap: 0, listePriceIdCoinMarketCap: listePriceIdCoinMarketCap, percent_change_24h: 0, promotedStatus: false, kyc: kyc,
          emailCrea: user.email, usernameCrea: user.username, statistique: statistique, kycProof: inputs.kycProof, launchDateHour: inputs.launchDateHour
        })
      };
      fetch(url + 'launchDate', requestOptions)
        .then((response) => response.json()) //2
        .then((res) => {
          if (inputs.coinMarketCapLink !== undefined) {
            const searchTerm = '/currencies/'
            const slug = inputs.coinMarketCapLink.substring(inputs.coinMarketCapLink.lastIndexOf(searchTerm) + 12, inputs.coinMarketCapLink.length - 1);
            TableLaunchService.coinmarketCap(res._id, slug, coinMarketCapLink);
          }
          nav(`/ValidationForm/Submit`);
        });

      /*   .then(response => { console.log(JSON.parse(response.json())) }, nav(`/ValidationForm/Submit`)
        ) */

      /* .then(data => this.setState({ postId: data.id })); */

    }

  }



  function verifUpload() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    inputs.image === undefined ? setVerifUpl(false) : setVerifUpl(true)
  }


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

        <label className={style.formLabel}>Name*:
          <input className={style.formInput}
            type="text"
            name="name"
            value={inputs.name || ""}
            onChange={handleChange}
            required="required"
          />
        </label>
        <label className={style.formLabel}>Symbol*:
          <input className={style.formInput}
            type="text"
            name="symbol"
            value={inputs.symbol || ""}
            onChange={handleChange}
            required="required"
          ></input>
        </label>





        <label className={style.formLabel}>Project in the launch phase?*:
          <div>

            <input onChange={prevente} type="radio" name="question" value="yes" id="yes" required="required"
            /> <label style={{ marginRight: "1%" }} htmlFor="yes">yes</label>
            <input onChange={prevente} type="radio" name="question" value="no" id="no" required="required"
            /> <label htmlFor="no">no</label>
          </div>
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
              // type="text"
              // name="contractAddress"
              value={inputs.launchDateHour || ""}
              onChange={handleChange}
            />

          </label>}

        {
          prev === "no" &&
          <label className={style.formLabel}>Contract Address:
            <input className={style.formInput}
              type="text"
              name="contractAddress"
              value={inputs.contractAddress || ""}
              onChange={handleChange}
            />
          </label>}

        <label className={style.formLabel}>Description*:
          <textarea className={style.formInput} style={{
            maxHeight: "40em",
            minHeight: "8em"
          }}
            type="text"
            name="description"
            value={inputs.description || ""}
            onChange={handleChange}
            required="required"
          />
        </label>

        <label className={style.formLabel}>Type*:
          <Select
            className="basic-single"
            classNamePrefix="select"
            /* defaultValue={options[0]} */
            /*  isClearable={true} */
            defaultValue={options[0]}
            isSearchable={true}
            options={options}
            /* value={selected} */
            onChange={setSelected}
            selectOption="required"
          />

        </label>

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
        <label className={style.formLabel}>Website link*:
          <input className={style.formInput}
            type="text"
            name="websiteLink"
            value={inputs.websiteLink || ""}
            onChange={handleChange}
            required="required"
          />
        </label>

        {
          prev === "no" &&
          <label className={style.formLabel}>coinmarketcap link:
            <input className={style.formInput}
              type="text"
              name="coinMarketCapLink"
              value={inputs.coinMarketCapLink || ""}
              onChange={handleChange} />
          </label>}

        <label className={style.formLabel}>Telegram link:
          <input className={style.formInput}
            type="text"
            name="telegram"
            value={inputs.telegram || ""}
            onChange={handleChange}>
          </input>
        </label>


        <label className={style.formLabel}>Twitter link*:
          <input className={style.formInput}
            type="text"
            name="twitter"
            value={inputs.twitter || ""}
            onChange={handleChange}
            required="required" />
        </label>


        <label className={style.formLabel}>Discord link:
          <input className={style.formInput}
            type="text"
            name="discord"
            value={inputs.discord || ""}
            onChange={handleChange} />
        </label>
        <label className={style.formLabel}>Kyc? *:
          <div>
            <input onChange={kycEdit} type="radio" name="questionKyc" value="yes" id="yes" required="required"
            /> <label style={{ marginRight: "1%" }} htmlFor="yes">yes</label>
            <input onChange={kycEdit} type="radio" name="questionKyc" value="no" id="no" required="required"
            /> <label htmlFor="no">no</label>
          </div>
        </label>

        {kyc == "yes" &&
          <label className={style.formLabel}>kyc proof Link:
            <input className={style.formInput}
              type="text"
              name="kycProof"
              value={inputs.kycProof || ""}
              onChange={handleChange}
              required="required" />
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