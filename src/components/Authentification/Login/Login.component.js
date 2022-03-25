import React, { useState, useRef } from "react";
import AuthService from "../../../services/auth/auth.service"
import NavigationUserComponent from "../../Navigation/NavigationUser/NavigationUser.component";
import { NavLink } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import "./Login.scss";


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
        <div className="divComp">
            <NavigationUserComponent />
            <div className='divCorSignIn'>
                <Form onSubmit={handleLogin}  >
                    <h3 className='titleSignIn'>Login</h3>
                    <div className="form-group">
                        <label className='labeSignIn'>Email address</label>
                        <Input type="email" className="form-control" name="mail" value={mail} onChange={onChangeMail} validations={[required]} placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label className='labeSignIn'>Password</label>
                        <Input type="password" className="form-control" placeholder="Enter password" name="password" value={password} onChange={onChangePassword} validations={[required]} />
                    </div>
                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <Input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <button id='buttonSubmitSignIn' className="btn btn-success btn-block" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>

                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />

                    <NavLink
                        to="/register"
                    >
                        <button style={{ marginTop: "8px" }} id='noAccount' className="btn btn-primary btn-block">No Account? Register Here</button>
                    </NavLink>


                    <p className="forgot-password-text-righ">
                        Forgot <a style={{ color: "#167bff" }} href="#">password?</a>
                    </p>
                </Form>
            </div>
        </div>

    );
};

export default Login;
