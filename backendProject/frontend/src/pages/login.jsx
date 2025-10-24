import React, { useState } from "react";
import axios from "axios";
import "./Form.css";

function Login() {
  const [login, setLogin] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/api/users/login", login);
    console.log(res.data); // backend response
    alert(res.data.message);
  } catch (err) {
    console.error(err.response.data);
    alert(err.response.data.message);
  }
};


  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
