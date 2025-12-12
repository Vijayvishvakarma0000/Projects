import React, { useState } from 'react'

function Usestateproject1() {
    const[count,setCount]=useState(0)
    const Increment=()=>{
        setCount(count+1)
    }
    const Decrement=()=>{
        setCount(count-1)
    }
    const Reset=()=>{
      setCount(0)
    }


  return (
    <>
        <h1 className='box'>{count}</h1>
        <button onClick={Increment}>Increment me</button>
        <button onClick={Decrement}>Decrement</button>
        <button onClick={Reset}> Reset</button>


    </>
  )
}

export default Usestateproject1