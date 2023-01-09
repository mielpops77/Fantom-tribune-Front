import NavigationUserComponent from '../../../components/Navigation/NavigationUser/NavigationUser.component';
import PresalesComponent from '../../../components/User/Presales/Presales.component';
import FooterComponent from '../../../components/Navigation/Footer/Footer.component';
import AuthService from "../../../services/auth/auth.service";
import style from './Presales.page.module.scss';
import React from 'react';


const Presales = () => {
    const url = AuthService.getUrl();

    return (
        <div className={style.presales_fond}>
            <NavigationUserComponent />
            <div className={style.divSectionTitle}>
                <img src={url + "assets/presale2.png"} className={style.imgLogoSection} alt='ranked_arrow'></img>
                <p className={style.sectionTitle}>Presales{/* <span className={style.tokensTitle}>sales</span> */} </p>
            </div>
            {/* <p className={style.presales_sectionTitle}>Presales</p> */}
            <PresalesComponent />
            <div /* className={style.divFooter} */>
                <FooterComponent />
            </div>
        </div>
    );
};

export default Presales;