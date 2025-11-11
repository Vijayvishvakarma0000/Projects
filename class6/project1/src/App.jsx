import { useEffect, useState } from "react"
import Home from "./components/Home"


function App() {

  const [name, setName] = useState("Grow Tech")
  const [year, setYear] = useState(2024)
  // useEffect->it is a hook in react which is used to perform a side effect.
  // sideeffct-> kind of function which automatically trigger when you perfrom any event, like api calling,state change, database connection
  //  this is 1st type of useEffect(), it takes 2 parameter 1st is a callback function and second is a dependency array (It is optional).
  // also you can write a cleaner function in callback 
  //1st case-:useEffect()->Runs on a every render
  // useEffect(() => {
  //   console.log("Company name print in every render")
  // })


  //2nd case -> Runs only first Render
  // useEffect(() => {
  //   console.log("This run only once(1st render)")
  // }, [])

  //
  //3rd case -> Runs when the dependency array value change
  //   useEffect(() => {
  //   console.log("This run only when your name state value change)")
  // }, [name])

  //4TH case -> Runs when the dependency array any one value change that time callback excute
  // useEffect(() => {
  //   console.log("This run only when your name state value change)")
  // }, [name,year])

  // useEffect(() => {
  //   console.log("Component Added")
  //   //Cleaner Function this will excute when your component going to unmount
  //   return (() => {
  //     console.log("this run when component unmount")
  //   })
  // }, [])

  return (
    <div>
      <p>Company name is {name}</p>

      <button onClick={() => setName("drf")}>Change Company Name</button>
      <button onClick={() => setName("Grow Tech")}>Default Company Name</button>
      <p>Founded Year {year}</p>
      <button onClick={() => setYear(2025)}>Change Company Name</button>
      <button onClick={() => setYear(2024)}>Default Company Name</button>

      <Home />
    </div>)
}

export default App
