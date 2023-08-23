import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login&Signup.css";
import userPool from "./userPool";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();

        userPool.signUp(email, password, [], null, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
                navigate("/");
            }
        });
    };

    return (
        <div id="loginId">
            <div id="bg"></div>
            <div className="temp">
                <form onSubmit={onSubmit}>
                    <div className="form-field">
                        <input placeholder="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
                    </div>
                    <div className="form-field">
                        <input placeholder="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                    </div>
                    <div className="form-field">
                        <button class="btn" type="submit">Signup</button>
                    </div>
                </form>
            </div>
        </div>
    );
};