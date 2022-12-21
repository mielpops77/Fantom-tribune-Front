import TableLaunchService from '../../../services/tableauLaunh/tableauLaunch.service'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import styleModal from "../../../styles/modalVote.module.scss";
import AuthService from "../../../services/auth/auth.service";
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./Presales.module.scss";
import Modal from '@mui/material/Modal';
import Dropdown from 'react-dropdown';
import Box from '@mui/material/Box';
import 'react-dropdown/style.css';
import axios from "axios";



const Presales = () => {

  const url = AuthService.getUrl();
  var [database, seDatabase] = useState([])
  var [pagination, setLimit] = useState({ pageActuel: 1, limit: 10, skip: 0 })
  const user = AuthService.getCurrentUser();
  const [items, setItems] = useState([]);

  const [captcha, setCaptcha] = useState(null);
  const [verifVoteToday, setVerifVoteToday] = useState(false);
  const [data, setData] = useState({
    id: "",
    name: "",
    image: "",
    points: "",
    pointsTwentyHour: "",
    pointsCacul: "",
    statistique: "",
    limiteUser: []
  });



  const styleBox = {
    border: '2px solid #3888E5',
    position: 'absolute',
    borderRadius: '10px',
    boxShadow: '0px 0px 50px rgb(56 136 229 / 90%)',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    bgcolor: '#131325',
    p: 4,
  };

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

  let date1 = new Date(dateUtc);


  function nav(nav) {
    navigate(nav);
  }


  function getSearchCoinRequest(search) {
    return axios.get(AuthService.getUrl() + `searchCoinNoPresale?name=${search}`)
        .then(response => {
            /* setSearchCoin(response.data); */
            let result = [
                {
                    id: 0,
                    name: 'vide',
                    image: 'vide',
                    symbol: 'vide',
                    type: 'vide'
                },
                {
                    id: 1,
                    name: 'vide',
                    image: 'vide',
                    symbol: 'vide',
                    type: 'vide'

                },
                {
                    id: 2,
                    name: 'vide',
                    image: 'vide',
                    symbol: 'vide',
                    type: 'vide'

                },
                {
                    id: 3,
                    name: 'vide',
                    image: 'vide',
                    symbol: 'vide',
                    type: 'vide'

                },
                {
                    id: 4,
                    name: 'vide',
                    image: 'vide',
                    symbol: 'vide',
                    type: 'vide'

                }
                ,
                {
                    id: 5,
                    name: 'vide',
                    image: 'vide',
                    symbol: 'vide',
                    type: 'vide'

                },
                {
                    id: 6,
                    name: 'vide',
                    image: 'vide',
                    symbol: 'vide',
                    type: 'vide'

                },
                {
                    id: 7,
                    name: 'vide',
                    image: 'vide',
                    symbol: 'vide',
                    type: 'vide'

                },
                {
                    id: 8,
                    name: 'vide',
                    image: 'vide',
                    symbol: 'vide',
                    type: 'vide'

                },
                {
                    id: 9,
                    name: 'vide',
                    image: 'vide',
                    symbol: 'vide',
                    type: 'vide'

                }
            ]
            for (let i = 0; i < response.data.length; i++) {
                result[i].name = response.data[i].name;
                result[i].id = response.data[i]._id;
                result[i].image = response.data[i].image;
                result[i].symbol = response.data[i].symbol;
                result[i].type = response.data[i].type;

            }

            const result2 = result.filter((person) => person.name !== 'vide')
            setItems(result2);


            return response.data;
        })
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
          data.rows.push(({ image: <img className={style.topTrending_img} alt='img' style={{ height: "100%", width: "95px", float: "left" }} src={totalReactPackages[i].image.props.src} />, name: totalReactPackages[i].name, symbol: totalReactPackages[i].symbol, launchDate: totalReactPackages[i].launchDate, id: totalReactPackages[i]._id, price: totalReactPackages[i].price, coinMarket: totalReactPackages[i].marketCap, supply: totalReactPackages[i].supply, percent_change_24h: totalReactPackages[i].percent_change_24h, vote: totalReactPackages[i].statistique.global.vote, points: totalReactPackages[i].points, pointsTwentyHour: totalReactPackages[i].pointsTwentyHour, pointsCacul: totalReactPackages[i].pointsCacul, statistique: totalReactPackages[i].statistique }))
        }
        seDatabase(TableLaunchService.getDatabase());
      }

    }, err => {
      console.log(err);
    });

  }


  useEffect(() => {
    getSearchCoinRequest('');
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


  function vote(coinId, name, image, points, pointsTwentyHour, pointsCacul, statistique) {
    setCaptcha(null);
    setData({ id: coinId, name: name, image: image.props.src, points: points, pointsTwentyHour: pointsTwentyHour, pointsCacul: pointsCacul, statistique: statistique });
    if (user !== null) {
      let verif = false;
      AuthService.getPointsLimitUser(user.id).then((res) => {
        setData({ id: coinId, name: name, image: image.props.src, points: points, pointsTwentyHour: pointsTwentyHour, pointsCacul: pointsCacul, statistique: statistique, limiteUser: res.data });
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].id == coinId && res.data[i].type == "vote") {
            let date2 = new Date(res.data[i].day);
            let diff = date1 - date2;
            let diffJour = diff / (1000 * 3600 * 24);
            if ((diffJour <= 1 && res.data[i].day.hour <= date.getUTCHours()) || (res.data[i].day == dateUtc)) {
              verif = true;
              setVerifVoteToday(true);
            }
          }
        }
        if (!verif) {
          setVerifVoteToday(false);
        }
      })

    }
    handleOpen();
  }

  const addPoints = () => {

    let element = { id: data.id, type: "vote", hour: date.getUTCHours(), day: dateUtc, value: 1 }
    fetch(url + `addPuntos/?id=${user.id}`, {
      method: "Put",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ element: element, list: data.limiteUser })
    })
      .then((res) => {

        res.json()
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ points: data.points, pointsCacul: data.pointsCacul, pointsTwentyHour: data.pointsTwentyHour, statistique: data.statistique })
        };
        fetch(url + `pointCalcul/?id=${data.id}&type=vote`, requestOptions)
          .then(response => response.json())
          .finally(() => { seDatabase([]); tableLaunch(10, 0); handleClose() })

      })
  };








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

  function onChangeCaptcha(value) {
    setCaptcha(value);
  }

  function getSearchCoinRequest(search) {
    return axios.get(AuthService.getUrl() + `searchCoinPresale?name=${search}`)
        .then(response => {
            /* setSearchCoin(response.data); */
            let result = [
                {
                    id: 0,
                    name: 'vide',
                    image: 'vide',
                    symbol: 'vide',
                    type: 'vide'
                },
                {
                    id: 1,
                    name: 'vide',
                    image: 'vide',
                    symbol: 'vide',
                    type: 'vide'

                },
                {
                    id: 2,
                    name: 'vide',
                    image: 'vide',
                    symbol: 'vide',
                    type: 'vide'

                },
                {
                    id: 3,
                    name: 'vide',
                    image: 'vide',
                    symbol: 'vide',
                    type: 'vide'

                },
                {
                    id: 4,
                    name: 'vide',
                    image: 'vide',
                    symbol: 'vide',
                    type: 'vide'

                }
                ,
                {
                    id: 5,
                    name: 'vide',
                    image: 'vide',
                    symbol: 'vide',
                    type: 'vide'

                },
                {
                    id: 6,
                    name: 'vide',
                    image: 'vide',
                    symbol: 'vide',
                    type: 'vide'

                },
                {
                    id: 7,
                    name: 'vide',
                    image: 'vide',
                    symbol: 'vide',
                    type: 'vide'

                },
                {
                    id: 8,
                    name: 'vide',
                    image: 'vide',
                    symbol: 'vide',
                    type: 'vide'

                },
                {
                    id: 9,
                    name: 'vide',
                    image: 'vide',
                    symbol: 'vide',
                    type: 'vide'

                }
            ]
            for (let i = 0; i < response.data.length; i++) {
                result[i].name = response.data[i].name;
                result[i].id = response.data[i]._id;
                result[i].image = response.data[i].image;
                result[i].symbol = response.data[i].symbol;
                result[i].type = response.data[i].type;

            }

            const result2 = result.filter((person) => person.name !== 'vide')
            setItems(result2);


            return response.data;
        })
}

  const handleOnSearch = (string, results) => {
    getSearchCoinRequest(string);
  }

  const handleOnHover = (result) => {
    // the item hovered
  }

  const handleOnSelect = (item) => {
    nav(`/infoCoin/${item.id}`);
    }

  const handleOnFocus = () => {
  }
  const formatResult = (item) => {
    return (
        <>
            <span className={style.updateCoin_search}>  <img className={style.updateCoin_img} src={url + item.image} alt='img' />  <span className={style.updateCoin_nameSearch}>{item.name}</span> 	<mat-chip>
                <label htmlFor="chip-1">{item.symbol}</label>
            </mat-chip></span>
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
          fuseOptions={
            {
              shouldSort: true,
              threshold: 0.6,
              location: 0,
              distance: 100,
              maxPatternLength: 32,
              minMatchCharLength: 1,
              keys: [
                "name", "symbol"
              ]
            }
          }
          resultStringKeyName="name"
        />
        {/*   <input className= {style.searchInput}
        type="text"
        name="search-bar"
        id="search-bar"
        placeholder="Search..."
      /> */}
      </div>
      <table className="table table-hover">
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
                <button type="button" onClick={function (event) { Propagation(event); vote(row.id, row.name, row.image, row.points, row.pointsTwentyHour, row.pointsCacul, row.statistique) }} className={style.presales_voteButton}>Vote</button>
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
      <Modal className={styleModal.modalBackground}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleBox}>
          <Typography id="modal-modal-title" className={styleModal.typo} variant="h6" component="h2">
            <div className={styleModal.divTitle}>
              Vote for {data.name}
            </div>
            <div className={styleModal.divTypo} >
              <img className={styleModal.imgModal} src={data.image} alt='img' /></div>
            {(user !== null && !verifVoteToday) &&
              <ReCAPTCHA className={styleModal.captcha}
                sitekey="6LdjgCcjAAAAAKtlNP6UasdKdiBbjeQ82NAPAOtG"
                onChange={onChangeCaptcha}
              />}
          </Typography>
          <Typography className={styleModal.typo}>
            <div className={styleModal.divTypo}>
              {(user !== null && !verifVoteToday) &&
                <button type="button" onClick={function (event) { Propagation(event); addPoints() }} className={`${captcha == null ? styleModal.voteButtonTypoNotAllowed : styleModal.voteButtonTypo}`} >Votes</button>
              }
              {(user !== null && verifVoteToday) &&
                <button type="button" onClick={function (event) { Propagation(event); handleClose() }} className={styleModal.voteButtonTypo}>thank you for voting</button>
              }
              {user == null &&
                <button type="button" onClick={function (event) { Propagation(event); login() }} className={styleModal.voteButtonTypo}>Please login for vote</button>
              }
            </div>
          </Typography>
          <Typography className={styleModal.typo} id="modal-modal-description" sx={{ mt: 2 }}>
            You can vote once every 24 hours.
          </Typography>
        </Box>
      </Modal>
    </div >
  );
}

export default Presales;



