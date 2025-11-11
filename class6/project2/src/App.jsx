import { useEffect, useState } from "react"
import Card from "./components/Card";

export default function App() {

  const [id, setId] = useState(1);
  const [data, setData] = useState();
  async function apiCall(url) {

    try {
      const response = await fetch(url);
      const Data = await response.json();
      setId(Data?.id)
      setData(Data)
      console.log(id)
      // console.log(Data)
    }
    catch (error) {
      console.log("Getting an error while fetching the data")
    }
  }
  useEffect(() => {
    apiCall(`https://fakestoreapi.com/products/${id}`)
  }, [id])



  function Increment() {
    if (id >= 20) {
      setId(1)
      return;
    }
    setId(id + 1)
  }
  function Decrecrement() {
    if (id <= 1) {
      setId(1)
      return;
    }
    setId(id - 1)

  }

  return (
    <div>
      <Card product={data} />

      <button onClick={() => Decrecrement()}>decrement</button>
      <p>{id}</p>
      <button onClick={() => Increment()}>Increment</button>


    </div>
  )
}
