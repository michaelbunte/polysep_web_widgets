import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SolutePermeability from "./SolutePermeability"
import WaterConsumption from "./WaterConsumption.js";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/WaterConsumption" element={<WaterConsumption />} />
        <Route path="/SolutePermeability" element={<SolutePermeability />} />
        <Route index element={<SolutePermeability />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;