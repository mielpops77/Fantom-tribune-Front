import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo';
import React from 'react';
import { NavLink } from "react-router-dom";



function Login() {


    return (
        <div>
            <Navigation />
            <Logo />
            <br /><br /><br /><br /><br /><br /><br />
            <div className='divCorSignIn'>
                <form>
                    <h3 className='titleSignIn'>Login</h3>
                    <div className="form-group">
                        <label className='labeSignIn'>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label className='labeSignIn'>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" />
                    </div>
                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>
                    <button type="submit" id='buttonSubmitSignIn' className="btn btn-success btn-block">Submit</button>
                    <NavLink
                        to="/register"
                     >
                        <button style={{ marginTop: "8px" }} id='noAccount' className="btn btn-primary btn-block">No Account? Register Here</button>
                    </NavLink>
                   

                    <p className="forgot-password-text-righ">
                        Forgot <a style={{ color: "#167bff" }} href="#">password?</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;