import styles from './Buttons.module.css';
import React from 'react';

function Buttons({onButtonClick}) {
  const buttons = ['C', '1', '2', '+', '3', '4', '-', '5', '6', '/', '7', '8', '*', '9', '0', '.', '='];

  return (
    <div className={styles.Btn}>
      {buttons.map((button) => (
        <button 
          key={button} 
          className={styles.Btn1} 
          onClick={() => onButtonClick(button)}
         
        >
          {button}
        </button>
      ))}
    </div>
  );
}

export default Buttons;






