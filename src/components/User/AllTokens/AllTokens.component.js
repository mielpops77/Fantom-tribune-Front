import TableLaunchService from '../../../services/tableauLaunh/tableauLaunch.service'
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import MultiRangeSlider from "../../../package/MultiRangeSlider";
import styleModal from "../../../styles/modalVote.module.scss";
import AuthService from "../../../services/auth/auth.service";
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./AllTokens.module.scss";
import Modal from '@mui/material/Modal';
import Dropdown from 'react-dropdown';
import Box from '@mui/material/Box';
import 'react-dropdown/style.css';

const AllTokens = () => {


  const url = AuthService.getUrl();


  var [database, seDatabase] = useState([])
  var [pagination, setLimit] = useState({ pageActuel: 1, limit: 10, skip: 0 })

  const [action, setAction] = useState("type");
  const [type, setType] = useState("All");

  const user = AuthService.getCurrentUser();

  const styleBox = {
    boxShadow: '0px 0px 50px rgb(56 136 229 / 90%)',
    transform: 'translate(-50%, -50%)',
    border: '2px solid #3888E5',
    position: 'absolute',
    borderRadius: '10px',
    bgcolor: '#131325',
    top: '50%',
    left: '50%',
    width: '30%',
    p: 4,
  };


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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


  useEffect(() => {
    TableLaunchService.initChangePrice();
    TableLaunchService.initTimeChangePrice();
    TableLaunchService.initChangePriceDataBase();
    TableLaunchService.initMax();
    TableLaunchService.initMin();


    TableLaunchService.getEcosystemLenght().then(function (result) {

      if (result / 10 < 1) {
        TableLaunchService.totalPage = 1;
      }
      if (result / 10 >= 1) {
        TableLaunchService.totalPage = result % 10 === 0 ? result / 10 : ((result / 10) - ((result % 10) / 10)) + 1
      }
    });

    tableLaunch(10, 0, action, type, TableLaunchService.getMin(), TableLaunchService.getMax());
  }, []);


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

  function tableLaunch(limit, skip, action, type, min, max) {


    var totalReactPackages;
    TableLaunchService.getEcosystem(limit, skip, action, type, min, max).then(function (result) {
      let userData = [];
      result.map((item, index) => {
        item.id = (
          {/* <div style={{ fontWeight: "bold", fontSize: "1.2em" }}>{item._id}</div> */ }
        );
        item.image = (
          <img className={style.allTokenPage_img} src={url + result[index].image} alt='img' />
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
          .finally(() => { seDatabase([]); tableLaunch(pagination.limit, pagination.skip, action, type, TableLaunchService.getMin(), TableLaunchService.getMax()); handleClose() })

      })
  };

  function login() {
    navigate('/login/');
  }


  function next() {
    if (pagination.pageActuel < TableLaunchService.totalPage) {

      seDatabase([]);

      setLimit({
        pageActuel: pagination.pageActuel + 1,
        limit: pagination.limit,
        skip: pagination.skip + 10
      });


      tableLaunch(pagination.limit, pagination.skip + 10, action, type, TableLaunchService.getMin(), TableLaunchService.getMax());
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

      tableLaunch(pagination.limit, pagination.skip - 10, action, type, TableLaunchService.getMin(), TableLaunchService.getMax());
    }

  }


  function onChangeCaptcha(value) {
    setCaptcha(value);
  }

  const navigate = useNavigate();

  function nav(path) {
    navigate(path);
  }
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

  const handleOnSearch = (string, results) => {
  }

  const handleOnHover = (result) => {
  }

  const handleOnSelect = (item) => {
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

  function changeType(event) {
    setAction('type')
    setType(event.value);
    seDatabase([]);
    tableLaunch(pagination.limit, pagination.skip, "type", event.value, TableLaunchService.getMin(), TableLaunchService.getMax());
  }
  const options = [
    "All", "Dex", "Gaming", "Nft", "Lending", "Algo-Stables", "Derivatives", "Yield Aggregatort", "Reflect token", "Yield"
  ];


  function changePrice(min, max) {
    TableLaunchService.setMax(max);
    TableLaunchService.setMin(min);
    if (TableLaunchService.getChangePrice() == 2) {
      if (TableLaunchService.getTimeChangePrice()) {
        TableLaunchService.setChangePriceDataBase(TableLaunchService.getChangePriceDataBase() + 1)
        TableLaunchService.setTimeChangePrice(false);
        setTimeout(() => {
          if (TableLaunchService.getChangePriceDataBase() == 2) {
            seDatabase([]);
            tableLaunch(pagination.limit, pagination.skip, "priceChange", type, TableLaunchService.getMin(), TableLaunchService.getMax());
            TableLaunchService.setChangePriceDataBase(0);
          }
          TableLaunchService.setTimeChangePrice(true);
        }, "200")
      }

    }
    else {
      TableLaunchService.setchangePrice(TableLaunchService.getChangePrice() + 1);
    }
  }
  return (
    <div className={style.allTokens_container}>

      <div className={style.filterContainer}>
        <div className={style.filterType}>
          <Dropdown controlClassName={style.controlDropdown} options={options} onChange={changeType} value={options[0]} placeholder="Select an option" />
        </div>
        <div className={style.filterRangeSlider} >
          <p className={style.textMultiRangeSlider}>24h price change</p >
          <div className={style.multiRangeSlider}>
            <MultiRangeSlider
              min={-100}
              max={101}
              onChange={({ min, max }) => changePrice(min, max)}
            />
          </div>
        </div>
        <div className={style.dropDownSearch} style={{ width: "80%", display: "inline-block", marginRight: "3%", marginTop: "1%" }}>
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
          />

        </div>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th className={style.thPointer} scope="col"> </th>
            <th className={style.thPointer} scope="col">Name</th>
            <th className={style.thPointer} scope="col">Symbol</th>
            <th className={style.thPointer} scope="col">LaunchDate</th>
            <th className={style.thPointer} scope="col">Price</th>
            <th className={style.thPointer} scope="col">MarketCap</th>
            <th className={style.thPointer} scope="col">Change in 24h:</th>
            <th className={style.thPointer} scope="col">Votes</th>
            <th className={style.thPointer} scope="col">  </th>
          </tr>
        </thead>
        <tbody>
          {database.rows?.map((row, index) => (
            <tr key={index} onClick={() => nav(`/infoCoin/${row.id}`)} style={{ cursor: 'pointer' }} >
              <td className={style.td} value={row.id}><img className={style.img} src={row.image.props.src} alt='img' /></td>
              <td className={style.td}>{row.name}</td>
              <td className={style.td}>{row.symbol}</td>
              <td className={style.td}>{row.launchDate}</td>
              <td className={style.td}>$ {row.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</td>
              <td className={style.td}>$ {row.coinMarket.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
              <td className={style.td}> {row.percent_change_24h} %   {row.percent_change_24h > 0 && <img src={url + "assets/Up-arrow.png"} className={style.imgUpArrow} alt='Up-arrow'></img>}  {row.percent_change_24h < 0 && <img src={url + "assets/Down-arrow.png"} className={style.imgUpArrow} alt='Down-arrow'></img>} </td>
              <td className={style.td}>{row.vote}</td>
              <td className={style.td}>
                <button type="button" onClick={function (event) { Propagation(event); vote(row.id, row.name, row.image, row.points, row.pointsTwentyHour, row.pointsCacul, row.statistique) }} className={style.voteButton}>Vote</button>
              </td>
            </tr>

          ))}
        </tbody>


      </table>

      <div className={style.pagination}>
        <span className={style.paginationPageActuel}>1 - {TableLaunchService.totalPage} of {pagination.pageActuel}</span>
        <a className={pagination.pageActuel > 1 ? "" : "disable"} onClick={previous} href="#">❮</a>
        <a className={pagination.pageActuel < TableLaunchService.totalPage ? "" : "disable"} onClick={next} href="#">❯</a>
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



export default AllTokens;



