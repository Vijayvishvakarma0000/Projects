import "./Signup.css"
function Signup() {
  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form>
          <div className="input-box">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your name" required />
          </div>
          <div className="input-box">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div className="input-box">
            <label>Password</label>
            <input type="password" placeholder="Create password" required />
          </div>
          <div className="input-box">
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm password" required />
          </div>
          <button type="submit" className="btn">Sign Up</button>
          <p className="login-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  )
}
export default Signup
