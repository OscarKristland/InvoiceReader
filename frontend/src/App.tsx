import { Route, Routes } from "react-router";
import { Navbar } from "./components/Navbar";
import InvoicePage from "./pages/InvoicePage";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<InvoicePage />} />
      </Routes>
    </>
  );
}

export default App;
