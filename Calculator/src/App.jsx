
// import React, { useState } from 'react';
// import styles from './App.module.css';
// import Inputbox from './Components/Inputbox';
// import Buttons from './Components/Buttons';

// // import Practice from './Components/Practice';


// function App() {
//   const [calValue, setValue] = useState('');

//   const onButtonClick = (buttonText) => {
//     if (buttonText === 'C') {
//       setValue(''); // Clear input
//     } else if (buttonText === '=') {
//       try {
//         const result = eval(calValue); // Perform calculation
//         setValue(String(result)); // Set result
//       } catch {
//         setValue('Error'); // Handle invalid input
//       }
//     } else {
//       setValue((prev) => prev + buttonText); // Append clicked button
//     }
//   };

//   return (
//     <>
   
//     <div className={styles.Calculator}>
//       <Inputbox inputValue={calValue} />
//       <Buttons onButtonClick={onButtonClick} />
//     </div>


   
//     </>
//   );
// }

// export default App;

import React, { useState } from 'react';


function App() {
  const [input, setInput] = useState('');

  const handleClick = (value) => {
    if (value === 'C') {
      setInput('');
    } else if (value === '=') {
      try {
        setInput(String(eval(input)));
      } catch {
        setInput('Error');
      }
    } else {
      setInput((prev) => prev + value);
    }
  };

  const buttons = ['C', '1', '2', '+', '3', '4', '-', '5', '6', '/', '7', '8', '*', '9', '0', '.', '='];

  return (
    <div className="calculator">
      <input type="text" className="display" value={input} readOnly />
      <div className="buttons">
        {buttons.map((btn, index) => (
          <button key={index} onClick={() => handleClick(btn)}>{btn}</button>
        ))}
      </div>
    </div>
  );
}

export default App;

