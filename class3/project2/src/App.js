import { useEffect, useState } from 'react'
import Login from "./components/Login.jsx"
import Signup from "./components/Signup.jsx"
import MainContainer from "./components/MainContainer.jsx"
import Navbar from './components/Navbar.jsx'
import { Routes, Route } from 'react-router-dom';
function App() {
  const [colorTheme, setColorTheme] = useState(false);
  const [CartData, setCardData] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    async function callApi(url) {
      setLoader(true)
      const res = await fetch(url);
      const ans = await res.json();
      setCardData(ans);
      setLoader(false)
    }
    callApi("https://free-food-menus-api-two.vercel.app/bbqs")
  }, [])

  const colorChangeTheme = () => {
    setColorTheme(!colorTheme);
  };
  return (
    <div>
      <Navbar colorChangeTheme={colorChangeTheme} colorTheme={colorTheme} />
      <Routes>
        <Route path="/" element={ <MainContainer colorTheme={colorTheme} colorChangeTheme={colorChangeTheme}
          CartData={CartData} loader={loader} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<Signup />} />
      </Routes>
    </div>

  )
}

export default App