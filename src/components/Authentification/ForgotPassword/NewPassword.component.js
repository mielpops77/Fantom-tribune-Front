import NavigationUserComponent from '../../Navigation/NavigationUser/NavigationUser.component';
import FooterComponent from '../../../components/Navigation/Footer/Footer.component';
import AuthService from "../../../services/auth/auth.service";
import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import style from "./NewPassword.module.scss"
import axios from "axios";


const NewPassword = (props) => {

    let url = window.location.href;
    const [error, setError] = useState(false);

    const checkBtn = useRef();
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");



    const required = (value) => {
        if (!value) {
            return (
                <div className="alert alert-danger" role="alert">
                    This field is required!
                </div>
            );
        }
    };
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const onChangePasswordConfirm = (e) => {
        const password = e.target.value;
        setPasswordConfirm(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
        if (checkBtn.current.context._errors.length === 0) {

            AuthService.login(mail, password).then(
                () => {
                    /*  navigate("/"); */
                    /*  props.history.push("/launchDate"); */
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        } else {
            setLoading(false);
        }
    };




    const API_URL = AuthService.getUrl() + "api/auth/"
    const verifyUser = (code) => {
        return axios.get(API_URL + "confirm/" + code).then((response) => {
            return response.data;

        }, (error) => {
            setError(true)
            console.log('errooooooor', error.response)
        }
        );
    };


    //If local
    verifyUser(url.substr(37));

    //If distant
    /* verifyUser(url.substr(56)); */


    /*   console.log(props)
      if (props.match.path === "/confirm/:confirmationCode") {
        AuthService.verifyUser(props.match.params.confirmationCode);
      } */
    return (

        < div className={style.newPassword_fond} >
            {!error && <div>
                <NavigationUserComponent />
                <div className={style.newPassword_divCorSignIn}>
                    <Form onSubmit={handleLogin} className={style.newPassword_form}>
                        <h3 className={style.newPassword_title}>Reset Password</h3>
                        <div className={style.newPassword_formGroup}>
                            <label className={style.newPassword_labeSignIn}>Password</label>
                            <Input type="password" className={style.newPassword_formControl} placeholder="Enter password" name="password" value={password} onChange={onChangePassword} validations={[required]} />
                        </div>
                        <div className={style.newPassword_formGroup}>
                            <label className={style.newPassword_labeSignIn}>Confirm Password</label>
                            <Input type="password" className={style.newPassword_formControl} placeholder="Enter password" name="passwordConfirm" value={passwordConfirm} onChange={onChangePasswordConfirm} validations={[required]} />
                        </div>
                        <div className={style.newPassword_formCheckbox}>
                            <div className={style.newPassword_controlCheckbox}>
                                <Input type="checkbox" className={style.newPassword_customControlInput} id="customCheck1" />
                                <label className={style.newPassword_customControlLabel} htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>

                        <div className={style.newPassword_button}>
                            <button className={style.newPassword_greenButton} disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Reset password</span>
                            </button>
                        </div>

                        {message && (
                            <div className={style.newPassword_formGroup}>
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                        <CheckButton style={{ display: "none" }} ref={checkBtn} />

                    </Form>
                </div>
                <FooterComponent />
            </div >}
        </div>
        /*     <div >
              <div className={style.welcome_fond}>
              <NavigationUserComponent />
              </div>
              <div className="container">
                <br /><br /><br />
                <header className="jumbotron">
                  {!error &&
                    < h3 >
                    <strong>Account confirmed!</strong>
                  </h3>}
                  {error &&
                    < h3 >
                    <strong>Error code Account no confirmed!</strong>
                  </h3>}
              </header>
              <Link to={"/login"} className="nav-link">
                Please Login
              </Link>
            </div>
            </div > */
    );
};

export default NewPassword;
