// import React,{useState} from 'react'

// function Calculation() {
//     const [selectnum,setNumber]=useState({})
//   return (
//     <>
// <div className='mt-3'>
//     <label>Number 1: </label>
//     <input type="num" />
    
// </div>
// <br />
// <div>
//     <label>Number 2:</label>
// <input type="num" />
// </div>
// <br/>
// <div className="dropdown">
//   <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
//     Dropdown button
//   </button>
//   <ul className="dropdown-menu">
//     <li><a className="dropdown-item" href="#">+</a></li>
//     <li><a className="dropdown-item" href="#">-</a></li>
//     <li><a className="dropdown-item" href="#">*</a></li>
//     <li><a className="dropdown-item" href="#">/</a></li>
  

//   </ul>
// </div> 
//     </>
//   )
// }

// export default Calculation;


import React, { useState } from "react";

function Calculation() {
  const [num1, setNum1] = useState();
  const [num2, setNum2] = useState();
  const [operator, setOperator] = useState("+");
  const [result, setResult] = useState(0);

  const handleCalculation = (op) => {
    setOperator(op);
    let res = 0;
    switch (op) {
      case "+":
        res = Number(num1) + Number(num2);
        break;
      case "-":
        res = Number(num1) - Number(num2);
        break;
      case "*":
        res = Number(num1) * Number(num2);
        break;
      case "/":
        res = num2 !== 0 ? Number(num1) / Number(num2) : "Error";
        break;
      default:
        res = 0;
    }
    setResult(res);
  };

  return (
    <>
      <div className="mt-3">
        <label>Number 1: </label>
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label>Number 2:</label>
        <input
          type="number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
        />
      </div>
      <br />
      <div className="dropdown">
        <button
          type="button"
          className="btn btn-primary dropdown-toggle"
          data-bs-toggle="dropdown"
        >
          {operator}
        </button>
        <ul className="dropdown-menu">
          <li><button className="dropdown-item" onClick={() => handleCalculation("+")}>+</button></li>
          <li><button className="dropdown-item" onClick={() => handleCalculation("-")}>-</button></li>
          <li><button className="dropdown-item" onClick={() => handleCalculation("*")}>*</button></li>
          <li><button className="dropdown-item" onClick={() => handleCalculation("/")}>/</button></li>
        </ul>
      </div>
      <br />
      <div>
        <h3>Result: {result}</h3>
      </div>
    </>
  );
}

export default Calculation;
