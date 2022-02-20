import "bootstrap/dist/css/bootstrap.min.css";
import { MDBDataTableV5 } from 'mdbreact';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TableauLaunch = () => {


  var [totalReactPackages, setTotalReactPackages] = useState(null);

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios.get('http://localhost:3000/api/v1/launchDate/')
      .then(response => totalReactPackages = setTotalReactPackages(response.data));

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);
  const data = {
    columns: [
      {
        label: '#',
        field: 'id',
        sort: 'asc',
        width: 150
      },
      {
        label: '',
        field: 'image',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Symbol',
        field: 'symbol',
        sort: 'asc',
        width: 100
      },
      {
        label: 'LaunchDate',
        field: 'launchDate',
        sort: 'asc',
        width: 150
      },

    ],
    rows: [
    ]
  };


  if (totalReactPackages != null) {
    console.log(data);
    console.log(totalReactPackages);

    for (let i = 0; i < totalReactPackages.length; i++) {
      data.rows.push(({image: <img src={totalReactPackages[i].image}/>, name:  totalReactPackages[i].name, symbol: totalReactPackages[i].symbol, launchDate: totalReactPackages[i].launchDate }));
      }

  }




    return (
      <div className="container">
        <MDBDataTableV5
        responsive
          hover
          striped
          bordered
          small
          data={data}
        />
      </div>
    );
  }



  export default TableauLaunch;



