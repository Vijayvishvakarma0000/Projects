import { useState } from "react";

function App() {
  //js me jo bhi variable ya object hote hai sab stateless hote hai
  // let a = 10;
  // console.log(a)
  // state-> State is the current data of the component( vah ddata kisi variable ya object se aana chaheaye)
  //stateless state-> jab me kisi btn me click karta hu agar mujhe UI ke upar koi changes nhi dikhte uska matlab vo stateless hai
  // let name = "Ritik Jat"
  // console.log(name)
  // setTimeout(()=>{
  //   console.log(name)
  // },10000)



  //stateless state-> jab me kisi btn me click karta hu agar mujhe UI ke upar koi changes  dikhte uska matlab vo stateactive hai
  // react ke andar by default state state less hoti hai
  //hooks-> predefine function whihc is used to make the state, state active.

  /*useState() Hook-> useState() hook is a hook by which we handle single state at a time.
   it return array of 2 parameters, 1st parameter is initial value of the state and 2nd parameter
   is funtion which is used to change the value of initial state/state.*/

  // syntex of useState()=>
  // const [Fname1, setFName1] = useState("Ritik ");
  // const [Lname1, setLName1] = useState(" Jat");


  // function changeName() {

  //   console.log("btn click ho gai")
  //   // name1 = "Jat Saab"// esa state ke sath nhi kar sakte hai 

  //   setFName1("Mohit")

  // }

  // let changeName1 = () => {

  //   console.log("btn click ho gai")
  //   // name1 = "Jat Saab"// esa state ke sath nhi kar sakte hai 
  //   setLName1("saab")

  // }




  //Veerendra Approach (Lolipop)
  // const [id, setId] = useState(101);
  // const [name, setName] = useState("Ritik")
  // const [age, setAge] = useState(22)
  // const [email, setEmail] = useState("ritik@gmail.com");
  // const [city, setCity] = useState("Indore");
  // function changeDataOfUser() {
  //   setId(1000)
  //   setName("Mohit")
  //   setAge(30)
  //   setEmail("mohit@gmail.com")
  //   setCity("Harda")
  // }


  //Best way (Pista approach)
  const [user, setUser] = useState({
    id: 101,
    name: "Ritik",
    age: 22,
    email: "ritik@gmail.com",
    city: "Indore"
  })

  console.log("user", user)

  function changeDataOfUserviaObject() {
    // setUser("ram dayal")
    //    //appne ek object ko variable bna diya  ki apne ek object ke ander ek string ko pass krdiya jo apka object ek variable ban gya
    setUser({...user,email : "lolipop@gmail.com"}
  )
}

  return (<div>

    {/* <p>His name is {name}</p>
    <button onClick={() => {
      console.log("btn click ho gai")
      name = "Jat Saab"
    }}>changeName</button> */}



    {/* <p>His name is {name1}</p>
    <button onClick={() => {
      console.log("btn click ho gai")
      // name1 = "Jat Saab"// esa state ke sath nhi kar sakte hai 

      setName1("Jat saab")
    }}>changeName</button> */}


    {/* for making code more beautiful we have to make the separate function  or ye best way hai*/}
    {/* <p>His name is {`${Fname1}  ${Lname1}`}</p>
    <button onClick={changeName}>changeName</button>
    <button onClick={changeName1}>changeName</button> */}


    {/* <div className="card">
      <p><b>ID:</b>{id}</p>
      <p><b>Name:</b>{name}</p>
      <p><b>Age:</b>{age}</p>
      <p><b>Email:</b>{email}</p>
      <p><b>City:</b>{city}</p>
      <button onClick={changeDataOfUser}>Change Data</button>
    </div> */}

    {/*best ways */}
    <div className="card">
      <p><b>ID:</b>{user.id}</p>
      <p><b>Name:</b>{user.name}</p>
      <p><b>Age:</b>{user.age}</p>
      <p><b>Email:</b>{user.email}</p>
      <p><b>City:</b>{user.city}</p>
      <button onClick={changeDataOfUserviaObject}>Change Data</button>
    </div>


  </div>)
}
export default App;