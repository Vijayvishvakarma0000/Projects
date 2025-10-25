import React,{useState} from 'react'

function Livetyping() {
    const [text1, setText]=useState('');

    const handleOnchange =(e)=>{
        setText(e.target.value);
        e.target.reset()

    }
  return (
    <div>
        <input type='text' value={text1} name='text' onChange={handleOnchange}/>
        <br></br>
        <h1>{text1}</h1>

    </div>
  )
}

export default Livetyping