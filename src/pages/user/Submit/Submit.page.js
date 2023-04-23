import React, { useState } from 'react';
import FooterComponent from '../../../components/Navigation/Footer/Footer.component';
import NavigationUserComponent from '../../../components/Navigation/NavigationUser/NavigationUser.component';
import FormulaireComponent from '../../../components/User/Formulaire/Formulaire.component';
import FormulaireNftComponent from '../../../components/User/Formulaire/FormulaireNft.component';

import style from "./Submit.page.module.scss";


const Submit = () => {

    const [activeTab, setActiveTab] = useState('Token');
    return (
        <div className={style.submit_page}>
            <NavigationUserComponent />
            <div className={style.divCorpSubmit}>

                <div className={style.tabs}>
                    <div className={activeTab === 'Token' ? `${style.tab} ${style.active}` : style.tab} onClick={() => setActiveTab('Token')}>
                        Token
                    </div>
                    <div className={activeTab === 'NFT' ? `${style.tab} ${style.active}` : style.tab} onClick={() => setActiveTab('NFT')}>
                        NFT
                    </div>
                    <div className={activeTab === 'Giveaway' ? `${style.tab} ${style.active}` : style.tab} onClick={() => setActiveTab('Giveaway')}>
                        Giveaway
                    </div>
                </div>
                <hr></hr>
                {activeTab === 'Token' &&
                    <h1 className={style.titleSubmit}>Submit new coin to Fantom Tribune</h1>}
                {activeTab === 'NFT' &&
                    <h1 className={style.titleSubmit}>Submit new NFT to Fantom Tribune</h1>}
                {activeTab === 'Giveaway' &&
                    <h1 className={style.titleSubmit}>Submit new giveaway to Fantom Tribune</h1>}
                
                {activeTab === 'Token' &&
                <p className={style.subtitleSubmit}>After validation by our team, your coin will be visible on the all token page and the list of presales if the one is still in the presale phase.</p>
    }
                 {activeTab === 'NFT' &&
                <p className={style.subtitleSubmit}>After validation by our team, your nft will be visible on the nft page</p>
    }
                <br />

                {activeTab === 'Token' && <FormulaireComponent />}
                {activeTab === 'NFT' && <FormulaireNftComponent />}
                {activeTab === 'Giveaway' && <FormulaireComponent />}
            </div>
            <div /* className={style.FooterComponent} */><FooterComponent /></div>

        </div >
    );
};

export default Submit;

