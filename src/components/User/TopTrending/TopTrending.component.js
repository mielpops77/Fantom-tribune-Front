/* eslint-disable jsx-a11y/anchor-is-valid */
import NavigationUserComponent from '../../Navigation/NavigationUser/NavigationUser.component';
import TableLaunchService from '../../../services/tableauLaunh/tableauLaunch.service'
import AuthService from "../../../services/auth/auth.service";
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import style from './TopTrending.module.scss';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


const TopTrending = () => {


  const url = AuthService.getUrl();

  var [database, seDatabase] = useState([])
  var [pagination, setLimit] = useState({ pageActuel: 1, limit: 10, skip: 0 })
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);
  const [toggle4, setToggle4] = useState(false);

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
        console.log("skip", skip)
        for (let i = 0; i < totalReactPackages.length; i++) {
          data.rows.push(({ image: <img className={style.topTrending_img} alt='img' style={{ height: "100%", width: "95px", float: "left" }} src={totalReactPackages[i].image.props.src} />, name: totalReactPackages[i].name, symbol: totalReactPackages[i].symbol, launchDate: totalReactPackages[i].launchDate, id: totalReactPackages[i]._id, vote: totalReactPackages[i].vote, voteToday: totalReactPackages[i].voteToday, price: totalReactPackages[i].price, coinMarket: totalReactPackages[i].marketCap, supply: totalReactPackages[i].supply, voteTwentyHourCalcul: totalReactPackages[i].voteTwentyHourCalcul, voteTwentyHour: totalReactPackages[i].voteTwentyHour, rank: i + 1 + skip, percent_change_24h: totalReactPackages[i].percent_change_24h }));
        }

        seDatabase(TableLaunchService.getDatabase());
      }


    }, err => {
      console.log(err);
    });

  }




  function getTopTrending(limit, skip)
  {

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
        console.log("skip", skip)
        for (let i = 0; i < totalReactPackages.length; i++) {
          data.rows.push(({ image: <img className={style.topTrending_img} alt='img' style={{ height: "100%", width: "95px", float: "left" }} src={totalReactPackages[i].image.props.src} />, name: totalReactPackages[i].name, symbol: totalReactPackages[i].symbol, launchDate: totalReactPackages[i].launchDate, id: totalReactPackages[i]._id, vote: totalReactPackages[i].vote, voteToday: totalReactPackages[i].voteToday, price: totalReactPackages[i].price, coinMarket: totalReactPackages[i].marketCap, supply: totalReactPackages[i].supply, voteTwentyHourCalcul: totalReactPackages[i].voteTwentyHourCalcul, voteTwentyHour: totalReactPackages[i].voteTwentyHour, rank: i + 1 + skip, percent_change_24h: totalReactPackages[i].percent_change_24h }));
        }

        seDatabase(TableLaunchService.getDatabase());
      }


    }, err => {
      console.log(err);
    });



  }



  function getTopTrendingToday(limit, skip)
  {

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
        console.log("skip", skip)
        for (let i = 0; i < totalReactPackages.length; i++) {
          data.rows.push(({ image: <img className={style.topTrending_img} alt='img' style={{ height: "100%", width: "95px", float: "left" }} src={totalReactPackages[i].image.props.src} />, name: totalReactPackages[i].name, symbol: totalReactPackages[i].symbol, launchDate: totalReactPackages[i].launchDate, id: totalReactPackages[i]._id, vote: totalReactPackages[i].vote, voteToday: totalReactPackages[i].voteToday, price: totalReactPackages[i].price, coinMarket: totalReactPackages[i].marketCap, supply: totalReactPackages[i].supply, voteTwentyHourCalcul: totalReactPackages[i].voteTwentyHourCalcul, voteTwentyHour: totalReactPackages[i].voteTwentyHour, rank: i + 1 + skip, percent_change_24h: totalReactPackages[i].percent_change_24h }));
        }

        seDatabase(TableLaunchService.getDatabase());
      }


    }, err => {
      console.log(err);
    });



  }

  function getLaunchDateTrending(limit, skip)
  {

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
        console.log("skip", skip)
        for (let i = 0; i < totalReactPackages.length; i++) {
          data.rows.push(({ image: <img className={style.topTrending_img} alt='img' style={{ height: "100%", width: "95px", float: "left" }} src={totalReactPackages[i].image.props.src} />, name: totalReactPackages[i].name, symbol: totalReactPackages[i].symbol, launchDate: totalReactPackages[i].launchDate, id: totalReactPackages[i]._id, vote: totalReactPackages[i].vote, voteToday: totalReactPackages[i].voteToday, price: totalReactPackages[i].price, coinMarket: totalReactPackages[i].marketCap, supply: totalReactPackages[i].supply, voteTwentyHourCalcul: totalReactPackages[i].voteTwentyHourCalcul, voteTwentyHour: totalReactPackages[i].voteTwentyHour, rank: i + 1 + skip, percent_change_24h: totalReactPackages[i].percent_change_24h }));
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



  function vote(id, voteToday, vote, voteTwentyHourCalcul, voteTwentyHour) {
    console.log(id, voteToday, vote, voteTwentyHourCalcul, voteTwentyHour)
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
        getTopTrending(10, 0);
        break;
      case 2:
        setToggle2(true);
        setToggle1(false);
        setToggle3(false);
        setToggle4(false);
        getTopTrendingToday(10, 0);
        break;
      case 3:
        setToggle3(true);
        setToggle1(false);
        setToggle2(false);
        setToggle4(false);
        getLaunchDateTrending(10, 0);
        break;
      case 4:
        setToggle3(false);
        setToggle1(false);
        setToggle2(false);
        setToggle4(true);
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

        <table className="table table-striped table-hover">

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
                <td className={style.topTrending_PageTd}>{row.rank}</td>
                <td className={style.topTrending_PageTd} value={row.id}><img className={style.topTrending_img} src={row.image.props.src} alt='img' /></td>
                <td className={style.topTrending_PageTd}>{row.name}</td>
                <td className={style.topTrending_PageTd}>{row.symbol}</td>
                <td className={style.topTrending_PageTd}>{row.launchDate}</td>
                <td className={style.topTrending_PageTd}>$ {row.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</td>
                <td className={style.topTrending_PageTd}>$ {row.coinMarket.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                <td className={style.topTrending_PageTd}> {row.percent_change_24h} %   {row.percent_change_24h > 0 && <img src={url + "assets/Up-arrow.png"} className={style.topTrending_imgUpArrow} alt='Up-arrow'></img>}  {row.percent_change_24h < 0 && <img src={url + "assets/Down-arrow.png"} className={style.topTrending_imgUpArrow} alt='Down-arrow'></img>} </td>
                <td className={style.topTrending_PageTd}>{row.vote}</td>
                <td className={style.topTrending_PageTd}>
                  <button type="button" onClick={function (event) { Propagation(event); vote(row.id, row.voteToday, row.vote, row.voteTwentyHourCalcul, row.voteTwentyHour) }} className="btn btn-success">Vote</button>
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
    </div>
  );
}



export default TopTrending;




