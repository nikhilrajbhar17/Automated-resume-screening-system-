import React, { useState } from "react";
import axios from "axios";

const Auth = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");

  const handleAuth = async () => {
    console.log("inside auth function");
    const endpoint = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/signup";
    const data = { email, password, username };

    try {
      console.log(
        "going to make api request with data: " + JSON.stringify(data)
      );
      const res = await axios.post(endpoint, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setToken(res.data.token);
      setMessage("Authentication Successful");
    } catch (err) {
      setMessage("Authentication Failed");
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <input
        type="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleAuth}>{isLogin ? "Login" : "Sign Up"}</button>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Switch to Sign Up" : "Switch to Login"}
      </button>
      <p>{message}</p>
    </div>
  );
};

export default Auth;
