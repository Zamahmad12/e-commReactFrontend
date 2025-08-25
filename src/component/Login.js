import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../apiconfig";

const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            navigate("/");
        }
    }, []);
    const handlelogin = async () => {
                console.log("API URL:", API_URL);

        let result = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        result = await result.json();

        console.log("Login Response:", result);
        if (result.token) {
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.token));

            alert("Login successful");
            navigate("/");
        } else {
            alert("Please enter valid details");
        }
    };
    return (
        <div className="signup-container">
            <h1 className="signup-header">Login</h1>
            <input className="input-box" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="input-box" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="signup-button" onClick={handlelogin}>Login</button>
        </div>
    );
};
export default Login;