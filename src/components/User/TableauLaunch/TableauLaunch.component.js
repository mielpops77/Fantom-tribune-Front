import TableLaunchService from '../../../services/tableauLaunh/tableauLaunch.service'
import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./TableauLaunch.scss";
import { useHistory } from 'react-router-dom';


const TableauLaunch = () => {

  /*  var [totalReactPackages, setTotalReactPackages] = useState(null); */
  var [database, seDatabase] = useState([])
  var [pagination, setLimit] = useState({ pageActuel: 1, limit: 10, skip: 0 })



  function tableLaunch(limit, skip) {


    var totalReactPackages;
    TableLaunchService.getLaunchTab(limit, skip).then(function (result) {
      let userData = [];
      result.map((item, index) => {
        item.id = (
          {/* <div style={{ fontWeight: "bold", fontSize: "1.2em" }}>{item._id}</div> */ }
        );
        item.image = (
          <img src={"http://localhost:3000/" + result[index].image} />
        );

        userData.push(item);
      });
      totalReactPackages = userData;

      TableLaunchService.setDatabase(userData)
      if (totalReactPackages != null) {
        TableLaunchService.initDatabase();

        let data = TableLaunchService.getDatabase()
        for (let i = 0; i < totalReactPackages.length; i++) {
          data.rows.push(({ image: <img style={{ height: "100%", width: "95px", float: "left" }} src={totalReactPackages[i].image.props.src} />, name: totalReactPackages[i].name, symbol: totalReactPackages[i].symbol, launchDate: totalReactPackages[i].launchDate, id: totalReactPackages[i]._id }));
        }



        seDatabase(TableLaunchService.getDatabase());



      }



    }, err => {
      console.log(err);
    });

  }


  useEffect(() => {
    console.log('INtUSEFFECT', pagination);

    /* setRoows(roows => TableLaunchService.getDatabase().rows); */

    TableLaunchService.getLaunchTabLenght().then(function (result) {


      if (result / 10 < 1) {
        TableLaunchService.totalPage = 1;
      }

      if (result / 10 >= 1) {

        if (result % 10 === 0) {
          TableLaunchService.totalPage = result / 10;

        }
        else {
          TableLaunchService.totalPage = ((result / 10) - ((result % 10) / 10)) + 1

        }
      }
    });

    tableLaunch(10, 0);



  }, []);








  function next() {
    if (pagination.pageActuel < TableLaunchService.totalPage) {

      seDatabase([]);

      setLimit({
        pageActuel: pagination.pageActuel + 1,
        limit: pagination.limit,
        skip: pagination.skip + 10
      });


      tableLaunch(pagination.limit, pagination.skip + 10);
    }

  }

  function previous() {

    if (pagination.pageActuel > 1) {
      seDatabase([]);
      setLimit({
        pageActuel: pagination.pageActuel - 1,
        limit: pagination.limit,
        skip: pagination.skip - 10
      });

      tableLaunch(pagination.limit, pagination.skip - 10);
    }

  }




  /*   const SortArray = (x, y) => {
      return x.name.localeCompare(y.name);
    } */

  /*  function SortArray(x, y) {
     return x.name.localeCompare(y.name);
   }
  */

  /*   function trie(e) {
      tedt = TableLaunchService.getDatabase();
      var x = tedt.rows.sort(function (a, b) { return a[2] > b[2] ? 1 : -1; });
      setValid(true);
    } */
  const history = useHistory();


  return (
    <div className="container">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th style={{ cursor: 'pointer' }} scope="col">#</th>
            <th style={{ cursor: 'pointer' }} scope="col"> </th>
            <th style={{ cursor: 'pointer' }} scope="col">Name</th>
            <th style={{ cursor: 'pointer' }} scope="col">Symbol</th>
            <th style={{ cursor: 'pointer' }} scope="col">LaunchDate</th>
          </tr>
        </thead>
        <tbody>
          {database.rows?.map((row, index) => (
            <tr key={index} onClick={() => history.push(`/infoCoin/${row.id}`)} style={{ cursor: 'pointer' }} >
              <td ></td>
              <td value={row.id} > <img style={{ height: "100px", width: "100px" }} src={row.image.props.src} /> </td>
              <td>{row.name}</td>
              <td>
                {row.symbol}</td>
              <td>
                {row.launchDate}</td>
            </tr>
          ))}
        </tbody>



      </table>

      <div className="paginationLaunchDate">

        <a className={pagination.pageActuel > 1 ? "" : "disable"} onClick={previous}>❮</a>
        <a className={pagination.pageActuel < TableLaunchService.totalPage ? "" : "disable"} onClick={next}>❯</a>
      </div>
      <span className='paginationPageActuel'>1 - {TableLaunchService.totalPage} of {pagination.pageActuel}</span>

    </div >
  );
}



export default TableauLaunch;



