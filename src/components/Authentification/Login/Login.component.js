import React, { useState, useRef } from "react";
import AuthService from "../../../services/auth/auth.service"
import NavigationUserComponent from "../../Navigation/NavigationUser/NavigationUser.component";
import FooterComponent from '../../../components/Navigation/Footer/Footer.component';
import { NavLink } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import style from "./Login.module.scss";


const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const Login = (props) => {

    console.log('propsssssssss',props)
    const form = useRef();
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

        console.log('form',form);

        /* form.current.validateAll(); */

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.login(mail, password).then(
                () => {
                    props.history.push("/profile");
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
        <div>
            <NavigationUserComponent />
            <div className={style.divCorSignIn}>
                <Form onSubmit={handleLogin}  >
                    <h3 className={style.loginTitle}>Login</h3>
                    <div className={style.formGroup}>
                        <label className={style.labeSignIn}>Email address</label>
                        <Input type="email" className={style.formControl} name="mail" value={mail} onChange={onChangeMail} validations={[required]} placeholder="Enter email" />
                    </div>
                    <div className={style.formGroup}>
                        <label className={style.labeSignIn}>Password</label>
                        <Input type="password" className={style.formControl} placeholder="Enter password" name="password" value={password} onChange={onChangePassword} validations={[required]} />
                    </div>
                    <div className={style.formCheckbox}>
                        <div className={style.controlCheckbox}>
                            <Input type="checkbox" className={style.customControlInput} id="customCheck1" />
                            <label className={style.customControlLabel} htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    <div className={style.loginButton}>
                        <button className={style.greenButton} disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>

                    {message && (
                        <div className={style.formGroup}>
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display:"none" }} ref={checkBtn} />

                    <NavLink to="/register" className={style.register}>
                        <button className={style.blueButton}>No Account? Register Here</button>
                    </NavLink>
                    
                    <p className={style.forgotPassword}>
                        Forgot <a className={style.link} style={{ color: "#167bff" }} href="#"> password?</a>
                    </p>
                </Form>
            <div className={style.divFooter}>
                <FooterComponent />
            </div>
            </div>
        </div>
        

    );
};

export default Login;
