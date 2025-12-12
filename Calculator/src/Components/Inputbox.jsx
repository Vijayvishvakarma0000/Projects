import React from 'react'
import styles from'./Inputbox.module.css'

function Inputbox({inputValue}) {
  return (
    <div>
    <input type='text' className={styles.display}
    value={inputValue}
    readOnly
    
    />
    
    </div>
  )
}

export default Inputbox



