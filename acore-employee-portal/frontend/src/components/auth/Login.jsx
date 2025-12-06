// import React, { useState } from 'react';
// import './Login.css';

// const Login = ({ onLogin, loading }) => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onLogin(formData.email, formData.password);
//   };

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <div className="login-logo">
//           <span className="logo-icon"><img src="/public/assets/acore-logo.jpg" alt="" /></span>
//         </div>
        
//         <div className="login-header">
//           <h1 className="login-title">Acore IT Hub PVT LTD</h1>
//           <p className="login-subtitle">Employee Management Portal</p>
//         </div>

//         <form onSubmit={handleSubmit} className="login-form">
//           <div className="input-group">
//             <label htmlFor="email" className="input-label">
//               Company Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="employee@acoreithub.com"
//               className="login-input"
//               required
//               disabled={loading}
//             />
//           </div>

//           <div className="input-group">
//             <label htmlFor="password" className="input-label">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter your password"
//               className="login-input"
//               required
//               disabled={loading}
//             />
//           </div>

//           <button 
//             type="submit" 
//             className={`login-btn ${loading ? 'loading' : ''}`}
//             disabled={loading}
//           >
//             {loading ? (
//               <>
//                 <span className="loading-spinner"></span>
//                 Logging in...
//               </>
//             ) : (
//               'Login to Portal'
//             )}
//           </button>
//         </form>

//         <div className="login-footer">
//           <p className="help-text">
//             Forgot password? Contact HR department
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;





// import React, { useState } from 'react';
// import './Login.css';

// const Login = ({ onLogin, onRegister, loading, registerLoading }) => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const [registerData, setRegisterData] = useState({
//     // Personal Information
//     fullName: '',
//     email: '',
//     mobile: '',
//     dob: '',
//     gender: '',
//     address: '',
    
//     // Professional Information
//     designation: '',
//     department: '',
//     employeeType: '',
//     dateOfJoining: '',
    
//     // Account Information
//     password: '',
//     confirmPassword: '',
    
//     // Additional Information
//     emergencyContact: '',
//     bloodGroup: '',
//     panNumber: '',
//     aadharNumber: '',
//     bankAccount: '',
//     ifscCode: ''
//   });

//   const [showRegistration, setShowRegistration] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onLogin(formData.email, formData.password);
//   };

