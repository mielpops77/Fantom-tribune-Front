import React from 'react';
import FooterComponent from '../../../components/Navigation/Footer/Footer.component';
import NavigationUserComponent from '../../../components/Navigation/NavigationUser/NavigationUser.component';
import FormulaireComponent from '../../../components/User/Formulaire/Formulaire.component';
import style from "./Submit.module.scss";


const Submit = () => {
    return (
        <div>
            <NavigationUserComponent />
            <div className={style.divCorpSubmit}>
                <h1 className={style.titleSubmit}>Submit new coin to Fantom Tribune</h1>
                <p className={style.subtitleSubmit}>After validation by our team, your coin will be visible on the ecosystem page and the list of new projects if the one is still in the presale phase.</p>
                <hr></hr>

            
                <FormulaireComponent/>
            </div>
                <FooterComponent/>
        </div >
    );
};

export default Submit;

