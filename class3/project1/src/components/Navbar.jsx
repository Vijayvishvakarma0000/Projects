import { IoSunnyOutline, } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";

function Navbar({colorTheme, colorChangeTheme}) {
   

    return (
        <div className="nav-bar">
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Services</li>
                <li>Login</li>
                <li>Signup</li>
                <button className="btn-back" onClick={colorChangeTheme}>

                    {colorTheme ? (<IoSunnyOutline />) : (<FaMoon />)}
                    {/* or */}
                    {/* {colorTheme === true ? (<IoSunnyOutline />) : (<FaMoon />)} */}


                </button>
            </ul>
        </div>
    )
}

export default Navbar