import "bootstrap/dist/css/bootstrap.min.css";
/* import { MDBDataTableV5 } from 'mdbreact'; */
import React, { useState, useEffect } from 'react';
import "./TableauLaunch.scss";
import { NavLink } from "react-router-dom";



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
    console.log('postsArray', postsArray);
    postsArray.map((item, index) => {
      item.id = (
        <div style={{ fontWeight: "bold", fontSize: "1.2em" }}>{item._id}</div>
      );
      item.image = (
        <img style={{ height: "100%", width: "95px", float: "left" }} src={"http://localhost:3000/" + posts[index].image} />
      );
      item.image = (
        <img style={{ height: "100%", width: "95px", float: "left" }} src={"http://localhost:3000/" + posts[index].image} />
      );
      console.log('item', item);
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
    rows: [
    ]
  };


  if (totalReactPackages != null) {

    for (let i = 0; i < totalReactPackages.length; i++) {
      data.rows.push(({ image: <img style={{ height: "100%", width: "95px", float: "left" }} src={totalReactPackages[i].image.props.src} />, name: totalReactPackages[i].name, symbol: totalReactPackages[i].symbol, launchDate: totalReactPackages[i].launchDate, id:totalReactPackages[i]._id  }));
    }

    console.log('data.rows',data.rows);


  }

  return (
    <div className="container">

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col"> </th>
            <th scope="col">Name</th>
            <th scope="col">Symbol</th>
            <th scope="col">LaunchDate</th>

          </tr>
        </thead>
        <tbody>
          {data.rows.map(row => (
            <tr>
              <td ><NavLink
                to={`launchDate/${row.name}/`}
              >
              </NavLink></td>
              <td> <NavLink 
                to={`infoCoin/${row.id}`}><img style={{ height: "100px", width: "100px" }} src={row.image.props.src} /> </NavLink></td>
              <td><NavLink  
                to={`infoCoin/${row.id}`}>{row.name}</NavLink></td>
              <td><NavLink 
                to={`infoCoin/${row.id}`}>{row.symbol}</NavLink></td>
              <td><NavLink 
                to={`infoCoin/${row.id}`}>{row.launchDate}</NavLink></td>
            </tr>
          ))}
        </tbody>
      </table>
      {/*   <MDBDataTableV5
        responsive
        hover
        striped
        bordered
        small
        columns={data.columns}
        rows = {test()}
      /> */}
    </div>
  );
}



export default TableauLaunch;