//   const handleRegister = (e) => {
//     e.preventDefault();
//     if (registerData.password !== registerData.confirmPassword) {
//       alert("Passwords don't match!");
//       return;
//     }
//     onRegister(registerData);
//   };

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleRegisterChange = (e) => {
//     setRegisterData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const nextStep = () => {
//     setCurrentStep(prev => Math.min(prev + 1, 3));
//   };

//   const prevStep = () => {
//     setCurrentStep(prev => Math.max(prev - 1, 1));
//   };

//   const resetRegistration = () => {
//     setShowRegistration(false);
//     setCurrentStep(1);
//     setRegisterData({
//       fullName: '',
//       email: '',
//       mobile: '',
//       dob: '',
//       gender: '',
//       address: '',
//       designation: '',
//       department: '',
//       employeeType: '',
//       dateOfJoining: '',
//       password: '',
//       confirmPassword: '',
//       emergencyContact: '',
//       bloodGroup: '',
//       panNumber: '',
//       aadharNumber: '',
//       bankAccount: '',
//       ifscCode: ''
//     });
//   };

//   const departments = [
//     'Engineering',
//     'Design',
//     'Marketing',
//     'Sales',
//     'HR',
//     'Finance',
//     'Operations',
//     'Support'
//   ];

//   const designations = [
//     'Software Developer',
//     'Senior Software Developer',
//     'Team Lead',
//     'Project Manager',
//     'UI/UX Designer',
//     'Frontend Developer',
//     'Backend Developer',
//     'DevOps Engineer',
//     'QA Engineer',
//     'Business Analyst'
//   ];

//   return (
//     <div className="login-container">
//       <div className={`login-box ${showRegistration ? 'registration-active' : ''}`}>
//         <div className="login-logo">
//           <span className="logo-icon"><img src="/public/assets/acore-logo.jpg" alt="" /></span>
//         </div>
        
//         <div className="login-header">
//           <h1 className="login-title">Acore IT Hub PVT LTD</h1>
//           <p className="login-subtitle">Employee Management Portal</p>
//         </div>

//         {/* Login Form - Always Visible */}
//         {!showRegistration ? (
//           <>
//             <form onSubmit={handleSubmit} className="login-form">
//               <div className="input-group">
//                 <label htmlFor="email" className="input-label">
//                   Company Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="employee@acoreithub.com"
//                   className="login-input"
//                   required
//                   disabled={loading}
//                 />
//               </div>

//               <div className="input-group">
//                 <label htmlFor="password" className="input-label">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Enter your password"
//                   className="login-input"
//                   required
//                   disabled={loading}
//                 />
//               </div>

//               <button 
//                 type="submit" 
//                 className={`login-btn ${loading ? 'loading' : ''}`}
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <>
//                     <span className="loading-spinner"></span>
//                     Logging in...
//                   </>
//                 ) : (
//                   'Login to Portal'
//                 )}
//               </button>
//             </form>

//             <div className="registration-link">
//               <p>New employee? <span onClick={() => setShowRegistration(true)}>Create your account</span></p>
//             </div>
//           </>
//         ) : (
//           /* Registration Form - Only when clicked */
//           <div className="registration-container">
//             <div className="registration-header">
//               <button className="back-btn" onClick={resetRegistration}>
//                 ← Back to Login
//               </button>
//               <h2>Employee Registration</h2>
//               <p>Fill in your details to create your account</p>
//             </div>

//             <form onSubmit={handleRegister} className="registration-form">
//               {/* Progress Bar */}
//               <div className="progress-bar">
//                 <div className="progress-step">
//                   <div className={`step-number ${currentStep >= 1 ? 'active' : ''}`}>1</div>
//                   <span className="step-label">Personal</span>
//                 </div>
//                 <div className="progress-line"></div>
//                 <div className="progress-step">
//                   <div className={`step-number ${currentStep >= 2 ? 'active' : ''}`}>2</div>
//                   <span className="step-label">Professional</span>
//                 </div>
//                 <div className="progress-line"></div>
//                 <div className="progress-step">
//                   <div className={`step-number ${currentStep >= 3 ? 'active' : ''}`}>3</div>
//                   <span className="step-label">Account</span>
//                 </div>
//               </div>

//               {/* Step 1: Personal Information */}
//               {currentStep === 1 && (
//                 <div className="form-step active">
//                   <h3 className="step-title">Personal Information</h3>
                  
//                   <div className="form-grid">
//                     <div className="input-group">
//                       <label htmlFor="fullName" className="input-label">
//                         Full Name *
//                       </label>
//                       <input
//                         type="text"
//                         id="fullName"
//                         name="fullName"
//                         value={registerData.fullName}
//                         onChange={handleRegisterChange}
//                         placeholder="Enter your full name"
//                         className="login-input"
//                         required
//                       />
//                     </div>

//                     <div className="input-group">
//                       <label htmlFor="email" className="input-label">
//                         Email Address *
//                       </label>
//                       <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={registerData.email}
//                         onChange={handleRegisterChange}
//                         placeholder="employee@acoreithub.com"
//                         className="login-input"
//                         required
//                       />
//                     </div>

//                     <div className="input-group">
//                       <label htmlFor="mobile" className="input-label">
//                         Mobile Number *
//                       </label>
//                       <input
//                         type="tel"
//                         id="mobile"
//                         name="mobile"
//                         value={registerData.mobile}
//                         onChange={handleRegisterChange}
//                         placeholder="+91 98765 43210"
//                         className="login-input"
//                         required
//                       />
//                     </div>

//                     <div className="input-group">
//                       <label htmlFor="dob" className="input-label">
//                         Date of Birth *
//                       </label>
//                       <input
//                         type="date"
//                         id="dob"
//                         name="dob"
//                         value={registerData.dob}
//                         onChange={handleRegisterChange}
//                         className="login-input"
//                         required
//                       />
//                     </div>

//                     <div className="input-group">
//                       <label htmlFor="gender" className="input-label">
//                         Gender *
//                       </label>
//                       <select
//                         id="gender"
//                         name="gender"
//                         value={registerData.gender}
//                         onChange={handleRegisterChange}
//                         className="login-input"
//                         required
//                       >
//                         <option value="">Select Gender</option>
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                         <option value="Other">Other</option>
//                       </select>
//                     </div>

//                     <div className="input-group full-width">
//                       <label htmlFor="address" className="input-label">
//                         Address *
//                       </label>
//                       <textarea
//                         id="address"
//                         name="address"
//                         value={registerData.address}
//                         onChange={handleRegisterChange}
//                         placeholder="Enter your complete address"
//                         className="login-input textarea"
//                         rows="3"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="form-actions">
//                     <button type="button" className="next-btn" onClick={nextStep}>
//                       Next → Professional Info
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Step 2: Professional Information */}
//               {currentStep === 2 && (
//                 <div className="form-step active">
//                   <h3 className="step-title">Professional Information</h3>
                  
