import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavigationUserComponent from '../../components/navigation/NavigationUser.component';
import Logo from '../../components/Logo';
import React from 'react';
import { NavLink } from "react-router-dom";

const SignIn = () => {
    return (
        <div>
            <NavigationUserComponent />
            <Logo />
            <br /><br /><br /><br /><br /><br /><br />
            <div className='divCorSignIn'>
                <form>
                    <h3 className='titleSignIn'>Register</h3>
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
                    <button type="submit" id='buttonSubmitSignIn' className="btn btn-primary btn-block">Submit</button>
                    <NavLink to="/login"><p className="forgot-password-text-righ">
                        Already registered? <a style={{ color: "#167bff" }} href="#"> Login here</a>
                    </p></NavLink>
                </form>
            </div>
        </div>
    );
};

export default SignIn;