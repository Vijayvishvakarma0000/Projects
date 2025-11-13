
import { Link, NavLink } from "react-router-dom"
function Navbar({ myTripData }) {
  return (
    <div className="navbar">
      <ul>
        <NavLink to="/logo"><li>Logo</li></NavLink>
        <NavLink to="/"> <li>AllTrip</li></NavLink>
        <NavLink to="/mytrip"><li>My Trip {myTripData.length === 0 ? "" : myTripData.length}</li>
        </NavLink>
      </ul>
    </div>
  )
}

export default Navbar