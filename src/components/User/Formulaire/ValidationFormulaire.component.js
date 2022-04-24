import React from "react";
import { Link } from "react-router-dom";
import NavigationUserComponent from '../../Navigation/NavigationUser/NavigationUser.component';

const Validation = (props) => {
    /* console.log(props) */
    /*   if (props.match.path === "/confirm/:confirmationCode") {
        AuthService.verifyUser(props.match.params.confirmationCode);
      } */

    return (
        <div>
            <NavigationUserComponent />
            <br /><br /><br />
            <br /><br /><br />

            <div className="container">
                <br /><br /><br />
                <header style={{ textAlign: "center" }}>
                    <h3>
                        <strong>Project validated! Thank you for your participation  <br />

                            It will be published very soon after verification by our team <br />
                            
                        </strong>
                    </h3>
                </header>
                <br />

                <div style={{ textAlign: "center" }}>
                    <Link to={"/submit"}>
                        <button className="btn btn-success">published another project</button>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default Validation;
