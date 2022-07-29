import NavigationAdminComponent from '../../components/Navigation/NavigationAdmin/NavigationAdmin.component';
import ApiConfigComponent from '../../components/Admin/Adminitration/ApiConfig.component';

import AuthService from "../../services/auth/auth.service";
import React, { useState, useEffect } from "react";

const ApiConfig = () => {


    
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

    return (
        
        <div className ="admin">
             {showAdminBoard && (<div>
            <NavigationAdminComponent/>
            <br /><br /><br />
            <ApiConfigComponent/>
            </div>)}
        </div>
    )
}

export default ApiConfig;