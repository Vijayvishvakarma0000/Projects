import { useState } from "react";
import "./Signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dob: "",
    password: "",
    confirm_password: "",
    intro: "",
    hobbies: [], // array!
    gender: "Male",
    agree: false,
    file: null,
  });



  function printData(event) {
    event.preventDefault();
    const output = { ...formData };

    if (formData.file) {
      output.file = formData.file.name; // For display, just show file name
    }

    console.log(output);
  }
  const changeFormDataValues = (e) => {
    const { name, value, type, checked, files } = e.target;
    console.log(e.target)
    console.log("checked", checked,type)


    if (type === "checkbox") {
      const updatedHobbies = checked
        ? [...formData.hobbies, value] // Add hobby
        : formData.hobbies.filter(hobby => hobby !== value); // Remove hobby

        console.log(updatedHobbies)
      setFormData(prev => ({
        ...prev,
        hobbies: updatedHobbies
      }));
    }

    // else if (type === "checkbox") {
    //   // For single checkbox (e.g., 'agree')
    //   setFormData(prev => ({
    //     ...prev,
    //     [name]: checked
    //   }));
    // }

    // else if (type === "file") {
    //   setFormData(prev => ({
    //     ...prev,
    //     [name]: files[0] // Just storing single file
    //   }));
    // }

    // else {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // }
  };



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
      {/*
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
      />

      <input
        type="password"
        name="confirm_password"
        value={formData.confirm_password}
        onChange={changeFormDataValues}
        placeholder="Confirm Password"
        className="form-input"
      />

      <textarea
        name="intro"
        value={formData.intro}
        onChange={changeFormDataValues}
        placeholder="Introduction"
        className="form-textarea"
      /> */}

      <div className="form-section">
        <h3>Hobbies (Checkboxes):</h3>

        <label htmlFor="Cricket" className="form-checkbox">Cricket</label>
        <input
          type="checkbox"
          name="Cricket"
          value="Cricket"
          id="Cricket"
          defaultChecked={formData.hobbies === "Cricket"}
          onChange={changeFormDataValues}
        />
        <label htmlFor="Kanchche" className="form-checkbox">Kanchche</label>
        <input
          type="checkbox"
          name="Kanchche"
          value="Kanchche"
          id="Kanchche"
          defaultChecked={formData.hobbies === "Kanchche"}
          onChange={changeFormDataValues}
        />
        <label htmlFor="Kusti" className="form-checkbox">Kusti</label>
        <input
          type="checkbox"
          name="Kusti"
          value="Kusti"
          id="Kusti"
          defaultChecked={formData.hobbies === "Kusti"}
          onChange={changeFormDataValues}
        />

      </div>
      {/* 
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

      </div> */}

      {/* <div className="form-section">
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
      </div> */}

      <button type="submit" className="form-submit">Submit</button>
    </form>

  );
}

export default Signup;






