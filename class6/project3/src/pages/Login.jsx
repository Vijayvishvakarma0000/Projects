import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("abc@gmail.com")
  const [password, setPassword] = useState("")
  //login basic one
  function printData(event) {
    event.preventDefault();
    console.log(email, password)
  }
  return (
    <div className="login-container">
      <div className="login-card">
        {/* <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Please log in to continue</p> */}

        <form className="login-form" onSubmit={printData}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Enter email" value={email} onChange={(event) => {
            setEmail(event.target.value)
          }} />
          <label htmlFor="password"></label>
          <input type="password" id="password" name="password" placeholder="enter password"
            value={password} onChange={(event) => {
              setPassword(event.target.value)
            }} />
          <button  >Login</button>
        </form>
        {/* 
        <p className="login-footer">
          Don’t have an account? <a href="/signup">Sign up</a>
        </p> */}
      </div>
    </div>
  );
}

export default Login;
