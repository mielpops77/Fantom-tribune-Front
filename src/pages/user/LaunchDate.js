import NavigationUserComponent from '../../components/Navigation/NavigationUser/NavigationUser.component';
import TableauLaunchComponent from '../../components/User/TableauLaunch/TableauLaunch.component';
import FooterComponent from '../../components/Navigation/Footer/Footer.component';
import React from 'react';


const About = () => {
    return (
        <div>
            <NavigationUserComponent/>
            <br /><br /><br />
            <TableauLaunchComponent/>
        <FooterComponent/>
        </div>
    );
};

export default About;