//                   <div className="form-grid">
//                     <div className="input-group">
//                       <label htmlFor="designation" className="input-label">
//                         Designation *
//                       </label>
//                       <select
//                         id="designation"
//                         name="designation"
//                         value={registerData.designation}
//                         onChange={handleRegisterChange}
//                         className="login-input"
//                         required
//                       >
//                         <option value="">Select Designation</option>
//                         {designations.map(designation => (
//                           <option key={designation} value={designation}>{designation}</option>
//                         ))}
//                       </select>
//                     </div>

//                     <div className="input-group">
//                       <label htmlFor="department" className="input-label">
//                         Department *
//                       </label>
//                       <select
//                         id="department"
//                         name="department"
//                         value={registerData.department}
//                         onChange={handleRegisterChange}
//                         className="login-input"
//                         required
//                       >
//                         <option value="">Select Department</option>
//                         {departments.map(dept => (
//                           <option key={dept} value={dept}>{dept}</option>
//                         ))}
//                       </select>
//                     </div>

//                     <div className="input-group">
//                       <label htmlFor="employeeType" className="input-label">
//                         Employee Type *
//                       </label>
//                       <select
//                         id="employeeType"
//                         name="employeeType"
//                         value={registerData.employeeType}
//                         onChange={handleRegisterChange}
//                         className="login-input"
//                         required
//                       >
//                         <option value="">Select Type</option>
//                         <option value="Full Time">Full Time</option>
//                         <option value="Part Time">Part Time</option>
//                         <option value="Contract">Contract</option>
//                         <option value="Intern">Intern</option>
//                       </select>
//                     </div>

//                     <div className="input-group">
//                       <label htmlFor="dateOfJoining" className="input-label">
//                         Date of Joining *
//                       </label>
//                       <input
//                         type="date"
//                         id="dateOfJoining"
//                         name="dateOfJoining"
//                         value={registerData.dateOfJoining}
//                         onChange={handleRegisterChange}
//                         className="login-input"
//                         required
//                       />
//                     </div>

//                     <div className="input-group">
//                       <label htmlFor="bloodGroup" className="input-label">
//                         Blood Group
//                       </label>
//                       <select
//                         id="bloodGroup"
//                         name="bloodGroup"
//                         value={registerData.bloodGroup}
//                         onChange={handleRegisterChange}
//                         className="login-input"
//                       >
//                         <option value="">Select Blood Group</option>
//                         <option value="A+">A+</option>
//                         <option value="A-">A-</option>
//                         <option value="B+">B+</option>
//                         <option value="B-">B-</option>
//                         <option value="O+">O+</option>
//                         <option value="O-">O-</option>
//                         <option value="AB+">AB+</option>
//                         <option value="AB-">AB-</option>
//                       </select>
//                     </div>

//                     <div className="input-group">
//                       <label htmlFor="emergencyContact" className="input-label">
//                         Emergency Contact
//                       </label>
//                       <input
//                         type="tel"
//                         id="emergencyContact"
//                         name="emergencyContact"
//                         value={registerData.emergencyContact}
//                         onChange={handleRegisterChange}
//                         placeholder="Emergency contact number"
//                         className="login-input"
//                       />
//                     </div>
//                   </div>

//                   <div className="form-actions">
//                     <button type="button" className="prev-btn" onClick={prevStep}>
//                       ← Previous
//                     </button>
//                     <button type="button" className="next-btn" onClick={nextStep}>
//                       Next → Account Info
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Step 3: Account Information */}
//               {currentStep === 3 && (
//                 <div className="form-step active">
//                   <h3 className="step-title">Account & Financial Information</h3>
                  
//                   <div className="form-grid">
//                     <div className="input-group">
//                       <label htmlFor="password" className="input-label">
//                         Password *
//                       </label>
//                       <input
//                         type="password"
//                         id="password"
//                         name="password"
//                         value={registerData.password}
//                         onChange={handleRegisterChange}
//                         placeholder="Create a strong password"
//                         className="login-input"
//                         required
//                       />
//                     </div>

