import React from 'react';
import Logo from '../../components/Logo';
import NavigationUserComponent from '../../components/navigation/NavigationUser.component';
import FormulaireComponent from '../../components/user/Formulaire.component';


const Submit = () => {
    return (
        <div>
            <NavigationUserComponent />
            <Logo />

            <br />
            <br />
            <br />
            <div className='divCorpSubmit'>
                <h1 className='titleSubmit'>Submit new coin to Fantom Tribune</h1>
                <br />
                <FormulaireComponent/>

            </div>

        </div >
    );
};

export default Submit;

