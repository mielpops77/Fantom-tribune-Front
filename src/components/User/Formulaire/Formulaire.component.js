
import { useState } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import style from "./Formulaire.module.scss";
import { MultiSelect } from "react-multi-select-component";



function Formulaire() {
  const [selected, setSelected] = useState([]);
  let date = new Date()
  let today = date.toISOString().split('T')[0];

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
        telegram: inputs.telegram, twitter: inputs.twitter, discord: inputs.discord, image: inputs.image
      })
    };
    fetch('http://localhost:3000/launchDate', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ postId: data.id }));
  }



  return (

    <form className={style.formulaireSubmit} onSubmit={handleSubmit}>
      <label className={style.FormLabel}>Name*:
        <input className={style.FormInput}
          type="text"
          name="name"
          value={inputs.name || ""}
          onChange={handleChange}
        />
      </label>
      <label className={style.FormLabel}>Symbol*:
        <input className={style.FormInput}
          type="text"
          name="symbol"
          value={inputs.symbol || ""}
          onChange={handleChange}
        ></input>
      </label>

      <label className={style.FormLabel}>LaunchDate*:
        <input className={style.FormInput}
          type="date"
          name="launchDate"
          min={today}
          value={inputs.launchDate || today}
          onChange={handleChange}
        />
      </label>
      <label className={style.FormLabel}>Contract Address*:
        <input className={style.FormInput}
          type="text"
          name="contractAddress"
          value={inputs.contractAddress || ""}
          onChange={handleChange}
        />

      </label>

      <label className={style.FormLabel}>Description*:
        <input className={style.FormInput}
          type="text"
          name="description"
          value={inputs.description || ""}
          onChange={handleChange}
        />
      </label>

      <label className={style.FormLabel}>Type*:
        <MultiSelect
          options={options}
          value={selected}
          hasSelectAll={false}
          onChange={setSelected}
          labelledBy="Select"
        />

      </label>

      <label className={style.FormLabel}>Website link*:
        <input className={style.FormInput}
          type="text"
          name="websiteLink"
          value={inputs.websiteLink || ""}
          onChange={handleChange}>
        </input>
      </label>

      <label className={style.FormLabel}>Custom chart link:
        <input className={style.FormInput}
          type="text"
          name="customChartLink"
          value={inputs.customChartLink || ""}
          onChange={handleChange}>
        </input>
      </label>


      <label className={style.FormLabel}>Custom swap link:
        <input className={style.FormInput}
          type="text"
          name="customSwapLink"
          value={inputs.customSwapLink || ""}
          onChange={handleChange}>
        </input>
      </label>

      <label className={style.FormLabel}>Telegram link:
        <input className={style.FormInput}
          type="text"
          name="telegram"
          value={inputs.telegram || ""}
          onChange={handleChange}>
        </input>
      </label>


      <label className={style.FormLabel}>Twitter link:
        <input className={style.FormInput}
          type="text"
          name="twitter"
          value={inputs.twitter || ""}
          onChange={handleChange}>
        </input>
      </label>


      <label className={style.FormLabel}>Discord link:
        <input className={style.FormInput}
          type="text"
          name="discord"
          value={inputs.discord || ""}
          onChange={handleChange}>
        </input>
      </label>

      <label className={style.FormLabel}>Logo:
        <input className={style.FormInput}
          type="file"
          name="image"
          value={inputs.image || ""}
          onChange={handleChange}
          accept="image/png, image/jpeg">
        </input>
      </label>
      <button type="button" className="btn btn-secondary" onClick={upload}>Upload</button>


      <input className="btn btn-primary btn-block" id="submitInput" type="submit" />
    </form >
  )
}

ReactDOM.render(<Formulaire />, document.getElementById('root'));
export default Formulaire; 