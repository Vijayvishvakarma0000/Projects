import { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

function Signup() {


  const [hobbies, setHobbies] = useState([]); // array!]
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dob: "",
    password: "",
    confirm_password: "",
    intro: "",
    gender: "Male",
    agree: false,
    file: null,
  });






  const changeFormDataValues = (e) => {
    const { name, value } = e.target;
    setFormData((oldData) => {
      return {
        ...oldData, [name]: value
      }
    })

  }

  function handleHobbies(event) {
    const { value, checked } = event.target;

    if (checked) {
      setHobbies((prev) => [...prev, value]);
    } else {
      setHobbies((prev) => prev.filter((hobby) => hobby !== value));
    }
  }
  const navigate = useNavigate();

  function printData(event) {
    event.preventDefault();
    console.log(formData);
    console.log(hobbies)
    formData.hobbies = hobbies;

    navigate("/profile", { state: formData })
  }



  return (
    <form onSubmit={printData} className="form-container">
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={changeFormDataValues}
        placeholder="Full Name"
        className="form-input"
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={changeFormDataValues}
        placeholder="Email"
        className="form-input"
      />
      <input
        type="date"
        id="dob"
        name="dob"
        value={formData.dob}
        onChange={changeFormDataValues}
        className="form-input"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={changeFormDataValues}
        placeholder="Password"
        className="form-input"
        autoComplete="on"
      />

      <input
        type="password"
        name="confirm_password"
        value={formData.confirm_password}
        onChange={changeFormDataValues}
        placeholder="Confirm Password"
        className="form-input"
        autoComplete="on"
      />

      <textarea
        name="intro"
        value={formData.intro}
        onChange={changeFormDataValues}
        placeholder="Introduction"
        className="form-textarea"
      />
      <div className="form-section">
        <h3>Hobbies (Checkboxes):</h3>
        <label htmlFor="cricket">cricket</label>
        <input type="checkbox" name="cricket" id="cricket" value="cricket" onChange={handleHobbies} />
        <label htmlFor="kusti">kusti</label>
        <input type="checkbox" name="kusti" id="kusti" value='kusti' onChange={handleHobbies} />
        <label htmlFor="chess">chess</label>
        <input type="checkbox" name="chess" id="chess" value='chess' onChange={handleHobbies} />

      </div>
      <div className="form-section">
        <h3>Gender (Radio):</h3>


        <label htmlFor="Male">Male</label>
        <input type="radio" name="gender" id="Male" value={formData.gender}
          defaultChecked
          onChange={changeFormDataValues}
        />

        <label htmlFor="FeMale">FeMale</label>
        <input type="radio" name="gender" id="FeMale" value="FeMale"
          onChange={changeFormDataValues}
        />

        <label htmlFor="Others">Others</label>
        <input type="radio" name="gender" id="Others" value="Others"
          onChange={changeFormDataValues}
        />

      </div>

      <div className="form-section">
        <h3>Agree to terms:</h3>
        <label className="form-checkbox">
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={changeFormDataValues}
          />
          I agree to the terms and conditions.
        </label>
      </div>

      <div className="form-section">
        <h3>Upload File:</h3>
        <input
          type="file"
          name="file"
          onChange={changeFormDataValues}
          accept="image/*,application/pdf"
          className="form-file"
        />
      </div>

      <button type="submit" className="form-submit">Submit</button>
    </form>

  );
}

export default Signup;






