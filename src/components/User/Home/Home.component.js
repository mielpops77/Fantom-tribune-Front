import React, { useState, useEffect } from 'react';
import AuthService from "../../../services/auth/auth.service";
import TableLaunchService from '../../../services/tableauLaunh/tableauLaunch.service'
import { useHistory } from 'react-router-dom';
import style from "./Home.module.scss";
import HolderBalance from '../../../services/tableauLaunh/HolderBalance'
import tableauLaunchService from '../../../services/tableauLaunh/tableauLaunch.service';


const Home = () => {

    const elements = ['1', '2', '3', '4', '1', '2', '3', '4'];
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    var [database, seDatabase] = useState([])
    var [pagination, setLimit] = useState({ pageActuel: 1, limit: 10, skip: 0 })
    const user = AuthService.getCurrentUser();

    
    function tableLaunch(limit, skip) {
      
  
  
      var totalReactPackages;
      TableLaunchService.getEcosystem(limit, skip).then(function (result) {
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
            data.rows.push(({ image: <img style={{ height: "100%", width: "95px", float: "left" }} src={totalReactPackages[i].image.props.src} />, name: totalReactPackages[i].name, symbol: totalReactPackages[i].symbol, launchDate: totalReactPackages[i].launchDate, id: totalReactPackages[i]._id, vote: totalReactPackages[i].vote, voteToday: totalReactPackages[i].voteToday }));
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
    
    const list = [
        { key: 1, value: 10 },
        { key: 2, value: 20 },
        { key: 3, value: 30 },
        { key: 4, value: 10 },
        { key: 5, value: 20 },
        { key: 6, value: 30 },
        { key: 7, value: 10 },
        { key: 8, value: 20 }
    ];

    useEffect(() => {

      tableauLaunchService.voteHourVerif()

        
   /*      TableLaunchService.coinmarketCap('ethereum');
        console.log('okokokk');
 */
        //On initialise listAllContract 
       /*  TableLaunchService.initListAllContract(); */
        //On add la liste des contract des projet non prevente dans listAllContract
       
    }, []);

    const history = useHistory();

    return (
        <div >
            <div className={style.divSingleBlock}>
              <div className={style.sectionBackground}></div>
                {elements.map(() => {
                    return <div className={style.rectangle}>
                        <div className={style.divAllInfo}>
                            <p className={style.KYCButton}>KYC</p>
                            <div className={style.imgCrown}></div>
                          <img src="http://localhost:3000/planet9.png" className={style.imgProjectLogo}></img>
                            <h1 className={style.projectName}>BLAZE</h1>
                            <p className={style.presaleButton}>PreSale</p>

                          <p className={style.thPointer} scope="col">Type</p>
                          <p className={style.thPointer} scope="col">Market Cap</p>
                          <p className={style.thPointer} scope="col">Price</p>
                          <p className={style.thPointer} scope="col">Change in 24h</p>
                          <p className={style.thPointer} scope="col">Launch</p>
                          <p className={style.thPointer} scope="col">Votes</p>
                          <p className={style.thPointer} scope="col">Votes in 24h</p>
                          <div className={style.cardFooter}>
                            <button className={style.voteButton}>Vote</button>
                            <button className={style.buyButton}>Buy</button>
                          </div>
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
                         
                          
                        </div>
                      
                    {/* tableauLaunchService.initPriceList(TableLaunchService.getListAllContract().length) */}    
                    </div>
                })}

            </div>
        </div >


    );
}

export default Home;



