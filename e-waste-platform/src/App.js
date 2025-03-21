import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginSignup from "./components/LoginSignup";
import Dashboard from "./components/Dashboard";
import EwastePostForm from "./components/EwastePostForm";
import MaterialSearch from "./components/MaterialSearch";
import MaterialRequestForm from "./components/MaterialRequestForm";
import TransactionOverview from "./components/TransactionOverview";
import InAppMessaging from "./components/InAppMessaging";
import WebinarsResources from "./components/WebinarsResources";
import MyMaterials from "./components/MyMaterials"; // Import MyMaterials component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/post-ewaste" element={<EwastePostForm />} />
        <Route path="/search-materials" element={<MaterialSearch />} />
        <Route path="/request-material" element={<MaterialRequestForm />} />
        <Route path="/transactions" element={<TransactionOverview />} />
        <Route path="/messages" element={<InAppMessaging />} />
        <Route path="/resources" element={<WebinarsResources />} />
        <Route path="/my-materials" element={<MyMaterials />} /> {/* Route for MyMaterials */}
      </Routes>
    </Router>
  );
}

export default App;