import React from 'react';
import NavigationUserComponent from '../../components/navigation/NavigationUser.component';
import FormulaireComponent from '../../components/user/Formulaire.component';


const Submit = () => {
    return (
        <div>
            <NavigationUserComponent />
            <div className='divCorpSubmit'>
                <h1 className='titleSubmit'>Submit new coin to Fantom Tribune</h1>
                <hr></hr>
                <FormulaireComponent/>
            </div>
        </div >
    );
};

export default Submit;

