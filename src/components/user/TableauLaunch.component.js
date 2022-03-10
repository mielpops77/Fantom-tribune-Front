import "bootstrap/dist/css/bootstrap.min.css";
import { MDBDataTableV5 } from 'mdbreact';
import React, { useState, useEffect } from 'react';



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


  function test() {
    console.log(data.row)
    return data.rows;
  }

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
      data.rows.push(({ image: <img style={{ height: "100%", width: "95px", float: "left" }} src={totalReactPackages[i].image.props.src} />, name: totalReactPackages[i].name, symbol: totalReactPackages[i].symbol, launchDate: totalReactPackages[i].launchDate, }));
    }

  }



  let id = 0;
  function createData(option, type) {
    id += 1;
    return { id, option, type };
  }

  
  let rows = [
    createData('Setting Two', 'Public'),
    createData('Setting Three', 'Group'),
    createData('Setting Four', 'Private'),
  ];

  console.log('rows',rows);
  console.log('rows',data.rows);

  
  

  return (
    <div className="container">

<table class="table table-striped table-hover">
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
          <td></td>
          <td><img style={{ height: "100px", width: "100px" }} src={row.image.props.src} /></td>
          <td>{row.name}</td>
          <td>{row.symbol}</td>
          <td>{row.launchDate}</td>
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



