import { useState } from "react";
import { Redirect } from "react-router-dom";

import './login.css';

const Login = ({ auth }) => {
    const [redirect, setRedirect] = useState(false);
    const [cred, setCred] = useState({
        username: '',
        password: ''
    })

    const login = (e) => {
        e.preventDefault();
        auth.authenticate(cred, () => {
            setRedirect(true);
        })
    }

    const handleChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value });
    }

    if (redirect === true) {
        return <Redirect to='/home' />
    }

    return (
        <div className="login">
            <form className="login-form" onSubmit={login}>
                <h2>Login</h2>

                <div className="inputGroup">

                    <label>Username</label>
                    <input type="text" name="username" value={cred.username} onChange={handleChange} />
                </div>

                <div className="inputGroup">
                    <label>Password</label>
                    <input type="password" name="password" value={cred.password} onChange={handleChange} />
                </div>
                <div className="inputGroup">
                    <input className="loginBtn" type="submit" value="Login" />
                </div>
            </form>
        </div>
    )
}

export default Login;