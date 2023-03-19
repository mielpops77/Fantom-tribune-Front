import NavigationUserComponent from '../../Navigation/NavigationUser/NavigationUser.component';
import FooterComponent from '../../../components/Navigation/Footer/Footer.component';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AuthService from "../../../services/auth/auth.service";
import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Form from "react-validation/build/form";
import { NavLink } from "react-router-dom";
import style from "./Register.module.scss";
import { isEmail } from "validator";


const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
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


const Register = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [captcha, setCaptcha] = useState(null);


    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (captcha !== null) {



            setMessage("");
            setSuccessful(false);

            form.current.validateAll();

            if (checkBtn.current.context._errors.length === 0) {
                AuthService.register(username, email, password).then(
                    (response) => {
                        setMessage(response.data.message);
                        setSuccessful(true);
                    },
                    (error) => {
                        const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();

                        setMessage(resMessage);
                        setSuccessful(false);
                    }
                );
            }
        }
    };


    function onChange(value) {
        setCaptcha(value);
    }



    return (
        <div className={style.register_container}>
            <NavigationUserComponent />
            <div className={style.divCorSignIn}>
                <Form onSubmit={handleRegister} ref={form} className={style.form}>
                    {!successful && (
                        <div className={style.divForm}>
                            <h3 className={style.registerTitle}>Register</h3>
                            <div className={style.formGroup}>
                                <label className={style.labeSignIn}>Username</label>
                                <Input type="text"
                                    className={style.formControl}
                                    name="username"
                                    value={username}
                                    onChange={onChangeUsername}
                                    validations={[required, vusername]} placeholder="Enter Username" />
                            </div>

                            <div className={style.formGroup}>
                                <label className={style.labeSignIn}>Email address</label>
                                <Input type="email"
                                    className={style.formControl}
                                    name="email"
                                    value={email}
                                    onChange={onChangeEmail}
                                    validations={[required, validEmail]} placeholder="Enter email" />
                            </div>
                            <div className={style.formGroup}>
                                <label className={style.labeSignIn}>Password</label>
                                <Input type="password"
                                    className={style.formControl}
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}
                                    validations={[required, vpassword]} placeholder="Enter password" />
                            </div>
                            <div className={style.formCheckbox}>
                                <div className={style.controlCheckbox}>
                                    <Input type="checkbox" className={style.customControlInput} id="customCheck1" />
                                    <label className={style.customControlLabel} htmlFor="customCheck1">Remember me</label>
                                </div>
                            </div>
                            <ReCAPTCHA
                                sitekey="6LdjgCcjAAAAAKtlNP6UasdKdiBbjeQ82NAPAOtG"
                                onChange={onChange}
                                type="audio"
                            />
                            <br />

                            <button type="submit" className={style.greenButton}>Submit</button>
                        </div>)}


                    {message && (
                        <div className={style.formGroup}>
                            <div
                                className={
                                    successful ? "alert alert-success" : "alert alert-danger"
                                }
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                    <NavLink to="/login" className={style.forgotPassword}>
                        <button className={style.blueButton}>Already register? Login here</button>
                    </NavLink>
                </Form>
            </div>
            {/* <FooterComponent /> */}
        </div>
    );
};

export default Register;