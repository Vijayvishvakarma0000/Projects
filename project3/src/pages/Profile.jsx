
import { useLocation, useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  console.log("hey")
  const navigate = useNavigate()
  const location = useLocation();
  console.log(location)
  const formData = location.state; // formData from BestForm
  console.log(formData)

  if (!formData.fullName) {
    return (<div>
      <button onClick={() => {
        navigate('/')
      }}>Back to form</button>
      <p className="no-formData">No Profile formData</p>;
    </div>)
  }
  return (
    <div className="profile-container">
      <button onClick={() => {
        // navigate('/')
        navigate(-1)
      }}>Back to form</button>
      <div className="profile-card">
        <h1 className="profile-title">Profile</h1>

        <div className="profile-info">
          <p><strong>Name:</strong> {formData.fullName}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>DOB:</strong> {formData.Dob}</p>
          <p><strong>Gender:</strong> {formData.gender}</p>
          <p><strong>Education:</strong> {formData.education}</p>
          <p><strong>Course:</strong> {formData.course}</p>
          {/* <p><strong>Family Members:</strong> {formData.familyMember.join(", ")}</p> */}
        </div>
      </div>
    </div>
  );
}

export default Profile;