//                     <div className="input-group">
//                       <label htmlFor="confirmPassword" className="input-label">
//                         Confirm Password *
//                       </label>
//                       <input
//                         type="password"
//                         id="confirmPassword"
//                         name="confirmPassword"
//                         value={registerData.confirmPassword}
//                         onChange={handleRegisterChange}
//                         placeholder="Confirm your password"
//                         className="login-input"
//                         required
//                       />
//                     </div>

//                     <div className="input-group">
//                       <label htmlFor="panNumber" className="input-label">
//                         PAN Number
//                       </label>
//                       <input
//                         type="text"
//                         id="panNumber"
//                         name="panNumber"
//                         value={registerData.panNumber}
//                         onChange={handleRegisterChange}
//                         placeholder="ABCDE1234F"
//                         className="login-input"
//                         maxLength="10"
//                       />
//                     </div>

//                     <div className="input-group">
//                       <label htmlFor="aadharNumber" className="input-label">
//                         Aadhar Number
//                       </label>
//                       <input
//                         type="text"
//                         id="aadharNumber"
//                         name="aadharNumber"
//                         value={registerData.aadharNumber}
//                         onChange={handleRegisterChange}
//                         placeholder="1234 5678 9012"
//                         className="login-input"
//                         maxLength="12"
//                       />
//                     </div>

//                     <div className="input-group">
//                       <label htmlFor="bankAccount" className="input-label">
//                         Bank Account Number
//                       </label>
//                       <input
//                         type="text"
//                         id="bankAccount"
//                         name="bankAccount"
//                         value={registerData.bankAccount}
//                         onChange={handleRegisterChange}
//                         placeholder="Bank account number"
//                         className="login-input"
//                       />
//                     </div>

//                     <div className="input-group">
//                       <label htmlFor="ifscCode" className="input-label">
//                         IFSC Code
//                       </label>
//                       <input
//                         type="text"
//                         id="ifscCode"
//                         name="ifscCode"
//                         value={registerData.ifscCode}
//                         onChange={handleRegisterChange}
//                         placeholder="SBIN0000123"
//                         className="login-input"
//                       />
//                     </div>
//                   </div>

//                   <div className="form-actions">
//                     <button type="button" className="prev-btn" onClick={prevStep}>
//                       ← Previous
//                     </button>
//                     <button 
//                       type="submit" 
//                       className={`register-submit-btn ${registerLoading ? 'loading' : ''}`}
//                       disabled={registerLoading}
//                     >
//                       {registerLoading ? (
//                         <>
//                           <span className="loading-spinner"></span>
//                           Registering...
//                         </>
//                       ) : (
//                         'Complete Registration'
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </form>
//           </div>
//         )}

//         <div className="login-footer">
//           <p className="help-text">
//             Forgot password? Contact HR department
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;




//++++adding video------.>




// import React, { useState, useRef, useEffect } from 'react';
// import './Login.css';

// const Login = ({ onLogin, onRegister, loading, registerLoading }) => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const [registerData, setRegisterData] = useState({
//     // Personal Information
//     fullName: '',
//     email: '',
//     mobile: '',
//     dob: '',
//     gender: '',
//     address: '',
    
//     // Professional Information
//     designation: '',
//     department: '',
//     employeeType: '',
//     dateOfJoining: '',
    
//     // Account Information
//     password: '',
//     confirmPassword: '',
    
//     // Additional Information
//     emergencyContact: '',
//     bloodGroup: '',
//     panNumber: '',
//     aadharNumber: '',
//     bankAccount: '',
//     ifscCode: ''
//   });

//   const [showRegistration, setShowRegistration] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const videoRef = useRef(null);

//   // Handle video play/pause
//   useEffect(() => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.play();
//       } else {
//         videoRef.current.pause();
//       }
//     }
//   }, [isPlaying]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onLogin(formData.email, formData.password);
//   };

