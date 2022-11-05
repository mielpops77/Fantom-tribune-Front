import NavigationAdminComponent from '../../../components/Navigation/NavigationAdmin/NavigationAdmin.component';
import AdministrationComponent from '../../../components/Admin/Adminitration/Administration.component'
import AuthService from "../../../services/auth/auth.service";
import React, { useState, useEffect } from "react";
import style from './Administration.page.module.scss';

const Administration = () => {


    
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  // const [setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      /* setCurrentUser(user); */
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, /* [setCurrentUser] */);

    return (
        
        <div className ={style.administration_fond}>
             {showAdminBoard && (<div>
            <NavigationAdminComponent/>
            <br /><br /><br />
            <AdministrationComponent/>
            <h1>
            </h1>
            </div>)}
        </div>
    )
}

export default Administration;