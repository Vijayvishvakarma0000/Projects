import React, { useState } from 'react';

function InvestmentForm() {
  const [formData, setFormData] = useState({
    name: '',
    investment: '',
    gender: '',
    children: '',
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform calculations based on formData
    const { investment, children } = formData;
    const investmentAmount = parseFloat(investment);
    const numberOfChildren = parseInt(children, 10);

    if (isNaN(investmentAmount) || isNaN(numberOfChildren)) {
      alert('Please enter valid numbers for investment and number of children.');
      return;
    }

    // Example calculation: Adjust investment based on number of children
    const adjustedInvestment = investmentAmount * (1 + numberOfChildren * 0.05);
    setResult(adjustedInvestment);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Investment Amount:
          <input
            type="number"
            name="investment"
            value={formData.investment}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Gender:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <br />
        <label>
          Number of Children:
          <input
            type="number"
            name="children"
            value={formData.children}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Calculate</button>
      </form>
      {result !== null && (
        <div>
          <h2>Calculation Result</h2>
          <p>Adjusted Investment Amount: ${result.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default InvestmentForm;
