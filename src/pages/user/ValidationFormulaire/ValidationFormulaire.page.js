import NavigationUserComponent from '../../../components/Navigation/NavigationUser/NavigationUser.component';
import FooterComponent from '../../../components/Navigation/Footer/Footer.component';
import style from "./ValidationFormulaire.page.module.scss";
import { Link } from "react-router-dom";
import React from "react";

const ValidationFormulaire = (props) => {
    let path = window.location.href;

    //Version Distant
    const typeForm = path.substring(56, path.length);


    // Version Local 
    /* const typeForm = path.substring(37, path.length); */
    console.log("typeForm", typeForm)


    /*  console.log('dddd', props) */
    /*  if (props.match.path === "/confirm/:confirmationCode") {
       AuthService.verifyUser(props.match.params.confirmationCode);
     } */

    return (
        <div className={style.validationFormulaire_fond}>
            <NavigationUserComponent />
            <br /><br /><br />
            <br /><br /><br />

            <div className="container">
                <br /><br /><br />
                <header style={{ textAlign: "center" }}>
                    {
                        typeForm === "Submit" && <h3>
                            <strong className={style.validationFormulaire_text}>Project validated! Thank you for your participation  <br />
                                It will be published very soon after verification by our team <br />

                            </strong>
                        </h3>
                    }

                    {
                        typeForm === "Update" && <h3>
                            <strong className={style.validationFormulaire_text}>Update validated! Thank you for your participation  <br />
                                It will be published very soon after verification by our team <br />

                            </strong>
                        </h3>
                    }
                </header>
                <br />

                <div style={{ textAlign: "center" }}>
                    {typeForm === "Submit" &&
                        <Link to={"/submit"}>
                            <button className="btn btn-success">published another project</button>
                        </Link>}
                    {typeForm === "Update" &&
                        <Link to={"/updateCoin"}>
                            <button className="btn btn-success">update another project</button>
                        </Link>}

                </div>
            </div>
            <div className={style.validationFormulaire_divFooter}>
                <FooterComponent />
            </div>
        </div>
    );
};

export default ValidationFormulaire;