//   const handleRegister = (e) => {
//     e.preventDefault();
//     if (registerData.password !== registerData.confirmPassword) {
//       alert("Passwords don't match!");
//       return;
//     }
//     onRegister(registerData);
//   };

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleRegisterChange = (e) => {
//     setRegisterData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const nextStep = () => {
//     setCurrentStep(prev => Math.min(prev + 1, 3));
//   };

//   const prevStep = () => {
//     setCurrentStep(prev => Math.max(prev - 1, 1));
//   };

//   const resetRegistration = () => {
//     setShowRegistration(false);
//     setCurrentStep(1);
//     setRegisterData({
//       fullName: '',
//       email: '',
//       mobile: '',
//       dob: '',
//       gender: '',
//       address: '',
//       designation: '',
//       department: '',
//       employeeType: '',
//       dateOfJoining: '',
//       password: '',
//       confirmPassword: '',
//       emergencyContact: '',
//       bloodGroup: '',
//       panNumber: '',
//       aadharNumber: '',
//       bankAccount: '',
//       ifscCode: ''
//     });
//   };

//   const toggleVideo = () => {
//     setIsPlaying(!isPlaying);
//   };

//   const departments = [
//     'Engineering',
//     'Design',
//     'Marketing',
//     'Sales',
//     'HR',
//     'Finance',
//     'Operations',
//     'Support'
//   ];

//   const designations = [
//     'Software Developer',
//     'Senior Software Developer',
//     'Team Lead',
//     'Project Manager',
//     'UI/UX Designer',
//     'Frontend Developer',
//     'Backend Developer',
//     'DevOps Engineer',
//     'QA Engineer',
//     'Business Analyst'
//   ];

//   return (
//     <div className="login-container">
//       {/* Video Background */}
//       <div className="video-background">
//         <video
//           ref={videoRef}
//           autoPlay
//           muted
//           loop
//           playsInline
//           className="background-video"
//         >
//           {/* Multiple video sources for cross-browser compatibility */}
//           {/* <source src="https://www.pexels.com/download/video/8084614/" type="video/mp4" /> */}
//           <source src="/assets/single bg video.mp4" type="video/mp4" />
//           <source src="https://assets.mixkit.co/videos/preview/mixkit-hacker-trying-to-break-into-a-secure-system-29806-large.mp4" type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
        
//         {/* Video Overlay */}
//         <div className="video-overlay"></div>
        
//         {/* Video Controls */}
//         {/* <button className="video-control-btn" onClick={toggleVideo}>
//           {isPlaying ? '⏸️' : '▶️'}
//         </button> */}
        
//         {/* Animated Particles */}
//         <div className="particles-container">
//           {[...Array(15)].map((_, i) => (
//             <div key={i} className="particle" style={{
//               left: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${3 + Math.random() * 4}s`
//             }}></div>
//           ))}
//         </div>
//       </div>

//       {/* Floating Tech Elements */}
//       <div className="floating-tech-elements">
//         <div className="floating-code">{'</>'}</div>
//         <div className="floating-brackets">{'{}'}</div>
//         <div className="floating-binary">1010</div>
//         <div className="floating-server">⚙️</div>
//         <div className="floating-database">🗄️</div>
//       </div>

//       <div className={`login-box ${showRegistration ? 'registration-active' : ''}`}>
//         <div className="login-logo">
//           <div className="logo-icon">
//             <div className="logo-circle">
//               <span className="logo-text">A</span>
//             </div>
//             <div className="logo-glow"></div>
//           </div>
//         </div>
        
//         <div className="login-header">
//           <h1 className="login-title">
//             <span className="title-gradient">ACORE IT HUB</span>
//             <span className="title-sub">PVT LTD</span>
//           </h1>
//           <p className="login-subtitle">Where Innovation Meets Excellence</p>
//           {/* <div className="tagline">
//             <span className="tagline-item">🚀 Tech Driven</span>
//             <span className="tagline-item">💡 Innovation</span>
//             <span className="tagline-item">🤝 Collaboration</span>
//           </div> */}
//         </div>

//         {/* Login Form - Always Visible */}
//         {!showRegistration ? (
//           <>
//             <form onSubmit={handleSubmit} className="login-form">
//               <div className="input-group floating-input">
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder=" "
//                   className="login-input"
//                   required
//                   disabled={loading}
//                 />
//                 <label htmlFor="email" className="floating-label">
//                   <span className="input-icon">📧</span> Company Email
//                 </label>
//               </div>

//               <div className="input-group floating-input">
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder=" "
//                   className="login-input"
//                   required
//                   disabled={loading}
//                 />
//                 <label htmlFor="password" className="floating-label">
//                   <span className="input-icon">🔒</span> Password
//                 </label>
//               </div>

//               <button 
//                 type="submit" 
//                 className={`login-btn ${loading ? 'loading' : ''}`}
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <>
//                     <span className="loading-spinner"></span>
//                     <span className="btn-text">Accessing Portal...</span>
//                   </>
//                 ) : (
//                   <>
//                     <span className="btn-icon">🚀</span>
//                     <span className="btn-text">Launch Portal</span>
//                   </>
//                 )}
//               </button>

//               <div className="login-divider">
//                 <span className="divider-line"></span>
//                 <span className="divider-text">Welcome Back</span>
//                 <span className="divider-line"></span>
//               </div>
//             </form>

//             <div className="registration-section">
//               <p className="new-employee-text">New to ACORE Family?</p>
//               <button 
//                 className="register-cta-btn"
//                 onClick={() => setShowRegistration(true)}
//               >
//                 <span className="cta-icon">👨‍💻</span>
//                 <span className="cta-text">Join Our Team</span>
//                 <span className="cta-arrow">→</span>
//               </button>
//             </div>
//           </>
//         ) : (
//           /* Registration Form - Only when clicked */
//           <div className="registration-container">
//             <div className="registration-header">
//               <button className="back-btn" onClick={resetRegistration}>
//                 <span className="back-icon">←</span>
//                 Back to Login
//               </button>
//               <div className="registration-title">
//                 <h2>🚀 Join ACORE Family</h2>
//                 <p>Start your journey with India's leading IT innovator</p>
//               </div>
//             </div>

//             <form onSubmit={handleRegister} className="registration-form">
//               {/* Progress Bar */}
//               <div className="progress-tracker">
//                 <div className="progress-steps">
//                   <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
//                     <div className="step-indicator">
//                       <span className="step-number">1</span>
//                       <div className="step-check">✓</div>
//                     </div>
//                     <span className="step-name">Personal Info</span>
//                   </div>
//                   <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
//                     <div className="step-indicator">
//                       <span className="step-number">2</span>
//                       <div className="step-check">✓</div>
//                     </div>
//                     <span className="step-name">Professional</span>
//                   </div>
//                   <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
//                     <div className="step-indicator">
//                       <span className="step-number">3</span>
//                       <div className="step-check">✓</div>
//                     </div>
//                     <span className="step-name">Account Setup</span>
//                   </div>
//                 </div>
//                 <div className="progress-line">
//                   <div 
//                     className="progress-fill"
//                     style={{ width: `${(currentStep - 1) * 50}%` }}
//                   ></div>
//                 </div>
//               </div>

//               {/* Step 1: Personal Information */}
//               {currentStep === 1 && (
//                 <div className="form-step active">
//                   <div className="step-header">
//                     <h3 className="step-title">
//                       <span className="step-icon">👤</span>
//                       Tell Us About Yourself
//                     </h3>
//                     <p className="step-description">Basic personal details to get started</p>
//                   </div>
                  
//                   <div className="form-grid">
//                     {['fullName', 'email', 'mobile', 'dob', 'gender', 'address'].map((field) => (
//                       <div className="input-group floating-input" key={field}>
//                         {field === 'gender' ? (
//                           <>
//                             <select
//                               id={field}
//                               name={field}
//                               value={registerData[field]}
//                               onChange={handleRegisterChange}
//                               className="login-input"
//                               required
//                             >
//                               <option value=""></option>
//                               <option value="Male">Male</option>
//                               <option value="Female">Female</option>
//                               <option value="Other">Other</option>
//                             </select>
//                             <label htmlFor={field} className="floating-label">
//                               <span className="input-icon">
//                                 {field === 'fullName' ? '👤' : 
//                                  field === 'email' ? '📧' : 
//                                  field === 'mobile' ? '📱' : 
//                                  field === 'dob' ? '🎂' : 
//                                  field === 'gender' ? '⚧️' : '🏠'}
//                               </span>
//                               {field === 'fullName' ? 'Full Name' :
//                                field === 'email' ? 'Email Address' :
//                                field === 'mobile' ? 'Mobile Number' :
//                                field === 'dob' ? 'Date of Birth' :
//                                field === 'gender' ? 'Gender' : 'Complete Address'}
//                             </label>
//                           </>
//                         ) : field === 'address' ? (
//                           <>
//                             <textarea
//                               id={field}
//                               name={field}
//                               value={registerData[field]}
//                               onChange={handleRegisterChange}
//                               placeholder=" "
//                               className="login-input textarea"
//                               rows="3"
//                               required
//                             />
//                             <label htmlFor={field} className="floating-label">
//                               <span className="input-icon">🏠</span>
//                               Complete Address
//                             </label>
//                           </>
//                         ) : (
//                           <>
//                             <input
//                               type={field === 'email' ? 'email' : 
//                                     field === 'mobile' ? 'tel' : 
//                                     field === 'dob' ? 'date' : 'text'}
//                               id={field}
//                               name={field}
//                               value={registerData[field]}
//                               onChange={handleRegisterChange}
//                               placeholder=" "
//                               className="login-input"
//                               required
//                             />
//                             <label htmlFor={field} className="floating-label">
//                               <span className="input-icon">
//                                 {field === 'fullName' ? '👤' : 
//                                  field === 'email' ? '📧' : 
//                                  field === 'mobile' ? '📱' : 
//                                  field === 'dob' ? '🎂' : '🏠'}
//                               </span>
//                               {field === 'fullName' ? 'Full Name' :
//                                field === 'email' ? 'Email Address' :
//                                field === 'mobile' ? 'Mobile Number' :
//                                field === 'dob' ? 'Date of Birth' : 'Complete Address'}
//                             </label>
//                           </>
//                         )}
//                       </div>
//                     ))}
//                   </div>

//                   <div className="form-actions">
//                     <button type="button" className="next-btn" onClick={nextStep}>
//                       <span>Continue to Professional</span>
//                       <span className="btn-arrow">→</span>
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Step 2: Professional Information */}
//               {currentStep === 2 && (
//                 <div className="form-step active">
//                   <div className="step-header">
//                     <h3 className="step-title">
//                       <span className="step-icon">💼</span>
//                       Professional Details
//                     </h3>
//                     <p className="step-description">Your role at ACORE IT Hub</p>
//                   </div>
                  
