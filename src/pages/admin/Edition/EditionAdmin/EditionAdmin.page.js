import NavigationAdminComponent from '../../../../components/Navigation/NavigationAdmin/NavigationAdmin.component';
import EditionAdminComponent from '../../../../components/Admin/Edition/EditionAdmin.component';
import AuthService from "../../../../services/auth/auth.service";
import React, { useState, useEffect } from "react";

const EditionAdmin = () => {

  const [showAdminBoard, setShowAdminBoard] = useState(false);
  // const [setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      // setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

    return (
        
        <div className ="admin">
             {showAdminBoard && (<div>
            <NavigationAdminComponent/>
            <br /><br /><br />
            <EditionAdminComponent/>
            </div>)}
        </div>
    )
}

export default EditionAdmin;