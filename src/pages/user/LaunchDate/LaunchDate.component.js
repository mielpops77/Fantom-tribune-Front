import NavigationUserComponent from '../../../components/Navigation/NavigationUser/NavigationUser.component';
import TableauLaunchComponent from '../../../components/User/TableauLaunch/TableauLaunch.component';
import FooterComponent from '../../../components/Navigation/Footer/Footer.component';
import style from './LaunchDate.module.scss';
import React from 'react';


const About = () => {
    return (
        <div>
            <NavigationUserComponent/>
            <br /><br /><br />
            <TableauLaunchComponent/>
            <div className={style.divFooter}> 
                <FooterComponent/>
            </div> 
        </div>
    );
};

export default About;