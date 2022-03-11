import NavigationAdminComponent from '../../components/Navigation/NavigationAdmin/NavigationAdmin.component';
import AdministrationComponent from '../../components/Admin/Adminitration/Administration.component'
import AuthService from "../../services/auth/auth.service";
import React, { useState, useEffect } from "react";

const Administration = () => {


    
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
            <AdministrationComponent/>
            <h1>
                Admin
            </h1>
            </div>)}
        </div>
    )
}

export default Administration;