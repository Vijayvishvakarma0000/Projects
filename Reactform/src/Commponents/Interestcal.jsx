import React, { useState } from 'react'

function Interestcal() {
  const [value,setValue]=useState({value:"",intrest:"", num:""})
  return (
    <>
    <div>
      <span>Value:</span>
      <input type='text' name='value' value={value}></input>
    </div>
    <div>
      <spna>Rate of interest</spna>
      <input type="num" value={num} name='intrest' />
    </div>
    <div>
      <span>Tenure</span>
      <input type="num" name='num' value={num} />
    </div>
    
    
     </>
  )
}

export default Interestcal




































































































// import React, { useState } from "react";

// function InvestmentCalculator() {
//   const [investment, setInvestment] = useState("");
//   const [rate, setRate] = useState("");
//   const [tenure, setTenure] = useState("");
//   const [gender, setGender] = useState("Male");
//   const [maturityAmount, setMaturityAmount] = useState(null);

//   const calculateAmount = () => {
//     let principal = parseFloat(investment);
//     let interestRate = parseFloat(rate);
//     let time = parseFloat(tenure);

//     if (gender === "Male") {
//       interestRate += 2; 
//     }

//     let amount = principal * Math.pow(1 + interestRate / 100, time);
//     setMaturityAmount(amount.toFixed(2));
//   };

//   return (
//     <div>
//       <h3>Investment Calculator</h3>
//       <input type="number" placeholder="Investment" onChange={(e) => setInvestment(e.target.value)} />
//       <br />
//       <input type="number" placeholder="Interest Rate (%)" onChange={(e) => setRate(e.target.value)} />
//       <br />
//       <input type="number" placeholder="Tenure (years)" onChange={(e) => setTenure(e.target.value)} />
//       <br />
//       <select onChange={(e) => setGender(e.target.value)}>
//         <option value="Male">Male</option>
//         <option value="Female">Female</option>
//       </select>
//       <br />
//       <button onClick={calculateAmount}>Calculate</button>
//       <h3>Maturity Amount: {maturityAmount !== null ? `₹${maturityAmount}` : "Enter Details"}</h3>
//     </div>
//   );
// }

// export default InvestmentCalculator;
