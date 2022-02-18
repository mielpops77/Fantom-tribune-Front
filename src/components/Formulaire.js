
import { useState } from "react";
import ReactDOM from "react-dom";

function Formulaire() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log(inputs.name);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: inputs.name, symbol: inputs.symbol , launchDate: inputs.launchDate })
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
        <input type="submit" />
    </form>
  )
}

ReactDOM.render(<Formulaire />, document.getElementById('root'));
export default Formulaire; 