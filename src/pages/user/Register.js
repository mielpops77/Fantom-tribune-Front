import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavigationUserComponent from '../../components/navigation/NavigationUser.component';
import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../../services/auth.service";


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
    };

    return (
        <div>
            <NavigationUserComponent />
            <br /><br /><br /><br /><br /><br /><br />
            <div className='divCorSignIn'>
                <Form onSubmit={handleRegister} ref={form}>
                    {!successful && (
                        <div>
                            <h3 className='titleSignIn'>Register</h3>
                            <div className="form-group">
                                <label className='labeSignIn'>Username</label>
                                <Input type="text"
                                    className="form-control"
                                    name="username"
                                    value={username}
                                    onChange={onChangeUsername}
                                    validations={[required, vusername]} placeholder="Enter Username" />
                            </div>

                            <div className="form-group">
                                <label className='labeSignIn'>Email address</label>
                                <Input type="email"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={onChangeEmail}
                                    validations={[required, validEmail]} placeholder="Enter email" />
                            </div>
                            <div className="form-group">
                                <label className='labeSignIn'>Password</label>
                                <Input type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}
                                    validations={[required, vpassword]} placeholder="Enter password" />
                            </div>
                            <div className="form-group">
                                <div className="custom-control custom-checkbox">
                                    <Input type="checkbox" className="custom-control-input" id="customCheck1" />
                                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                </div>

                                <button type="submit" id='buttonSubmitSignIn' className="btn btn-primary btn-block">Submit</button>
                            </div>
                        </div>)}
                    {message && (
                        <div className="form-group">
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

                    <NavLink to="/login"><p className="forgot-password-text-righ">
                        Already registered? <a style={{ color: "#167bff" }} href="#"> Login here</a>
                    </p></NavLink>



                </Form>
            </div>
        </div>
    );
};

export default Register;