import logo from "./logo.svg";
import "./App.css";
import { useState } from "./hooks";

function Counter() {
  const [state, setState] = useState(0);
  const [state2, setState2] = useState(1);

  return (
    <div className="App">
      <button onClick={() => setState(state + 1)}>{state}</button>
      <button onClick={() => setState2(state2 + 1)}>{state2}</button>
    </div>
  );
}
function App() {
  return <Counter />;
}

export default App;
