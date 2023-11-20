import { createBrowserRouter } from "react-router-dom";
import InvoicePage from "../pages/InvoicePage";
import HomePage from "../pages/HomePage";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "invoice", element: <InvoicePage /> },
    ],
  },
]);
