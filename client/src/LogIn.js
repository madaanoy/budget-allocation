import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LogIn.css";

function LogIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (username === "admin" && password === "password") {
            navigate("/");
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="login-cont">
            <div className="logo-title-cont">
                <div className="logo-title">
                    <img src="/budget.png" alt="Budget Logo" className="logo" />
                    <h1>Budget Allocation System</h1>
                </div>
            </div>
            <div className="login-container">
                <h2>Log In</h2>
                <form onSubmit={handleLogin} className="login-form">
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

                    <button type="submit">Log In</button>
                </form>

                <p className="signup-link">
                    Don’t have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}

export default LogIn;