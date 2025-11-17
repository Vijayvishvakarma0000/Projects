
import { useState } from "react";


function App() {


  const [userN, setUserN] = useState("Hello")
  function changeUserN(){
    console.log("click kar");
    setUserN("Welcome to react");
    console.log(userN);
  }

  return (
    <div className="App">
     <p>my name is {userN}</p>
      <button onClick={changeUserN}>change name</button>
    </div>
  );
}

export default App;
