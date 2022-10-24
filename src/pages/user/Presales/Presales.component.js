import NavigationUserComponent from '../../../components/Navigation/NavigationUser/NavigationUser.component';
import PresalesComponent from '../../../components/User/Presales/Presales.component';
import FooterComponent from '../../../components/Navigation/Footer/Footer.component';
import style from './Presales.module.scss';
import React from 'react';


const Presales = () => {
    return (
        <div className={style.presales_fond}>
            <NavigationUserComponent/>
            <p className={style.presales_sectionTitle}>Presales</p>
            <PresalesComponent/>
            <div className={style.divFooter}> 
                <FooterComponent/>
            </div> 
        </div>
    );
};

export default Presales;