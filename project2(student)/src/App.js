
import { Routes, Route } from 'react-router-dom'
import NotFound from './components/NotFound.jsx'
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx"
import MyCart from "./pages/MyCart.jsx"
import SingleCard from './components/SingleCard.jsx';
import Navbar from "./components/Navbar.jsx"
import Home from './components/Home.jsx';
import Profile from "./pages/Profile.jsx"
import { useEffect, useState } from 'react';
function App() {

  const [apiData, setApiData] = useState([])
  const [cartData, setCartData] = useState([])
  // I want to call this function only first render of App

  async function getData(url) {
    try {
      const res = await fetch(url);
      const data = await res.json()
      console.log("api response is", data)
      setApiData(data)
    }
    catch (err) {
      console.log("Getting an error while fetching the data")
    }
  }

  // this willcall 1st time when app is rendering
  useEffect(() => {
    getData("https://fakestoreapi.com/products/");
  }, [])



  return (
    <>  <Navbar cartData={cartData} />
      <Routes>
        <Route path='/' element={<Home data={apiData} cartData={cartData}
          setCartData={setCartData} />} />
        <Route path='/mycart' element={<MyCart cartData={cartData} setCartData={setCartData} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/card/:id' element={<SingleCard cartData={cartData} setCartData={setCartData} />} />

        <Route path='*' element={<NotFound />} />
      </Routes></>
  )
}

export default App