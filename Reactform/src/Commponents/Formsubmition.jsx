import React, { useState } from "react";

function Formsubmition() {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
  });

  const [submitData, setSubmitData] = useState(null);

  const handlechange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const onSubmitData = (e) => {
    e.preventDefault();
    setSubmitData(formdata);
    e.target.reset(); // Not needed with controlled inputs
    setFormdata({ name: "", email: "", password: "", city: "" });
  };

  return (
    <div>
      <h1>Form Details page :</h1>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={onSubmitData}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={formdata.name}
                onChange={handlechange}
                name="name"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={formdata.email}
                onChange={handlechange}
                name="email"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={formdata.password}
                onChange={handlechange}
                name="password"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="city" className="form-label">City:</label>
              <input
                type="text"
                className="form-control"
                id="city"
                value={formdata.city}
                onChange={handlechange}
                name="city"
              />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>

        {/* <Livetyping />  // Remove or define this component */}

        <div className="col-md-6">
          {submitData && (
            <>
              <h1>{submitData.name}</h1>
              <h1>{submitData.email}</h1>
              <h1>{submitData.password}</h1>
              <h1>{submitData.city}</h1>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Formsubmition;
