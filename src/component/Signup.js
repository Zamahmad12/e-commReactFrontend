import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);
   const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };
const handleSignup = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);

      if (profilePic) {
        formData.append("profilePic", profilePic);
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
        method: "POST",
        body: formData, 
      });

      const data = await response.json();
      console.log("Signup Response:", data);

      if (data.token) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Something went wrong");
    }
  };    
  return (
    <div className="signup-container" style={{ height: "380px" }}>
      <h1 className="signup-header">Signup Page</h1>
      <input
        className="input-box"
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="input-box"
        type="text"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input-box"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="input-box"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      <button className="signup-button" onClick={handleSignup}>
        Signup
      </button>
    </div>
  );
};
export default Signup;
