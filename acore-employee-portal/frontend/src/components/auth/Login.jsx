import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin, loading }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData.email, formData.password);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <span className="logo-icon">🏢</span>
        </div>
        
        <div className="login-header">
          <h1 className="login-title">Acore IT Hub</h1>
          <p className="login-subtitle">Employee Management Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email" className="input-label">
              Company Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="employee@acoreithub.com"
              className="login-input"
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="login-input"
              required
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className={`login-btn ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Logging in...
              </>
            ) : (
              'Login to Portal'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p className="help-text">
            Forgot password? Contact HR department
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;