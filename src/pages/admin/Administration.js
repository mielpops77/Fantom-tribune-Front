import NavigationAdminComponent from '../../components/navigation/NavigationAdmin.component';
import AdministrationComponent from '../../components/admin/Administration.component'
import React, { useState, useEffect } from "react";
import AuthService from "../../services/auth.service";
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