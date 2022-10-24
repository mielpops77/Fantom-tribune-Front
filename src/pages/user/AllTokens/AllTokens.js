import NavigationUserComponent from '../../../components/Navigation/NavigationUser/NavigationUser.component';
import AllTokensComponent from '../../../components/User/AllTokens/AllTokens.component';
import FooterComponent from '../../../components/Navigation/Footer/Footer.component';
import style from './AllTokens.module.scss';
import React from 'react';


const AllTokens = () => {
    return (
        <div className={style.allTokens_fond}>
            <NavigationUserComponent/>
            <p className={style.allTokens_sectionTitle}>All Tokens</p>
            <AllTokensComponent/>
            <div /* className={style.divFooter} */>
                <FooterComponent/>
            </div >
            
        </div>
    );
};

export default AllTokens;