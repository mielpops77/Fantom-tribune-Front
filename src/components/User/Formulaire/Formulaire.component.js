
import { useState } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import style from "./Formulaire.module.scss";
import { MultiSelect } from "react-multi-select-component";



function Formulaire() {
  const [selected, setSelected] = useState([]);
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
    console.log('uploaaad');
    const inputImg = document.querySelector("input[type=file]");
    let fileCount = inputImg.files.length;
    if (fileCount > 0) {


      console.log(" inputImg.files.item(0)", inputImg.files.item(0))
      let formData = new FormData();
      formData.append('image', inputImg.files.item(0))
      console.log('formData', formData)
      axios({
        method: "post",
        url: "http://localhost:3000/images",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          //handle success
          console.log(response);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    }
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: inputs.name, symbol: inputs.symbol, launchDate: inputs.launchDate, contractAddress: inputs.contractAddress, description: inputs.description, type: selected,
        websiteLink: inputs.websiteLink, customChartLink: inputs.customChartLink, customSwapLink: inputs.customSwapLink,
        telegram: inputs.telegram, twitter: inputs.twitter, discord: inputs.discord, image: inputs.image, vote : 0 , voteToday: voteTodayUtc
      })
    };
    fetch('http://localhost:3000/launchDate', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ postId: data.id }));
  }



  return (

    <form className={style.formulaireSubmit} onSubmit={handleSubmit}>
      <label className={style.formLabel}>Name*:
        <input className={style.formInput}
          type="text"
          name="name"
          value={inputs.name || ""}
          onChange={handleChange}
        />
      </label>
      <label className={style.formLabel}>Symbol*:
        <input className={style.formInput}
          type="text"
          name="symbol"
          value={inputs.symbol || ""}
          onChange={handleChange}
        ></input>
      </label>

      <label className={style.formLabel}>LaunchDate (UTC)*:
        <input className={style.formInput}
          type="date"
          name="launchDate"
          min={dateUtc}
          value={inputs.launchDate || dateUtc}
          onChange={handleChange}
        />
      </label>

     

      <label className={style.formLabel}>Contract Address*:
        <input className={style.formInput}
          type="text"
          name="contractAddress"
          value={inputs.contractAddress || ""}
          onChange={handleChange}
        />

      </label>

      <label className={style.formLabel}>Description*:
        <input className={style.formInput}
          type="text"
          name="description"
          value={inputs.description || ""}
          onChange={handleChange}
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
        />

      </label>

      <label className={style.formLabel}>Website link*:
        <input className={style.formInput}
          type="text"
          name="websiteLink"
          value={inputs.websiteLink || ""}
          onChange={handleChange}>
        </input>
      </label>

      <label className={style.formLabel}>Custom chart link:
        <input className={style.formInput}
          type="text"
          name="customChartLink"
          value={inputs.customChartLink || ""}
          onChange={handleChange}>
        </input>
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


      <label className={style.formLabel}>Twitter link:
        <input className={style.formInput}
          type="text"
          name="twitter"
          value={inputs.twitter || ""}
          onChange={handleChange}>
        </input>
      </label>


      <label className={style.formLabel}>Discord link:
        <input className={style.formInput}
          type="text"
          name="discord"
          value={inputs.discord || ""}
          onChange={handleChange}>
        </input>
      </label>

      <label className={style.formLabel}>Logo:
        <input
          type="file"
          name="image"
          value={inputs.image || ""}
          onChange={handleChange}
          accept="image/png, image/jpeg">
        </input>
      </label>
      <button type="button" className={style.greenButton} onClick={upload}>Upload your picture</button>


      <input className={style.blueButton} type="submit" />
    </form >
  )
}

ReactDOM.render(<Formulaire />, document.getElementById('root'));
export default Formulaire; 