import TableLaunchService from '../../../services/tableauLaunh/tableauLaunch.service'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import AuthService from "../../../services/auth/auth.service";
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import style from "./Presales.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Dropdown from 'react-dropdown';
import Box from '@mui/material/Box';
import 'react-dropdown/style.css';



const Presales = () => {

  const url = AuthService.getUrl();
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



  function nav(nav) {
    navigate(nav);
  }



  const options = [
    "All", "Dex", "Gaming", "Nft", "Lending", "Algo-Stables", "Derivatives", "Yield Aggregatort", "Reflect token", "Yield"
  ];

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  function tableLaunch(limit, skip) {


    var totalReactPackages;
    TableLaunchService.getLaunchTab(limit, skip, TableLaunchService.getAction(), TableLaunchService.getTypeFilter()).then(function (result) {
      let userData = [];
      result.map((item, index) => {
        item.id = (
          {/* <div style={{ fontWeight: "bold", fontSize: "1.2em" }}>{item._id}</div> */ }
        );
        item.image = (
          <img className={style.presales_img} src={url + result[index].image} alt='img' />
        );
        userData.push(item);
      });
      totalReactPackages = userData;

      TableLaunchService.setDatabase(userData)
      if (totalReactPackages != null) {
        TableLaunchService.initDatabase();

        let data = TableLaunchService.getDatabase()
        for (let i = 0; i < totalReactPackages.length; i++) {
          data.rows.push(({ image: <img className={style.presales_img} alt='img' style={{ height: "100%", width: "95px", float: "left" }} src={totalReactPackages[i].image.props.src} />, name: totalReactPackages[i].name, symbol: totalReactPackages[i].symbol, launchDate: totalReactPackages[i].launchDate, id: totalReactPackages[i]._id, vote: totalReactPackages[i].vote, voteToday: totalReactPackages[i].voteToday, type: totalReactPackages[i].type, voteTwentyHour: totalReactPackages[i].voteTwentyHour, voteTwentyHourCalcul: totalReactPackages[i].voteTwentyHourCalcul }));
        }
        seDatabase(TableLaunchService.getDatabase());
      }

    }, err => {
      console.log(err);
    });

  }


  useEffect(() => {

    TableLaunchService.initAction();
    TableLaunchService.initTypeFilter();

    getLaunchDateLenght();

    tableLaunch(10, 0);

  }, []);


  function getLaunchDateLenght() {

    TableLaunchService.getLaunchDateLenght().then(function (result) {

      if (result / 10 < 1) {
        TableLaunchService.totalPage = 1;
      }
      if (result / 10 >= 1) {
        TableLaunchService.totalPage = result % 10 === 0 ? result / 10 : ((result / 10) - ((result % 10) / 10)) + 1
      }
    });
  }


  const Propagation = e => {
    e.stopPropagation();
  }

  function Vote(id, voteToday, vote, voteTwentyHourCalcul, voteTwentyHour) {
    user !== null ? putVote(id, voteToday, user.email, vote, voteTwentyHourCalcul, voteTwentyHour) : handleOpen();
  }


  function putVote(projectId, voteToday, email, vote, voteTwentyHourCalcul, voteTwentyHour) {

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
          body: JSON.stringify({ info: email, voteToday: voteToday, vote: vote, voteTwentyHourCalcul: voteTwentyHourCalcul, voteTwentyHour: voteTwentyHour })
        };
        fetch(url + `vote/${projectId}`, requestOptions)
          .then(response => response.json())
          /* .then(data => this.setState({ postId: data.id })) */
          .finally(() => { seDatabase([]); tableLaunch(pagination.limit, pagination.skip); })
      }
    }

    else {

      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ info: email, voteToday: voteToday, vote: vote, voteTwentyHourCalcul: voteTwentyHourCalcul, voteTwentyHour: voteTwentyHour })
      };
      fetch(url + `vote/${projectId}`, requestOptions)
        .then(response => response.json())
        .finally(() => { seDatabase([]); tableLaunch(pagination.limit, pagination.skip); })

    }
  }


  function login() {
    // history.push(`/login/`)
    navigate(`/login/`)
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

  const items = [
    {
      id: 0,
      name: 'Cobol'
    },
    {
      id: 1,
      name: 'JavaScript'
    },
    {
      id: 2,
      name: 'Basic'
    },
    {
      id: 3,
      name: 'PHP'
    },
    {
      id: 4,
      name: 'Java'
    }
  ]
  /*  const history = useHistory(); */
  const navigate = useNavigate();

  function trieVote() {
    seDatabase([]);

    TableLaunchService.getAction() !== 'votesAsc' ? TableLaunchService.setAction('votesAsc') : TableLaunchService.setAction('votesDesc');
    tableLaunch(pagination.limit, pagination.skip);
  }

  function trieLaunchDate() {
    seDatabase([]);
    TableLaunchService.getAction() !== 'launchDateAsc' ? TableLaunchService.setAction('launchDateAsc') : TableLaunchService.setAction('launchDateDesc');
    tableLaunch(pagination.limit, pagination.skip);
  }

  function changeType(event) {
    seDatabase([]);
    TableLaunchService.setTypeFilter(event.value)
    tableLaunch(pagination.limit, pagination.skip);
  }


  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
  }

  const handleOnFocus = () => {
  }

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left', }}>id: {item.id}</span>
        <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name}</span>
      </>
    )
  }
  return (

    <div className={style.container}>
      <Dropdown className={style.controlDropdownRoot} controlClassName={style.controlDropdown} options={options} onChange={changeType} value={options[0]} placeholder="Select an option" />
      <div className={style.presale_dropDownSearch} style={{ width: " 60%", display: "inline-block", marginBottom: "2%", marginLeft: "3%" }}>
        <ReactSearchAutocomplete
          styling={
            { 
              backgroundColor: "transparant",
              border: "1px solid #ccc",
              width: "50% !important"
            }
          }
          items={items}
          onSearch={handleOnSearch}
          onHover={handleOnHover}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          autoFocus
          formatResult={formatResult}
        />
        {/*   <input className= {style.searchInput}
        type="text"
        name="search-bar"
        id="search-bar"
        placeholder="Search..."
      /> */}
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th className={style.presales_thPointer} scope="col">#</th>
            <th className={style.presales_thPointer} style={{ cursor: 'pointer' }} scope="col">Name</th>
            <th className={style.presales_thPointer} style={{ cursor: 'pointer' }} scope="col">Symbol</th>
            <th className={style.presales_thPointer} scope="col">Type</th>
            <th onClick={trieLaunchDate} className={style.presales_thPointer} style={{ cursor: 'pointer' }} scope="col">LaunchDate</th>
            <th onClick={trieVote} className={style.presales_thPointer} style={{ cursor: 'pointer' }} scope="col">Votes</th>

            <th className={style.presales_thPointer} scope="col">  </th>
          </tr>
        </thead>
        <tbody>
          {database.rows?.map((row, index) => (
            <tr key={index} onClick={() => nav(`/infoCoin/${row.id}`)} style={{ cursor: 'pointer' }} >
              <td className={style.presales_td} value={row.id} ><img className={style.presales_img} src={row.image.props.src} alt='img' /> </td>
              <td className={style.presales_td}>{row.name}</td>
              <td className={style.presales_td}>{row.symbol}</td>
              <td className={style.presales_td}>{row.type}</td>
              <td className={style.presales_td}>{row.launchDate}</td>
              <td className={style.presales_td}>    {row.vote}</td>
              <td className={style.presales_td}>
                <button type="button" onClick={function (event) { Propagation(event); Vote(row.id, row.voteToday, row.vote, row.voteTwentyHourCalcul, row.voteTwentyHour) }} className={style.presales_voteButton}>Vote</button>
              </td>
            </tr>

          ))}
        </tbody>
      </table>
      <div className={style.paginationPresales}>
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

export default Presales;



