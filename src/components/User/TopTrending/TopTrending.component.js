/* eslint-disable jsx-a11y/anchor-is-valid */
import NavigationUserComponent from '../../Navigation/NavigationUser/NavigationUser.component';
import TableLaunchService from '../../../services/tableauLaunh/tableauLaunch.service'
import FooterComponent from '../../../components/Navigation/Footer/Footer.component';
import styleModal from "../../../styles/modalVote.module.scss";
import AuthService from "../../../services/auth/auth.service";
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import style from './TopTrending.module.scss';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


const TopTrending = () => {


  const url = AuthService.getUrl();

  let [database, seDatabase] = useState([])
  let [pagination, setLimit] = useState({ pageActuel: 1, limit: 10, skip: 0 })
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);
  const [toggle4, setToggle4] = useState(false);

  const user = AuthService.getCurrentUser();

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

  let date = new Date();
  let mondayUtc = (date.getUTCMonth() + 1)
  mondayUtc = parseInt(mondayUtc);
  let dayUtc = date.getUTCDate()
  dayUtc = parseInt(dayUtc);
  if (mondayUtc < 10) { mondayUtc = '0' + mondayUtc.toString() }
  if (dayUtc < 10) { dayUtc = '0' + dayUtc.toString() }
  let dateUtc = date.getFullYear() + '-' + mondayUtc + '-' + dayUtc;

  let date1 = new Date(dateUtc);



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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  var totalReactPackages;
  let userData = [];

  function tableLaunch(limit, skip) {

    TableLaunchService.getTopTrending(limit, skip).then(function (result) {
      result.map((item, index) => {
        item.id = (
          {/* <div style={{ fontWeight: "bold", fontSize: "1.2em" }}>{item._id}</div> */ }
        );
        item.image = (
          <img className={style.topTrending_img} src={url + result[index].image} alt='img' />
        );

        userData.push(item);
      });
      totalReactPackages = userData;

      TableLaunchService.setDatabase(userData)
      if (totalReactPackages != null) {
        TableLaunchService.initDatabase();

        let data = TableLaunchService.getDatabase()
        for (let i = 0; i < totalReactPackages.length; i++) {
          data.rows.push(({ image: <img className={style.topTrending_img} alt='img' style={{ height: "100%", width: "95px", float: "left" }} src={totalReactPackages[i].image.props.src} />, name: totalReactPackages[i].name, symbol: totalReactPackages[i].symbol, launchDate: totalReactPackages[i].launchDate, id: totalReactPackages[i]._id, price: totalReactPackages[i].price, coinMarket: totalReactPackages[i].marketCap, supply: totalReactPackages[i].supply, rank: i + 1 + skip, percent_change_24h: totalReactPackages[i].percent_change_24h, vote: totalReactPackages[i].statistique.global.vote, points: totalReactPackages[i].points, pointsTwentyHour: totalReactPackages[i].pointsTwentyHour, pointsCacul: totalReactPackages[i].pointsCacul, statistique: totalReactPackages[i].statistique }))

        }

        seDatabase(TableLaunchService.getDatabase());
      }


    }, err => {
      console.log(err);
    });

  }




  function getTopTrending(limit, skip) {

    seDatabase([]);
    TableLaunchService.getTopTrending(limit, skip).then(function (result) {
      result.map((item, index) => {
        item.id = (
          {/* <div style={{ fontWeight: "bold", fontSize: "1.2em" }}>{item._id}</div> */ }
        );
        item.image = (
          <img className={style.topTrending_img} src={url + result[index].image} alt='img' />
        );

        userData.push(item);
      });
      totalReactPackages = userData;

      TableLaunchService.setDatabase(userData)
      if (totalReactPackages != null) {
        TableLaunchService.initDatabase();

        let data = TableLaunchService.getDatabase()
        for (let i = 0; i < totalReactPackages.length; i++) {
          data.rows.push(({ image: <img className={style.topTrending_img} alt='img' style={{ height: "100%", width: "95px", float: "left" }} src={totalReactPackages[i].image.props.src} />, name: totalReactPackages[i].name, symbol: totalReactPackages[i].symbol, launchDate: totalReactPackages[i].launchDate, id: totalReactPackages[i]._id, price: totalReactPackages[i].price, coinMarket: totalReactPackages[i].marketCap, supply: totalReactPackages[i].supply, rank: i + 1 + skip, percent_change_24h: totalReactPackages[i].percent_change_24h, vote: totalReactPackages[i].statistique.global.vote, points: totalReactPackages[i].points, pointsTwentyHour: totalReactPackages[i].pointsTwentyHour, pointsCacul: totalReactPackages[i].pointsCacul, statistique: totalReactPackages[i].statistique }))

        }


        seDatabase(TableLaunchService.getDatabase());
      }


    }, err => {
      console.log(err);
    });



  }



  function getTopTrendingToday(limit, skip) {

    seDatabase([]);
    TableLaunchService.getTopTrendingToday(limit, skip).then(function (result) {
      result.map((item, index) => {
        item.id = (
          {/* <div style={{ fontWeight: "bold", fontSize: "1.2em" }}>{item._id}</div> */ }
        );
        item.image = (
          <img className={style.topTrending_img} src={url + result[index].image} alt='img' />
        );

        userData.push(item);
      });
      totalReactPackages = userData;

      TableLaunchService.setDatabase(userData)
      if (totalReactPackages != null) {
        TableLaunchService.initDatabase();

        let data = TableLaunchService.getDatabase()
        for (let i = 0; i < totalReactPackages.length; i++) {
          data.rows.push(({ image: <img className={style.topTrending_img} alt='img' style={{ height: "100%", width: "95px", float: "left" }} src={totalReactPackages[i].image.props.src} />, name: totalReactPackages[i].name, symbol: totalReactPackages[i].symbol, launchDate: totalReactPackages[i].launchDate, id: totalReactPackages[i]._id, price: totalReactPackages[i].price, coinMarket: totalReactPackages[i].marketCap, supply: totalReactPackages[i].supply, rank: i + 1 + skip, percent_change_24h: totalReactPackages[i].percent_change_24h, vote: totalReactPackages[i].statistique.global.vote, points: totalReactPackages[i].points, pointsTwentyHour: totalReactPackages[i].pointsTwentyHour, pointsCacul: totalReactPackages[i].pointsCacul, statistique: totalReactPackages[i].statistique }))


        }

        seDatabase(TableLaunchService.getDatabase());
      }


    }, err => {
      console.log(err);
    });



  }




  function getLaunchDateTrending(limit, skip) {

    seDatabase([]);
    TableLaunchService.getLaunchDateTrending(limit, skip).then(function (result) {
      result.map((item, index) => {
        item.id = (
          {/* <div style={{ fontWeight: "bold", fontSize: "1.2em" }}>{item._id}</div> */ }
        );
        item.image = (
          <img className={style.topTrending_img} src={url + result[index].image} alt='img' />
        );

        userData.push(item);
      });
      totalReactPackages = userData;

      TableLaunchService.setDatabase(userData)
      if (totalReactPackages != null) {
        TableLaunchService.initDatabase();

        let data = TableLaunchService.getDatabase()
        for (let i = 0; i < totalReactPackages.length; i++) {
          data.rows.push(({ image: <img className={style.topTrending_img} alt='img' style={{ height: "100%", width: "95px", float: "left" }} src={totalReactPackages[i].image.props.src} />, name: totalReactPackages[i].name, symbol: totalReactPackages[i].symbol, launchDate: totalReactPackages[i].launchDate, id: totalReactPackages[i]._id, price: totalReactPackages[i].price, coinMarket: totalReactPackages[i].marketCap, supply: totalReactPackages[i].supply, rank: i + 1 + skip, percent_change_24h: totalReactPackages[i].percent_change_24h, vote: totalReactPackages[i].statistique.global.vote, points: totalReactPackages[i].points, pointsTwentyHour: totalReactPackages[i].pointsTwentyHour, pointsCacul: totalReactPackages[i].pointsCacul, statistique: totalReactPackages[i].statistique }))


        }

        seDatabase(TableLaunchService.getDatabase());
      }


    }, err => {
      console.log(err);
    });



  }




  function getPromotedProject() {

    seDatabase([]);
    TableLaunchService.getPromotedProject().then(function (result) {
      result.map((item, index) => {
        item.id = (
          {/* <div style={{ fontWeight: "bold", fontSize: "1.2em" }}>{item._id}</div> */ }
        );
        item.image = (
          <img className={style.topTrending_img} src={url + result[index].image} alt='img' />
        );

        userData.push(item);
      });
      totalReactPackages = userData;

      TableLaunchService.setDatabase(userData)
      if (totalReactPackages != null) {
        TableLaunchService.initDatabase();

        let data = TableLaunchService.getDatabase()
        for (let i = 0; i < totalReactPackages.length; i++) {
          data.rows.push(({ image: <img className={style.topTrending_img} alt='img' style={{ height: "100%", width: "95px", float: "left" }} src={totalReactPackages[i].image.props.src} />, name: totalReactPackages[i].name, symbol: totalReactPackages[i].symbol, launchDate: totalReactPackages[i].launchDate, id: totalReactPackages[i]._id, price: totalReactPackages[i].price, coinMarket: totalReactPackages[i].marketCap, supply: totalReactPackages[i].supply, rank: i + 1, percent_change_24h: totalReactPackages[i].percent_change_24h, vote: totalReactPackages[i].statistique.global.vote, points: totalReactPackages[i].points, pointsTwentyHour: totalReactPackages[i].pointsTwentyHour, pointsCacul: totalReactPackages[i].pointsCacul, statistique: totalReactPackages[i].statistique }))

        }

        seDatabase(TableLaunchService.getDatabase());
      }


    }, err => {
      console.log(err);
    });



  }

  useEffect(() => {
    getEcosystemLenght();
    tableLaunch(10, 0);
  }, []);



  function getEcosystemLenght() {

    TableLaunchService.getEcosystemLenght().then(function (result) {

      if (result / 10 < 1) {
        TableLaunchService.totalPage = 1;
      }
      if (result / 10 >= 1) {
        TableLaunchService.totalPage = result % 10 === 0 ? result / 10 : ((result / 10) - ((result % 10) / 10)) + 1
      }
    });
  }
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


  function getPromotedProjectLenght() {

    TableLaunchService.getPromotedProjectLenght().then(function (result) {

      if (result / 10 < 1) {
        TableLaunchService.totalPage = 1;
      }
      if (result / 10 >= 1) {
        TableLaunchService.totalPage = result % 10 === 0 ? result / 10 : ((result / 10) - ((result % 10) / 10)) + 1
      }
    });
  }




  const Propagation = e => { e.stopPropagation(); }


  function allRequest(limit, skip) {
    seDatabase([]);

    if (toggle1) {
      TableLaunchService.pageActuel = 1;
      tableLaunch(limit, skip);
    }

    if (toggle2) {
      TableLaunchService.pageActuel = 1;
      getTopTrendingToday(limit, skip);
    }
    if (toggle3) {
      TableLaunchService.pageActuel = 1;
      getLaunchDateTrending(limit, skip);
    }
    if (toggle4) {
      TableLaunchService.pageActuel = 1;
      getPromotedProject();
    }
  }





  function login() {
    // history.push(`/login/`)
    navigate('/login/');
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
          .finally(() => { seDatabase([]); allRequest(pagination.limit, pagination.skip); handleClose() })

      })
  };





  function onChangeCaptcha(value) {
    setCaptcha(value);
  }

  function next() {
    if (pagination.pageActuel < TableLaunchService.totalPage) {

      seDatabase([]);

      setLimit({
        pageActuel: pagination.pageActuel + 1,
        limit: pagination.limit,
        skip: pagination.skip + 10
      });

      allRequest(pagination.limit, pagination.skip + 10)
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
      allRequest(pagination.limit, pagination.skip - 10)
    }

  }


  const navigate = useNavigate();

  function nav(path) {
    navigate(path);
  }



  let changeStyle = (btn) => {
    switch (btn) {
      case 1:
        setToggle1(true);
        setToggle2(false);
        setToggle3(false);
        setToggle4(false);
        getEcosystemLenght();
        setLimit({
          pageActuel: 1,
          limit: pagination.limit,
          skip: pagination.skip
        });
        getTopTrending(10, 0);
        break;
      case 2:
        setToggle2(true);
        setToggle1(false);
        setToggle3(false);
        setToggle4(false);
        getEcosystemLenght();
        setLimit({
          pageActuel: 1,
          limit: pagination.limit,
          skip: pagination.skip
        });
        getTopTrendingToday(10, 0);
        break;
      case 3:
        setToggle3(true);
        setToggle1(false);
        setToggle2(false);
        setToggle4(false);
        getLaunchDateLenght();
        setLimit({
          pageActuel: 1,
          limit: pagination.limit,
          skip: pagination.skip
        });
        getLaunchDateTrending(10, 0);
        break;
      case 4:
        setToggle3(false);
        setToggle1(false);
        setToggle2(false);
        setToggle4(true);
        getPromotedProjectLenght();
        setLimit({
          pageActuel: 1,
          limit: pagination.limit,
          skip: pagination.skip
        });
        getPromotedProject();
        break;
      default:
    }
  };

  return (
    <div className={style.topTrending_fond}>
      <NavigationUserComponent />
      <div className={style.topTrending_mainDiv}>
        <div className={style.topTrending_divSectionTitle}>
          <img src={url + "assets/ranked_arrows.png"} className={style.topTrending_imgLogoSection} alt='ranked_arrow'></img>
          <p className={style.topTrending_sectionTitle}>Top Ranked <span className={style.topTrending_tokensTitle}>Tokens</span> </p>
        </div>
      </div>
      <div className={style.topTrending_container}>

        <div className={style.topTrending_filterContainer}>


          <div className={toggle1 ? style.topTrending_filterOneClick : style.topTrending_filterOne} onClick={() => changeStyle(1)}>
            <p className={style.topTrending__filterTitle}>All Time</p>
          </div>
          <div className={toggle2 ? style.topTrending_filterClick : style.topTrending_filter} onClick={() => changeStyle(2)}> <p className={style.topTrending__filterTitle}>Today</p> </div>
          <div className={toggle3 ? style.topTrending_filterClick : style.topTrending_filter} onClick={() => changeStyle(3)}> <p className={style.topTrending__filterTitle}>Presale</p> </div>
          <div className={toggle4 ? style.topTrending_filterClick : style.topTrending_filter} onClick={() => changeStyle(4)}> <p className={style.topTrending__filterTitle}>Premium</p> </div>

        </div>

        <table className="table table-hover">

          <thead>
            <tr>
              <th className={style.topTrending_thPointer} scope="col">Rank</th>
              <th className={style.topTrending_thPointer} scope="col"> </th>
              <th className={style.topTrending_thPointer} scope="col">Name</th>
              <th className={style.topTrending_thPointer} scope="col">Symbol</th>
              <th className={style.topTrending_thPointer} scope="col">LaunchDate</th>
              <th className={style.topTrending_thPointer} scope="col">Price</th>
              <th className={style.topTrending_thPointer} scope="col">MarketCap</th>
              <th className={style.topTrending_thPointer} scope="col">Change in 24h:</th>
              <th className={style.topTrending_thPointer} scope="col">Votes</th>
              <th className={style.topTrending_thPointer} scope="col">  </th>
            </tr>
          </thead>
          <tbody>
            {database.rows?.map((row, index) => (
              <tr key={index} onClick={() => nav(`/infoCoin/${row.id}`)} style={{ cursor: 'pointer' }} >
                <td className={style.topTrending_td}>{row.rank}</td>
                <td className={style.topTrending_td} value={row.id}><img className={style.topTrending_img} src={row.image.props.src} alt='img' /></td>
                <td className={style.topTrending_td}>{row.name}</td>
                <td className={style.topTrending_td}>{row.symbol}</td>
                <td className={style.topTrending_td}>{row.launchDate}</td>
                <td className={style.topTrending_td}>$ {row.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</td>
                <td className={style.topTrending_td}>$ {row.coinMarket.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                <td className={style.topTrending_td}> {row.percent_change_24h} %   {row.percent_change_24h > 0 && <img src={url + "assets/Up-arrow.png"} className={style.topTrending_imgUpArrow} alt='Up-arrow'></img>}  {row.percent_change_24h < 0 && <img src={url + "assets/Down-arrow.png"} className={style.topTrending_imgUpArrow} alt='Down-arrow'></img>} </td>
                <td className={style.topTrending_td}>{row.pointsTwentyHour}</td>
                <td className={style.topTrending_td}>
                  <button type="button" onClick={function (event) { Propagation(event); vote(row.id, row.name, row.image, row.points, row.pointsTwentyHour, row.pointsCacul, row.statistique) }} className={style.topTrending_voteButton}>Vote</button>
                </td>
              </tr>

            ))}
          </tbody>



        </table>

        <div className={style.topTrending_pagination}>
          <span className={style.topTrending_paginationPageActuel}>1 - {TableLaunchService.totalPage} of {pagination.pageActuel}</span>
          <a className={style.topTrending_paginationPageActuel > 1 ? "" : "disable"} onClick={previous} href="#">❮</a>
          <a className={style.topTrending_paginationPageActuel < TableLaunchService.totalPage ? "" : "disable"} onClick={next} href="#">❯</a>
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
      <FooterComponent />
    </div>
  );
}

export default TopTrending;




