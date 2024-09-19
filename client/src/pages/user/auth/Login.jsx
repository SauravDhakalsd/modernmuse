import React, { useState } from "react";
import {Link,useNavigate} from 'react-router-dom'

import "../../../css/Login.scss";
import { useAuth } from "../../../contexts/authContext";
import Alert from "../../../components/Alert";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate()
  const {value,makeValue} = useAuth()
  const [error,setError] = useState("")
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/user/login",{
        method: "POST",
        headers:{
          'content-type':"application/json"
        },
        body:JSON.stringify({
          email: email, 
          password: password
        })
      })
      const data= await response.json()
      console.log(data)
      if(data.success){
        makeValue(data.data)
        navigate("/")
      }
      else{
        setError(data.message)
        setTimeout(()=>{setError("")},3000)
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="loginForm">
      {error && <Alert error message={error}></Alert>}
      <h2>Login Form</h2>
      <form onSubmit={handleLogin}>
      
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <Link to="/register">Create an account</Link>
      </form>
    </div>
  );
};

export default Login;
