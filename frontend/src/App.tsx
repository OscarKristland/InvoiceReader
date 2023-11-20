import { Route, Routes } from "react-router";
import { Navbar } from "./components/Navbar";
import HomePage from "./pages/HomePage";
import InvoicePage from "./pages/InvoicePage";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/invoice" element={<InvoicePage />} />
      </Routes>
    </>
  );
}

export default App;
