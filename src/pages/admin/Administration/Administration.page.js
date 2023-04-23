import NavigationAdminComponent from '../../../components/Navigation/NavigationAdmin/NavigationAdmin.component';
import AdministrationComponent from '../../../components/Admin/Adminitration/Administration.component'
import AuthService from "../../../services/auth/auth.service";
import React, { useState, useEffect } from "react";
import style from './Administration.page.module.scss';
import FooterComponent from '../../../components/Navigation/Footer/Footer.component';

const Administration = () => {

  const [showAdminBoard, setShowAdminBoard] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  return (
    <div className={style.administration_fond}>
      <div className={style.content_wrapper}>
        {showAdminBoard && (
          <div>
            <NavigationAdminComponent />
            <br />
            <br />
            <br />
            <AdministrationComponent />
          </div>
        )}
      </div>
      <FooterComponent />
    </div>
  );
}

export default Administration;
