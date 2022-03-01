import React from 'react';
import Navigation from '../components/Navigation';
import Formulaire from '../components/Formulaire';


const Submit = () => {
    return (
        <div>
            <Navigation />
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

