import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
const [formData , setFormdata] = useState({
  email : "",
  password : ""
})
const handleChange = (e)=>{
    setFormdata({...formData,[e.target.name] : e.target.value})
}

const handleSubmit = (e)=>{
  e.preventDefault();
  console.log(formData)
  navigate("/profile" ,{state: formData})
}



  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Please log in to continue</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <input type="email" id="email" name="email" value={formData.email}
          onChange={handleChange} placeholder="Email" required />
           <input type="password" id="password" name="password" value={formData.password}
          onChange={handleChange} placeholder="password" required />
          <button type="submit">Login</button>
        </form>

        <p className="login-footer">
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
