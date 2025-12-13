import React, { useState, useRef, useEffect } from 'react';
import './Login.css';

const Login = ({ onLogin, onRegister, loading, registerLoading }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    dob: '',
    gender: '',
    address: '',
    designation: '',
    department: '',
    employeeType: '',
    dateOfJoining: '',
    password: '',
    confirmPassword: '',
    emergencyContact: '',
    bloodGroup: '',
    panNumber: '',
    aadharNumber: '',
    bankAccount: '',
    ifscCode: ''
  });

  const [showRegistration, setShowRegistration] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const videoRef = useRef(null);

  // Handle video play
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Video autoplay prevented:", e));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData.email, formData.password);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    onRegister(registerData);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRegisterChange = (e) => {
    setRegisterData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const resetRegistration = () => {
    setShowRegistration(false);
    setCurrentStep(1);
    setRegisterData({
      fullName: '',
      email: '',
      mobile: '',
      dob: '',
      gender: '',
      address: '',
      designation: '',
      department: '',
      employeeType: '',
      dateOfJoining: '',
      password: '',
      confirmPassword: '',
      emergencyContact: '',
      bloodGroup: '',
      panNumber: '',
      aadharNumber: '',
      bankAccount: '',
      ifscCode: ''
    });
  };

  const departments = [
    'Engineering',
    'Design',
    'Marketing',
    'Sales',
    'HR',
    'Finance',
    'Operations',
    'Support'
  ];

  const designations = [
    'Software Developer',
    'Senior Software Developer',
    'Team Lead',
    'Project Manager',
    'UI/UX Designer',
    'Frontend Developer',
    'Backend Developer',
    'DevOps Engineer',
    'QA Engineer',
    'Business Analyst'
  ];

  return (
    <div className="login-container">
      {/* Video Background */}
      <div className="video-background">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="background-video"
        >
          <source src="/assets/single-bg-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="video-overlay"></div>
      </div>

      <div className={`login-box ${showRegistration ? 'registration-active' : ''}`}>
        <div className="login-logo">
          <span className="logo-icon">🏢</span>
        </div>
        
        <div className="login-header">
          <h1 className="login-title">Acore IT Hub PVT LTD</h1>
          <p className="login-subtitle">Admin Dashboard Portal</p>
        </div>

        {/* Login Form */}
        {!showRegistration ? (
          <>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-group">
                <label htmlFor="email" className="input-label">
                  Admin Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@acoreithub.com"
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
                  'Login to Admin Portal'
                )}
              </button>
            </form>

            <div className="registration-link">
              <p>Need admin access? <span onClick={() => setShowRegistration(true)}>Request access</span></p>
            </div>

            <div className="demo-credentials">
              <p><strong>Demo Credentials:</strong></p>
              <p>Email: hr@123 | Password: any</p>
              <p>Email: boss@123 | Password: any</p>
            </div>
          </>
        ) : (
          <div className="registration-container">
            <div className="registration-header">
              <button className="back-btn" onClick={resetRegistration}>
                ← Back to Login
              </button>
              <h2>Admin Access Request</h2>
              <p>Fill in your details to request admin access</p>
            </div>

            <form onSubmit={handleRegister} className="registration-form">
              {/* Progress Bar */}
              <div className="progress-bar">
                <div className="progress-step">
                  <div className={`step-number ${currentStep >= 1 ? 'active' : ''}`}>1</div>
                  <span className="step-label">Personal</span>
                </div>
                <div className="progress-line"></div>
                <div className="progress-step">
                  <div className={`step-number ${currentStep >= 2 ? 'active' : ''}`}>2</div>
                  <span className="step-label">Professional</span>
                </div>
                <div className="progress-line"></div>
                <div className="progress-step">
                  <div className={`step-number ${currentStep >= 3 ? 'active' : ''}`}>3</div>
                  <span className="step-label">Account</span>
                </div>
              </div>

              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="form-step active">
                  <h3 className="step-title">Personal Information</h3>
                  
                  <div className="form-grid">
                    <div className="input-group">
                      <label htmlFor="fullName" className="input-label">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={registerData.fullName}
                        onChange={handleRegisterChange}
                        placeholder="Enter your full name"
                        className="login-input"
                        required
                      />
                    </div>

                    <div className="input-group">
                      <label htmlFor="email" className="input-label">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={registerData.email}
                        onChange={handleRegisterChange}
                        placeholder="admin@acoreithub.com"
                        className="login-input"
                        required
                      />
                    </div>

                    <div className="input-group">
                      <label htmlFor="mobile" className="input-label">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        value={registerData.mobile}
                        onChange={handleRegisterChange}
                        placeholder="+91 98765 43210"
                        className="login-input"
                        required
                      />
                    </div>

                    <div className="input-group">
                      <label htmlFor="dob" className="input-label">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={registerData.dob}
                        onChange={handleRegisterChange}
                        className="login-input"
                        required
                      />
                    </div>

                    <div className="input-group">
                      <label htmlFor="gender" className="input-label">
                        Gender *
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={registerData.gender}
                        onChange={handleRegisterChange}
                        className="login-input"
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="input-group full-width">
                      <label htmlFor="address" className="input-label">
                        Address *
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={registerData.address}
                        onChange={handleRegisterChange}
                        placeholder="Enter your complete address"
                        className="login-input textarea"
                        rows="3"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="button" className="next-btn" onClick={nextStep}>
                      Next → Professional Info
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Professional Information */}
              {currentStep === 2 && (
                <div className="form-step active">
                  <h3 className="step-title">Professional Information</h3>
                  
                  <div className="form-grid">
                    <div className="input-group">
                      <label htmlFor="designation" className="input-label">
                        Designation *
                      </label>
                      <select
                        id="designation"
                        name="designation"
                        value={registerData.designation}
                        onChange={handleRegisterChange}
                        className="login-input"
                        required
                      >
                        <option value="">Select Designation</option>
                        {designations.map(designation => (
                          <option key={designation} value={designation}>{designation}</option>
                        ))}
                      </select>
                    </div>

                    <div className="input-group">
                      <label htmlFor="department" className="input-label">
                        Department *
                      </label>
                      <select
                        id="department"
                        name="department"
                        value={registerData.department}
                        onChange={handleRegisterChange}
                        className="login-input"
                        required
                      >
                        <option value="">Select Department</option>
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>

                    <div className="input-group">
                      <label htmlFor="employeeType" className="input-label">
                        Employee Type *
                      </label>
                      <select
                        id="employeeType"
                        name="employeeType"
                        value={registerData.employeeType}
                        onChange={handleRegisterChange}
                        className="login-input"
                        required
                      >
                        <option value="">Select Type</option>
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Intern">Intern</option>
                      </select>
                    </div>

                    <div className="input-group">
                      <label htmlFor="dateOfJoining" className="input-label">
                        Date of Joining *
                      </label>
                      <input
                        type="date"
                        id="dateOfJoining"
                        name="dateOfJoining"
                        value={registerData.dateOfJoining}
                        onChange={handleRegisterChange}
                        className="login-input"
                        required
                      />
                    </div>

                    <div className="input-group">
                      <label htmlFor="bloodGroup" className="input-label">
                        Blood Group
                      </label>
                      <select
                        id="bloodGroup"
                        name="bloodGroup"
                        value={registerData.bloodGroup}
                        onChange={handleRegisterChange}
                        className="login-input"
                      >
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                    </div>

                    <div className="input-group">
                      <label htmlFor="emergencyContact" className="input-label">
                        Emergency Contact
                      </label>
                      <input
                        type="tel"
                        id="emergencyContact"
                        name="emergencyContact"
                        value={registerData.emergencyContact}
                        onChange={handleRegisterChange}
                        placeholder="Emergency contact number"
                        className="login-input"
                      />
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="button" className="prev-btn" onClick={prevStep}>
                      ← Previous
                    </button>
                    <button type="button" className="next-btn" onClick={nextStep}>
                      Next → Account Info
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Account Information */}
              {currentStep === 3 && (
                <div className="form-step active">
                  <h3 className="step-title">Account & Access Information</h3>
                  
                  <div className="form-grid">
                    <div className="input-group">
                      <label htmlFor="password" className="input-label">
                        Password *
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={registerData.password}
                        onChange={handleRegisterChange}
                        placeholder="Create a strong password"
                        className="login-input"
                        required
                      />
                    </div>

                    <div className="input-group">
                      <label htmlFor="confirmPassword" className="input-label">
                        Confirm Password *
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={registerData.confirmPassword}
                        onChange={handleRegisterChange}
                        placeholder="Confirm your password"
                        className="login-input"
                        required
                      />
                    </div>

                    <div className="input-group">
                      <label htmlFor="panNumber" className="input-label">
                        PAN Number
                      </label>
                      <input
                        type="text"
                        id="panNumber"
                        name="panNumber"
                        value={registerData.panNumber}
                        onChange={handleRegisterChange}
                        placeholder="ABCDE1234F"
                        className="login-input"
                        maxLength="10"
                      />
                    </div>

                    <div className="input-group">
                      <label htmlFor="aadharNumber" className="input-label">
                        Aadhar Number
                      </label>
                      <input
                        type="text"
                        id="aadharNumber"
                        name="aadharNumber"
                        value={registerData.aadharNumber}
                        onChange={handleRegisterChange}
                        placeholder="1234 5678 9012"
                        className="login-input"
                        maxLength="12"
                      />
                    </div>

                    <div className="input-group">
                      <label htmlFor="bankAccount" className="input-label">
                        Bank Account Number
                      </label>
                      <input
                        type="text"
                        id="bankAccount"
                        name="bankAccount"
                        value={registerData.bankAccount}
                        onChange={handleRegisterChange}
                        placeholder="Bank account number"
                        className="login-input"
                      />
                    </div>

                    <div className="input-group">
                      <label htmlFor="ifscCode" className="input-label">
                        IFSC Code
                      </label>
                      <input
                        type="text"
                        id="ifscCode"
                        name="ifscCode"
                        value={registerData.ifscCode}
                        onChange={handleRegisterChange}
                        placeholder="SBIN0000123"
                        className="login-input"
                      />
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="button" className="prev-btn" onClick={prevStep}>
                      ← Previous
                    </button>
                    <button 
                      type="submit" 
                      className={`register-submit-btn ${registerLoading ? 'loading' : ''}`}
                      disabled={registerLoading}
                    >
                      {registerLoading ? (
                        <>
                          <span className="loading-spinner"></span>
                          Submitting Request...
                        </>
                      ) : (
                        'Submit Access Request'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}

        <div className="login-footer">
          <p className="help-text">
            For admin access issues, contact super admin
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;