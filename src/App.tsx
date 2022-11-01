import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Details from "./pages/detailed";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/detail" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