//                   <div className="form-grid">
//                     {['designation', 'department', 'employeeType', 'dateOfJoining', 'bloodGroup', 'emergencyContact'].map((field) => (
//                       <div className="input-group floating-input" key={field}>
//                         <select
//                           id={field}
//                           name={field}
//                           value={registerData[field]}
//                           onChange={handleRegisterChange}
//                           className="login-input"
//                           required={field !== 'bloodGroup' && field !== 'emergencyContact'}
//                         >
//                           <option value=""></option>
//                           {field === 'designation' ? designations.map(des => (
//                             <option key={des} value={des}>{des}</option>
//                           )) : field === 'department' ? departments.map(dept => (
//                             <option key={dept} value={dept}>{dept}</option>
//                           )) : field === 'employeeType' ? (
//                             <>
//                               <option value="Full Time">Full Time</option>
//                               <option value="Part Time">Part Time</option>
//                               <option value="Contract">Contract</option>
//                               <option value="Intern">Intern</option>
//                             </>
//                           ) : field === 'bloodGroup' ? (
//                             <>
//                               <option value="A+">A+</option>
//                               <option value="A-">A-</option>
//                               <option value="B+">B+</option>
//                               <option value="B-">B-</option>
//                               <option value="O+">O+</option>
//                               <option value="O-">O-</option>
//                               <option value="AB+">AB+</option>
//                               <option value="AB-">AB-</option>
//                             </>
//                           ) : null}
//                         </select>
//                         <label htmlFor={field} className="floating-label">
//                           <span className="input-icon">
//                             {field === 'designation' ? '🎯' :
//                              field === 'department' ? '🏢' :
//                              field === 'employeeType' ? '👔' :
//                              field === 'dateOfJoining' ? '📅' :
//                              field === 'bloodGroup' ? '🩸' : '🚨'}
//                           </span>
//                           {field === 'designation' ? 'Designation' :
//                            field === 'department' ? 'Department' :
//                            field === 'employeeType' ? 'Employee Type' :
//                            field === 'dateOfJoining' ? 'Date of Joining' :
//                            field === 'bloodGroup' ? 'Blood Group' : 'Emergency Contact'}
//                         </label>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="form-actions">
//                     <button type="button" className="prev-btn" onClick={prevStep}>
//                       <span className="btn-arrow">←</span>
//                       <span>Back</span>
//                     </button>
//                     <button type="button" className="next-btn" onClick={nextStep}>
//                       <span>Setup Account</span>
//                       <span className="btn-arrow">→</span>
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Step 3: Account Information */}
//               {currentStep === 3 && (
//                 <div className="form-step active">
//                   <div className="step-header">
//                     <h3 className="step-title">
//                       <span className="step-icon">🔐</span>
//                       Account & Security
//                     </h3>
//                     <p className="step-description">Final step to join ACORE</p>
//                   </div>
                  
