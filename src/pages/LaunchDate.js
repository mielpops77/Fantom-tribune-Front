import TableauLaunch from '../components/TableauLaunch';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo';
import React from 'react';


const About = () => {
    return (
        <div>
            <Navigation/>
            <Logo/>
            <br /><br /><br />
            <TableauLaunch/>
        </div>
    );
};

export default About;