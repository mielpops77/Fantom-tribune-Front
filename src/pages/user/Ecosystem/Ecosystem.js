import NavigationUserComponent from '../../../components/Navigation/NavigationUser/NavigationUser.component';
import EcosystemComponent from '../../../components/User/Ecosystem/Ecosystem.component';
import FooterComponent from '../../../components/Navigation/Footer/Footer.component';
import style from './Ecosystem.module.scss';
import React from 'react';


const Ecosystem = () => {
    return (
        <div>
            <NavigationUserComponent/>
            <EcosystemComponent/>
            <div className={style.divFooter}>
                <FooterComponent/>
            </div >
            
        </div>
    );
};

export default Ecosystem;