import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LogIn.css";

function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();

        // Replace this with actual backend call
        console.log("Registered:", { username, password });

        alert("Account created successfully!");
        navigate("/login");
    };

    return (
        <div className="signup-cont">
            <div className="logo-title-cont">
                <div className="logo-title">
                    <img src="/budget.png" alt="Budget Logo" className="logo" />
                    <h1>Budget Allocation System</h1>
                </div>
            </div>
            <div className="login-container">
                <h2>Sign Up</h2>
                <form onSubmit={handleSignUp} className="login-form">
                    <label>
                        Username
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>

                    <button type="submit">Create Account</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;