import React, { useState } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import userPool from "./userPool";
import "./Login&Signup.css";
import { Link } from "react-router-dom";

export const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();

        const user = new CognitoUser({
            Username: email,
            Pool: userPool,
        });

        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password,
        });

        user.authenticateUser(
            authDetails,
            {
                onSuccess: (session) => {
                    console.log("onSuccess: ", session);
                    const token = session.getIdToken().getJwtToken();
                    onLoginSuccess(token);
                },
                onFailure: (err) => {
                    console.error("onFailure: ", err);
                },
                newPasswordRequired: (data) => {
                    console.log("newPasswordRequired: ", data);
                },
            }
        );
    };

    return (
        <div id="loginId">
            <div id="bg"></div>
            <div className="temp">
                <form onSubmit={onSubmit}>
                    <div className="form-field">
                        <input
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required />
                    </div>
                    <div className="form-field">
                        <input
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required />
                    </div>
                    <div className="form-field">
                        <Link to="/Signup">New User?</Link>
                    </div>
                    <div className="form-field">
                        <button class="btn" type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
