import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import EwastePostForm from "./components/EwastePostForm";
import MaterialDetails from "./components/MaterialDetails";
import TransactionHub from "./components/TransactionHub";
import Communication from "./components/Communication";
import MyMaterials from "./components/MyMaterials";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/post-material" element={<EwastePostForm />} />
        <Route path="/material/:id" element={<MaterialDetails />} />
        <Route path="/transaction-hub" element={<TransactionHub />} />
        <Route path="/communication" element={<Communication />} />
        <Route path="/my-materials" element={<MyMaterials />} />
      </Routes>
    </Router>
  );
}

export default App;