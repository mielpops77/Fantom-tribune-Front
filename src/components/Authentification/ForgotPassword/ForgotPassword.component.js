import NavigationUserComponent from "../../Navigation/NavigationUser/NavigationUser.component";
import FooterComponent from '../../../components/Navigation/Footer/Footer.component';
import AuthService from "../../../services/auth/auth.service"
import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import style from "./ForgotPassword.module.scss";



const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const ForgotPassword = (props) => {
    let navigate = useNavigate();
    //const form = useRef();
    const checkBtn = useRef();
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeMail = (e) => {
        const mail = e.target.value;
        setMail(mail);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);


        /* form.current.validateAll(); */

        if (checkBtn.current.context._errors.length === 0) {

            AuthService.verifMail(mail).then(
                () => {
                    /* navigate("/"); */
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

    return (
        <div  className={style.forgotPassword_fond}>
            <NavigationUserComponent />
            <div className={style.divCorSignIn}>
                <Form onSubmit={handleLogin} className={style.form}>
                    <h3 className={style.loginTitle}>Forgot Password</h3>
                    <div className={style.formGroup}>
                        <label className={style.labeSignIn}>Email address</label>
                        <Input type="email" className={style.formControl} name="mail" value={mail} onChange={onChangeMail} validations={[required]} placeholder="Enter email" />
                    </div>
                
                   

                    <div className={style.loginButton}>
                        <button className={style.greenButton} disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Email Password Reset Link</span>
                        </button>
                    </div>

                    {message && (
                        <div className={style.formGroup}>
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />

                  

                </Form>
            </div>
            <FooterComponent />
        </div>


    );
};

export default ForgotPassword;
