import NavigationUserComponent from '../../Navigation/NavigationUser/NavigationUser.component';
import FooterComponent from '../../../components/Navigation/Footer/Footer.component';
import AuthService from "../../../services/auth/auth.service";
import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import React, { useEffect, useState, useRef } from "react";
import Form from "react-validation/build/form";
import style from "./NewPassword.module.scss"
import axios from "axios";


const NewPassword = (props) => {

    let url = window.location.href;
    const [error, setError] = useState(false);

    const checkBtn = useRef();
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [passwordIdentical, setpasswordIdentical] = useState(true);



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

    //If distant
    /* verifyUser(url.substr(56)); */
    useEffect(() => {
        verifyUser(url.substr(37));

    }, []);

    const required = (value) => {
        if (!value) {
            return (
                <div className="alert alert-danger" role="alert">
                    This field is required!
                </div>
            );
        }
    };

    const vpassword = (value) => {
        if (value.length < 6 || value.length > 40) {
            return (
                <div className="alert alert-danger" role="alert">
                    The password must be between 6 and 40 characters.
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
        e.preventDefault()
        console.log('kokokk');
        if (password === passwordConfirm && (password.length >= 6  && password.length <= 40) && (passwordConfirm.length >= 6 || passwordConfirm.length <= 40)) {
            setpasswordIdentical(true);
            passwordChange();

        }
        else {
            setpasswordIdentical(false);
            console.log("password non identique");
        }
    };
    const passwordChange = () => {
        let confirmationCode = url.substr(37);
        return axios.put(API_URL + `passwordChange?password=${password}&confirmationCode=${confirmationCode}`).then((response) => {
            return response.data;

        }, (error) => {
            /*  setError(true) */
            console.log('errooooooor', error.response)
        }
        );
    };






    return (

        < div className={style.newPassword_fond} >
            {!error && <div>
                <NavigationUserComponent />
                <div className={style.newPassword_divCorSignIn}>
                    <Form onSubmit={handleLogin} className={style.newPassword_form}>
                        <h3 className={style.newPassword_title}>Reset Password</h3>
                        <div className={style.newPassword_formGroup}>
                            <label className={style.newPassword_labeSignIn}>Password</label>
                            <Input type="password" className={style.newPassword_formControl} placeholder="Enter password" name="password" value={password} onChange={onChangePassword} validations={[required, vpassword]} />
                        </div>
                        <div className={style.newPassword_formGroup}>
                            <label className={style.newPassword_labeSignIn}>Confirm Password</label>
                            <Input type="password" className={style.newPassword_formControl} placeholder="Enter password" name="passwordConfirm" value={passwordConfirm} onChange={onChangePasswordConfirm} validations={[required, vpassword]} />
                        </div>
                        <div className={style.newPassword_formCheckbox}>
                            <div className={style.newPassword_controlCheckbox}>
                                <Input type="checkbox" className={style.newPassword_customControlInput} id="customCheck1" />
                                <label className={style.newPassword_customControlLabel} htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>

                        {!passwordIdentical && <p>

                            <div className="alert alert-danger" role="alert">
                                The password confirmation does not match.
                            </div>
                        </p>}

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

    );
};

export default NewPassword;
