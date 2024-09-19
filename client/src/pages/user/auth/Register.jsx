import React, { useState } from "react";
import {Link,useNavigate} from 'react-router-dom'

import "../../../css/Login.scss";
import { useAuth } from "../../../contexts/authContext";
import Alert from "../../../components/Alert";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate()
  const [error,setError] = useState("")
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/user/register",{
        method: "POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({
          userName: username,
          address: address,
          contact: contact,
          email: email, 
          password: password
        })
      })
      const data= await response.json()
      console.log(data)
      if(data.success){
        navigate("/login")
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
      <h2>Register Form</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="number"
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type="submit">Register</button>
        <Link to="/login">Already have an account? Login</Link>
      </form>
    </div>
  );
};

export default Register;
