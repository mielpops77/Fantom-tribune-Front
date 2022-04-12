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
                <hr></hr>
                <FormulaireComponent/>
            </div>
        <FooterComponent/>
        </div >
    );
};

export default Submit;

