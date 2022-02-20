import React from 'react';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import Formulaire from '../components/Formulaire';


const Submit = () => {
    return (
        <div>
            <Navigation />
            <Logo />

            <br />
            <br />
            <br />
            
            <div className='divCorpSubmit'>


                <h1 className='titleSubmit'>Submit new coin to Fantom Tribune</h1>
                <br />
                <Formulaire />

            </div>

        </div >
    );
};

export default Submit;

