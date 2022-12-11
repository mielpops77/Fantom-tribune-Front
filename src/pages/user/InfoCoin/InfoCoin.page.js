import NavigationUserComponent from '../../../components/Navigation/NavigationUser/NavigationUser.component';
import InfoCoinComponent from '../../../components/User/InfoCoin/InfoCoin.component';
import FooterComponent from '../../../components/Navigation/Footer/Footer.component';
import style from './InfoCoin.page.module.scss';
import React from 'react';


const InfoCoin = () => {
    return (
        <div className={style.InfoCoin_fond}>
            <NavigationUserComponent />
            {/* <p className={style.sectionTitle}>Presales</p> */}
            <InfoCoinComponent />
            <div className={style.divFooter}>
                <FooterComponent />
            </div>
        </div>
    );
};

export default InfoCoin;