//                   <div className="form-grid">
//                     {['password', 'confirmPassword', 'panNumber', 'aadharNumber', 'bankAccount', 'ifscCode'].map((field) => (
//                       <div className="input-group floating-input" key={field}>
//                         <input
//                           type={field.includes('password') ? 'password' : 'text'}
//                           id={field}
//                           name={field}
//                           value={registerData[field]}
//                           onChange={handleRegisterChange}
//                           placeholder=" "
//                           className="login-input"
//                           required={field.includes('password')}
//                           maxLength={field === 'panNumber' ? '10' : field === 'aadharNumber' ? '12' : undefined}
//                         />
//                         <label htmlFor={field} className="floating-label">
//                           <span className="input-icon">
//                             {field.includes('password') ? '🔒' :
//                              field === 'panNumber' ? '📋' :
//                              field === 'aadharNumber' ? '🆔' :
//                              field === 'bankAccount' ? '🏦' : '🏢'}
//                           </span>
//                           {field === 'password' ? 'Create Password' :
//                            field === 'confirmPassword' ? 'Confirm Password' :
//                            field === 'panNumber' ? 'PAN Number' :
//                            field === 'aadharNumber' ? 'Aadhar Number' :
//                            field === 'bankAccount' ? 'Bank Account' : 'IFSC Code'}
//                         </label>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="form-actions">
//                     <button type="button" className="prev-btn" onClick={prevStep}>
//                       <span className="btn-arrow">←</span>
//                       <span>Back</span>
//                     </button>
//                     <button 
//                       type="submit" 
//                       className={`register-submit-btn ${registerLoading ? 'loading' : ''}`}
//                       disabled={registerLoading}
//                     >
//                       {registerLoading ? (
//                         <>
//                           <span className="loading-spinner"></span>
//                           <span>Creating Account...</span>
//                         </>
//                       ) : (
//                         <>
//                           <span>Complete Registration</span>
//                           <span className="btn-arrow">🚀</span>
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </form>
//           </div>
//         )}

