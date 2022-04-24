
import { MultiSelect } from "react-multi-select-component";
import style from "./Formulaire.module.scss";
import { useHistory } from 'react-router-dom';
import { useState } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';


function Formulaire() {
  const [selected, setSelected] = useState([]);
  const [urlUpload, setToggle] = useState('');
  const [prev, setPrev] = useState('');
  const [verifUpl, setVerifUpl] = useState('');

  const history = useHistory();

  if (urlUpload !== '' && !verifUpl) {
    setVerifUpl(true);
  }

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

  const upload = () => {
    const inputImg = document.querySelector("input[type=file]");
    let fileCount = inputImg.files.length;
    if (fileCount > 0) {


      let formData = new FormData();
      formData.append('image', inputImg.files.item(0))
      axios({
        method: "post",
        url: "http://localhost:3000/images",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          //handle success
          setToggle("http://localhost:3000/" + inputImg.files.item(0).name);
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

  const handleChangeFile = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
    upload();
  }


  const handleSubmit = (event) => {
    if (inputs.launchDate === undefined) {
      if (prev === 'yes') {
        inputs.launchDate = dateUtc;
      }
      if (prev === 'no') {
        inputs.launchDate = dateUtcMax;
      }
    }
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: inputs.name, symbol: inputs.symbol, launchDate: inputs.launchDate, contractAddress: inputs.contractAddress, description: inputs.description, type: selected,
        websiteLink: inputs.websiteLink, customChartLink: inputs.customChartLink, customSwapLink: inputs.customSwapLink,
        telegram: inputs.telegram, twitter: inputs.twitter, discord: inputs.discord, image: inputs.image, vote: 0, voteToday: voteTodayUtc
      })
    };
    fetch('http://localhost:3000/launchDate', requestOptions)
      .then(response => response.json(), history.push(`/ValidationForm/`)
      )
    /* .then(data => this.setState({ postId: data.id })); */
  }



  function verifUpload() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    inputs.image === undefined ? setVerifUpl(false) : setVerifUpl(true)
  }



  return (

    <form className={style.formulaireSubmit} onSubmit={handleSubmit}>
      {
        verifUpl === false && <div className={style.messageError} style={{ marginTop: "1rem" }}>
          Please upload the logo for your coin.
        </div>}

      <label className={style.formLabelFileEmpty} htmlFor="file-input">
        <div className={style.formLabel}>Logo Upload*</div>
        <img style={{ height: "100%", float: "left", maxWidth: "30%", maxHeight: "30%", cursor: 'pointer' }} src="http://localhost:3000/upload.png" />
        {urlUpload !== '' && <img style={{ height: "100%", float: "left", maxWidth: "25%", maxHeight: "25%" }} src={urlUpload} />}
      </label>

      <input id="file-input" className={style.file} type="file" name="image" value={inputs.image || ""}
        onChange={handleChangeFile}
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



      <label className={style.formLabel}>Contract Address:
        <input className={style.formInput}
          type="text"
          name="contractAddress"
          value={inputs.contractAddress || ""}
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
          value={inputs.description || ""}
          onChange={handleChange}
          required="required"
        />
      </label>

      <label className={style.formLabel}>Type*:
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

      <label className={style.formLabel}>Website link*:
        <input className={style.formInput}
          type="text"
          name="websiteLink"
          value={inputs.websiteLink || ""}
          onChange={handleChange}
          required="required"
        />
      </label>

      <label className={style.formLabel}>Custom chart link:
        <input className={style.formInput}
          type="text"
          name="customChartLink"
          value={inputs.customChartLink || ""}
          onChange={handleChange} />
      </label>


      <label className={style.formLabel}>Custom swap link:
        <input className={style.formInput}
          type="text"
          name="customSwapLink"
          value={inputs.customSwapLink || ""}
          onChange={handleChange}>
        </input>
      </label>

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
      <br />
      <input className={style.blueButton} type="submit" onClick={verifUpload} />
    </form >
  )
}

ReactDOM.render(<Formulaire />, document.getElementById('root'));
export default Formulaire; 