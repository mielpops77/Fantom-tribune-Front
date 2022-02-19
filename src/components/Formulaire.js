
import { useState } from "react";
import ReactDOM from "react-dom";

function Formulaire() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(inputs.name);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: inputs.name, symbol: inputs.symbol, launchDate: inputs.launchDate, contractAddress: inputs.contractAddress, description: inputs.description ,
         websiteLink: inputs.websiteLink, customChartLink: inputs.customChartLink, customSwapLink: inputs.customSwapLink,
         telegram: inputs.telegram, twitter: inputs.twitter, discord: inputs.discord})
    };
    fetch('http://localhost:3000/api/v1/blog-posts', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ postId: data.id }));
  }

  return (



    <form onSubmit={handleSubmit}>
      <label>Name*:

        <input
          type="text"
          name="name"
          value={inputs.name || ""}
          onChange={handleChange}
        />
      </label>
      <label>Symbol*:
        <input
          type="text"
          name="symbol"
          value={inputs.symbol || ""}
          onChange={handleChange}
        />
      </label>

      <label>LaunchDate*:
        <input
          type="text"
          name="launchDate"
          value={inputs.launchDate || ""}
          onChange={handleChange}
        />
      </label>
      <label>Contract Address*:
        <input
          type="text"
          name="contractAddress"
          value={inputs.contractAddress || ""}
          onChange={handleChange}
        />

      </label>

      <label>Description*:

        <textarea
          type="text"
          name="description"
          value={inputs.description || ""}
          onChange={handleChange}>
        </textarea>
      </label>

      <label>Website link**:
        <input
          type="text"
          name="websiteLink"
          value={inputs.websiteLink || ""}
          onChange={handleChange}>
        </input>
      </label>

      <label>Custom chart link (optional):
        <input
          type="text"
          name="customChartLink"
          value={inputs.customChartLink || ""}
          onChange={handleChange}>
        </input>
      </label>


      <label>Custom swap link (optional):
        <input
          type="text"
          name="customSwapLink"
          value={inputs.customSwapLink || ""}
          onChange={handleChange}>
        </input>
      </label>

      <label>Telegram link:
        <input
          type="text"
          name="telegram"
          value={inputs.telegram || ""}
          onChange={handleChange}>
        </input>
      </label>


      <label>Twitter link:
        <input
          type="text"
          name="twitter"
          value={inputs.twitter || ""}
          onChange={handleChange}>
        </input>
      </label>


      <label>Discord link:
        <input
          type="text"
          name="discord"
          value={inputs.discord || ""}
          onChange={handleChange}>
        </input>
      </label>
      <input type="submit" />
    </form>
  )
}

ReactDOM.render(<Formulaire />, document.getElementById('root'));
export default Formulaire; 