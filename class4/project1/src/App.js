import { useState } from "react";
import MainContainer from "./components/MainContainer.jsx"
function App() {
  const [theme, setTheme] = useState(true);
  let companyName = "Dr Reddys Foundation"
  const [appData, setAppData] = useState("")
  function changeTheme() {
    setTheme(!theme)
  }

  function getDataInApp(data) {
    setAppData(data)
  }
  return (
    <div className={`${theme ? "App" : "App-body"}`}>
      <h1>{appData}</h1>

      <MainContainer colorTheme={theme} getDataInApp={getDataInApp}
      colorChangeTheme={changeTheme} companyName={companyName} />

    </div>
  );
}

export default App;
