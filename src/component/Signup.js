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
    if (auth) navigate("/");
  }, [navigate]);

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSignup = async () => {
    try {
      let profilePicUrl = "";

      if (profilePic) {
        // 1️⃣ Get Cloudinary signature from backend
        const sigRes = await fetch(
          `${process.env.REACT_APP_API_URL}/api/cloudinary/get-signature`
        );
        if (!sigRes.ok) throw new Error("Failed to get Cloudinary signature");
        const sigData = await sigRes.json();
        console.log("Signature Data:", sigData);

        // 2️⃣ Upload image directly to Cloudinary
        const formData = new FormData();
        formData.append("file", profilePic);
        formData.append("api_key", sigData.apiKey);
        formData.append("timestamp", sigData.timestamp);
        formData.append("signature", sigData.signature);
        formData.append("folder", sigData.folder);

        const cloudRes = await fetch(
          `https://api.cloudinary.com/v1_1/${sigData.cloudName}/image/upload`,
          { method: "POST", body: formData }
        );

        if (!cloudRes.ok) {
          const errorText = await cloudRes.text(); // read Cloudinary error
          console.error("Cloudinary upload error:", errorText);
          throw new Error("Cloudinary upload failed");
        }

        const cloudData = await cloudRes.json();
        profilePicUrl = cloudData.secure_url;
        console.log("✅ Uploaded to Cloudinary:", profilePicUrl);
      }

      // 3️⃣ Send signup data to backend
      const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          profilePic: profilePicUrl, // store Cloudinary URL
        }),
      });

      if (!response.ok) throw new Error("Signup request failed");
      const data = await response.json();
      console.log("Signup Response:", data);

      if (data.token) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        alert("Signup failed: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed: " + error.message);
    }
  };

  return (
    <div className="signup-container" style={{ height: "420px" }}>
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
