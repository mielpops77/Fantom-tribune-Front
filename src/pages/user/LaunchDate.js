import NavigationUserComponent from '../../components/navigation/NavigationUser.component';
import TableauLaunchComponent from '../../components/user/TableauLaunch.component';
import Logo from '../../components/Logo';
import React from 'react';


const About = () => {
    return (
        <div>
            <NavigationUserComponent/>
            <Logo/>
            <br /><br /><br />
            <TableauLaunchComponent/>
        </div>
    );
};

export default About;