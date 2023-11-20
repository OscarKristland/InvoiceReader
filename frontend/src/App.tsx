import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import InvoicePage from "./pages/InvoicePage";
import "./App.css";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/invoice" element={<InvoicePage />} />
      </Routes>
    </>
  );
}

export default App;
