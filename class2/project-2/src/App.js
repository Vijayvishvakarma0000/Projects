import Data from "./components/Data";
import User from "./components/User";
import Customer from "./components/Customer";

function App() {
  return (
    <div className="App">This is App
    {/* When there is no content or children inside data*/}
      <Data/>
      <User/>
      <Customer/>
    </div>
  );
}

export default App;
