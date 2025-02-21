import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import From from "./components/form.jsx";
import AllList from "./components/AllList.jsx";
import EditList from "./components/EditList.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}> 
        <Route index element={<From />} /> 
        <Route path="all/list" element={<AllList />} />
        <Route path="edit/list/:id" element={<EditList />} />
       <Route path="/edit/list" element={<EditList />} /> 
      </Route>
    </Routes>
  </BrowserRouter>
);