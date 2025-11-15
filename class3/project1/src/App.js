import { useState } from "react";
import MainContainer from "./components/MainContainer.jsx"
function App() {
   const [theme, setTheme] = useState(true);

    // kabhi bhi apka setstate vala function bahar call nahi karna chahiye nahi to vo infinite rendering kar deta hai
    // setTheme(false);

    function changeTheme() {
        setTheme(!theme)
    }
  return (
    <div className={`${theme?"App":"App-body"}`}>

      <MainContainer colorTheme={theme} colorChangeTheme={changeTheme} />
      {/* <MainContainer/> */}
    </div>
  );
}

export default App;
