import Navbar from "./components/Navbar"
import TripContainer from "./components/TripContainer"
import AllTrip from "./components/AllTrip"
import { useState } from "react"
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from "react-router-dom";
function App() {
  const [myTripData, setMyTripData] = useState([])
  return (
    <div>
      <Navbar myTripData={myTripData} />

      {/* <AllTrip myTripData={myTripData} setMyTripData={setMyTripData} /> */}
      <Routes>
        <Route path="/" element={<TripContainer setMyTripData={setMyTripData} myTripData={myTripData} />} />
        <Route path="/logo" element={<TripContainer setMyTripData={setMyTripData} myTripData={myTripData} />} />
        <Route path="/mytrip" element={<AllTrip myTripData={myTripData} setMyTripData={setMyTripData} />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App