//         <div className="login-footer">
//           <div className="security-info">
//             <span className="security-icon">🔒</span>
//             <p className="help-text">Enterprise-grade security • ISO 27001 Certified</p>
//           </div>
//           <div className="footer-links">
//             <a href="#" className="footer-link">Privacy Policy</a>
//             <span className="footer-separator">•</span>
//             <a href="#" className="footer-link">Terms of Service</a>
//             <span className="footer-separator">•</span>
//             <a href="#" className="footer-link">Support</a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;




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
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
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
      {/* ✅ VIDEO BACKGROUND ADDED HERE */}
      <div className="video-background">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="background-video"
        >
          <source src="/assets/single bg video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Video Overlay for better text visibility */}
        <div className="video-overlay"></div>
      </div>

      <div className={`login-box ${showRegistration ? 'registration-active' : ''}`}>
        <div className="login-logo">
          <span className="logo-icon"><img src="/assets/acore-logo.jpg" alt="" /></span>
        </div>
        
        <div className="login-header">
          <h1 className="login-title">Acore IT Hub PVT LTD</h1>
          <p className="login-subtitle">Employee Management Portal</p>
        </div>

        {/* Login Form */}
        {!showRegistration ? (
          <>
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

            <div className="registration-link">
              <p>New employee? <span onClick={() => setShowRegistration(true)}>Create your account</span></p>
            </div>
          </>
        ) : (
          <div className="registration-container">
            <div className="registration-header">
              <button className="back-btn" onClick={resetRegistration}>
                ← Back to Login
              </button>
              <h2>Employee Registration</h2>
              <p>Fill in your details to create your account</p>
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
                        placeholder="employee@acoreithub.com"
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
                  <h3 className="step-title">Account & Financial Information</h3>
                  
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
                          Registering...
                        </>
                      ) : (
                        'Complete Registration'
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
            Forgot password? Contact HR department
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;