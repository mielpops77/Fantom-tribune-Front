import "bootstrap/dist/css/bootstrap.min.css";
import { MDBDataTableV5 } from 'mdbreact';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TableauLaunch = () => {

  const [posts, setPosts] = useState([]);
  var [totalReactPackages, setTotalReactPackages] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/launchDate/')
        .then((res) => res.json())
        .then((res) => {
            setPosts(res);
        });
}, []);



  useEffect(() => {
    let postsArray = JSON.parse(JSON.stringify(posts));
    let userData = [];
    postsArray.map((item, index) => {
      item._id = (
        <div style={{ fontWeight: "bold", fontSize: "1.2em" }}>{item._id}</div>
      );
      item.image = (
        <img style={{ height: "100%", width: "95px", float: "left" }} src={"http://localhost:3000/" + posts[index].image} />
      );
      item.image = (
        <img style={{ height: "100%", width: "95px", float: "left" }} src={"http://localhost:3000/" + posts[index].image} />
      );
      userData.push(item);
    });
    setTotalReactPackages(userData);
  }, [posts]);





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
    rows: totalReactPackages
  };


  /*   if (totalReactPackages != null) {
      console.log(data);
      console.log(totalReactPackages);
  
      for (let i = 0; i < totalReactPackages.length; i++) {
        data.rows.push(({ image: <img style={{ height: "100%", width: "95px", float: "left" }} src={"http://localhost:3000/" + totalReactPackages[i].image} />, name: totalReactPackages[i].name, symbol: totalReactPackages[i].symbol, launchDate: totalReactPackages[i].launchDate }));
      }
  
    }
   */



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



