import React, { useState } from 'react'

export const Dynamictext = () => {
    const[text,setText]= useState('');

    
  return (
    
    <div>
        <input
        type='text'
        placeholder='type somethind...'
        value={text}
        onChange={(e)=>setText(e.target.value)}
        
        
        
        />
       
        
      <h2>{text ? `You typed: ${text}` : 'Start typing...'}</h2>

    </div>
  )
}
