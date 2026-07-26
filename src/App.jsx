import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Suppliers from "./pages/Suppliers";
import MenuSpecials from "./pages/MenuSpecials";
import RecipeGenerator from "./pages/RecipeGenerator";
import RecipeDetails from "./pages/RecipeDetails";
import Settings from "./pages/Settings";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/menuspecials" element={<MenuSpecials />} />
        <Route path="/recipegenerator" element={<RecipeGenerator />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
      />
    </>
  );
}

export default App;