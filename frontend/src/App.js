import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import LoginSignup from "./components/LoginSignup";
import Dashboard from "./components/Dashboard";
import EwastePostForm from "./components/EwastePostForm";
import MaterialDetails from "./components/MaterialDetails";
import TransactionHub from "./components/TransactionHub";
import Messaging from "./components/Messaging";
import MyMaterials from "./components/MyMaterials";
import BuyForm from "./components/BuyForm";
import ConfirmOrder from "./components/ConfirmOrder";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/post-ewaste" element={<EwastePostForm />} />
        <Route path="/material/:id" element={<MaterialDetails />} />
        <Route path="/transactions" element={<TransactionHub />} />
        <Route path="/messages" element={<Messaging />} />
        <Route path="/my-materials" element={<MyMaterials />} />
        <Route path="/buy/:id" element={<BuyForm />} />
        <Route path="/confirm-order" element={<ConfirmOrder />} />
      </Routes>
    </Router>
  );
}

export default App;