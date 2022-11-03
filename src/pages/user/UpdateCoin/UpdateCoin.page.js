import NavigationUserComponent from '../../../components/Navigation/NavigationUser/NavigationUser.component';
import UpdateCoinComponent from '../../../components/User/UpdateCoin/UpdateCoin.component';
import FooterComponent from '../../../components/Navigation/Footer/Footer.component';
import style from "./UpdateCoin.page.module.scss";
import React from 'react';


const UpdateCoin = () => {
    return (
        <div className={style.updateCoinPage_fond}>
            <NavigationUserComponent />
            <div className={style.updateCoinPage_divCorpSubmit}>
                <h1 className={style.updateCoinPage_titleSubmit}>Update Coin</h1>
                <p className={style.updateCoinPage_subtitleSubmit}>To update coin information like the logo, contract address or social links, please fill out the form below.</p>
                <hr></hr>
                <UpdateCoinComponent/>
            </div>
            <div><FooterComponent/></div>
                
        </div >
    );
};

export default UpdateCoin;

