import { useState } from "react";

function App() {

  const [userN, setUserN] = useState("Vineet")

  // let userName = "vineet";
  // function ChangeUserName() {
  //   console.log("click karo")
  //   userName = "Vineet Suman";
  //   console.log(userName)
  // }
  // console.log(userName)
  // setTimeout(()=>{
  //   console.log(userName)
  // },10000)

  function ChangeUserN() {
    console.log("click karo")
    setUserN("vineet suman")
    console.log(userN)
  }

 console.log(userN)
  return (
    <div>
      {/* example of state less via default js ke variable stateless hote hai
      value change hone par bhi ui me changes nhi dikhte hai */}
      {/* <p>my name is {userName}</p>
      <button onClick={ChangeUserName}>change name</button> */}


      <p>my name is {userN}</p>
      <button onClick={ChangeUserN}>change name</button>
    </div>
  );
}

export default App;
