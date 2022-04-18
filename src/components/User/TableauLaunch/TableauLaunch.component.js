/* eslint-disable jsx-a11y/anchor-is-valid */
import TableLaunchService from '../../../services/tableauLaunh/tableauLaunch.service'
import AuthService from "../../../services/auth/auth.service";
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import style from "./TableauLaunch.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const TableauLaunch = () => {
  var [database, seDatabase] = useState([])
  var [pagination, setLimit] = useState({ pageActuel: 1, limit: 10, skip: 0 })
  const user = AuthService.getCurrentUser();


  const styleBox = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        console.log('totalReactPackages', totalReactPackages)
        TableLaunchService.initDatabase();

        let data = TableLaunchService.getDatabase()
        for (let i = 0; i < totalReactPackages.length; i++) {
          data.rows.push(({ image: <img style={{ height: "100%", width: "95px", float: "left" }} src={totalReactPackages[i].image.props.src} />, name: totalReactPackages[i].name, symbol: totalReactPackages[i].symbol, launchDate: totalReactPackages[i].launchDate, id: totalReactPackages[i]._id, vote: totalReactPackages[i].vote, voteToday: totalReactPackages[i].voteToday }));
        }

        seDatabase(TableLaunchService.getDatabase());
      }



    }, err => {
      console.log(err);
    });

  }


  useEffect(() => {

    TableLaunchService.getLaunchTabLenght().then(function (result) {

      if (result / 10 < 1) {
        TableLaunchService.totalPage = 1;
      }
      if (result / 10 >= 1) {
        TableLaunchService.totalPage = result % 10 === 0 ? result / 10 : ((result / 10) - ((result % 10) / 10)) + 1
      }
    });

    tableLaunch(10, 0);

  }, []);



  const Propagation = e => {
    e.stopPropagation();
  }

  function Vote(id, voteToday, vote) {
    user !== null ? putVote(id, voteToday, user.email, vote) : handleOpen();
  }


  function putVote(projectId, voteToday, email, vote) {

    let date = new Date();
    let mondayUtc = (date.getUTCMonth() + 1)
    mondayUtc = parseInt(mondayUtc);
    let dayUtc = date.getUTCDate()
    dayUtc = parseInt(dayUtc);
    if (mondayUtc < 10) {
      mondayUtc = '0' + mondayUtc.toString()
    }

    if (dayUtc < 10) {
      dayUtc = '0' + dayUtc.toString()
    }

    let dateUtc = date.getFullYear() + '-' + mondayUtc + '-' + dayUtc;


    if (voteToday[0] === dateUtc) {
      let verif = true;
      for (let i = 0; i < voteToday.length; i++) {

        if (voteToday[i] === email) {
          verif = false;
          alert(' You can vote only once a day');
          return 0
        }
      }

      if (verif) {
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ info: email, voteToday: voteToday, vote: vote })

        };
        fetch(`http://localhost:3000/vote/${projectId}`, requestOptions)
          .then(response => response.json())
          /* .then(data => this.setState({ postId: data.id })) */
          .finally(() => { seDatabase([]); tableLaunch(pagination.limit, pagination.skip); })
      }

    }

    else {
      console.log('chemin de traverse');

      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ info: email, voteToday: voteToday, vote: vote })
      };
      fetch(`http://localhost:3000/vote/${projectId}`, requestOptions)
        .then(response => response.json())
        .finally(() => { seDatabase([]); tableLaunch(pagination.limit, pagination.skip); })

    }
  }



  function login() {
    history.push(`/login/`)
  }


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
    <div className={style.container}>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th className={style.thPointer} scope="col">#</th>
            <th className={style.thPointer} scope="col"> </th>
            <th className={style.thPointer} scope="col">Name</th>
            <th className={style.thPointer} scope="col">Symbol</th>
            <th className={style.thPointer} scope="col">LaunchDate</th>
            <th className={style.thPointer} scope="col">Votes</th>
            <th className={style.thPointer} scope="col">  </th>
          </tr>
        </thead>
        <tbody>
          {database.rows?.map((row, index) => (
            <tr key={index} onClick={() => history.push(`/infoCoin/${row.id}`)} style={{ cursor: 'pointer' }} >
              <td ></td>
              <td value={row.id} > <img src={row.image.props.src} /> </td>
              <td>{row.name}</td>
              <td>
                {row.symbol}</td>
              <td>
                {row.launchDate}</td>
              <td>
                {row.vote}
              </td>
              <td>
                <button type="button" onClick={function (event) { Propagation(event); Vote(row.id, row.voteToday, row.vote) }} className="btn btn-success">Vote</button>
              </td>
            </tr>

          ))}
        </tbody>



      </table>

      <div className={style.paginationLaunchDate}>
        <span className={style.paginationPageActuel}>1 - {TableLaunchService.totalPage} of {pagination.pageActuel}</span>
        <a className={pagination.pageActuel > 1 ? "" : "disable"} onClick={previous}>❮</a>
        <a className={pagination.pageActuel < TableLaunchService.totalPage ? "" : "disable"} onClick={next}>❯</a>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleBox}>
          <Typography className={style.typo} id="modal-modal-title" variant="h6" component="h2">
            You must be logged in to be able to vote
          </Typography>
          <br />
          <button style={{ width: "100%" }} className="btn btn-success" onClick={login}>login</button>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You can vote only once a day
          </Typography>
        </Box>
      </Modal>


    </div >


  );
}



export default TableauLaunch;



