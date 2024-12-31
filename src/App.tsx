import { useState } from "react";
import Tickets from "./components/Tickets";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="bg-green-700">hellooo</div>
      <Tickets />
    </>
  );
}

export default App;
