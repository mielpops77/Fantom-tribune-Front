
import { useState } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import "./Formulaire.scss";

function Formulaire() {



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

    console.log("ssss", inputs.symbol);
    /*     const input2 = document.querySelector("input[type=file]");
        console.log('Le lien a été cliqué.',input2.files.item(0) ); */
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: inputs.name, symbol: inputs.symbol, launchDate: inputs.launchDate, contractAddress: inputs.contractAddress, description: inputs.description, type: inputs.type,
        websiteLink: inputs.websiteLink, customChartLink: inputs.customChartLink, customSwapLink: inputs.customSwapLink,
        telegram: inputs.telegram, twitter: inputs.twitter, discord: inputs.discord, image: inputs.image
      })
    };
    fetch('http://localhost:3000/launchDate', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ postId: data.id }));
  }

  return (



    <form className="formulaireSubmit" onSubmit={handleSubmit}>
      <label className="FormLabel">Name*:

        <input className="FormInput"
          type="text"
          name="name"
          value={inputs.name || ""}
          onChange={handleChange}
        />
      </label>
      <label className="FormLabel">Symbol*:
        <input className="FormInput"
          type="text"
          name="symbol"
          value={inputs.symbol || ""}
          onChange={handleChange}
        />
      </label>

      <label className="FormLabel">LaunchDate*:
        <input
          type="text"
          name="launchDate"
          value={inputs.launchDate || ""}
          onChange={handleChange}
        />
      </label>
      <label className="FormLabel">Contract Address*:
        <input className="FormInput"
          type="text"
          name="contractAddress"
          value={inputs.contractAddress || ""}
          onChange={handleChange}
        />

      </label>

      <label className="FormLabel">Description*:

        <textarea className="FormInput"
          type="text"
          name="description"
          value={inputs.description || ""}
          onChange={handleChange}>
        </textarea>
      </label>

      <label className="FormLabel">Type*:
        <input className="FormInput"
          type="text"
          name="type"
          value={inputs.type || ""}
          onChange={handleChange}
        />

      </label>


      <label className="FormLabel">Website link*:
        <input className="FormInput"
          type="text"
          name="websiteLink"
          value={inputs.websiteLink || ""}
          onChange={handleChange}>
        </input>
      </label>

      <label className="FormLabel">Custom chart link:
        <input className="FormInput"
          type="text"
          name="customChartLink"
          value={inputs.customChartLink || ""}
          onChange={handleChange}>
        </input>
      </label>


      <label className="FormLabel">Custom swap link:
        <input className="FormInput"
          type="text"
          name="customSwapLink"
          value={inputs.customSwapLink || ""}
          onChange={handleChange}>
        </input>
      </label>

      <label className="FormLabel">Telegram link:
        <input className="FormInput"
          type="text"
          name="telegram"
          value={inputs.telegram || ""}
          onChange={handleChange}>
        </input>
      </label>


      <label className="FormLabel">Twitter link:
        <input className="FormInput"
          type="text"
          name="twitter"
          value={inputs.twitter || ""}
          onChange={handleChange}>
        </input>
      </label>


      <label className="FormLabel">Discord link:
        <input className="FormInput"
          type="text"
          name="discord"
          value={inputs.discord || ""}
          onChange={handleChange}>
        </input>
      </label>

      <label className="FormLabel">Logo:
        <input className="FormInput"
          type="file"
          name="image"
          value={inputs.image || ""}
          onChange={handleChange}
          accept="image/png, image/jpeg">
        </input>
      </label>
      <button type="button" className="btn btn-secondary" onClick={upload}>Upload</button>


      <input className="submitInput" type="submit" />
    </form>
  )
}

ReactDOM.render(<Formulaire />, document.getElementById('root'));
export default Formulaire; 