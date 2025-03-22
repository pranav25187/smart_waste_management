import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginSignup from "./components/LoginSignup";
import Dashboard from "./components/Dashboard";
import EwastePostForm from "./components/EwastePostForm";
import MaterialSearch from "./components/MaterialSearch";
import TransactionOverview from "./components/TransactionOverview";
import InAppMessaging from "./components/InAppMessaging";
import About from "./components/About";
import MyMaterials from "./components/MyMaterials";
import RawMaterials from "./components/RawMaterials";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/post-ewaste" element={<EwastePostForm />} />
        <Route path="/search-materials" element={<MaterialSearch />} />
        <Route path="/transactions" element={<TransactionOverview />} />
        <Route path="/messages" element={<InAppMessaging />} />
        <Route path="/about" element={<About />} />
        <Route path="/my-materials" element={<MyMaterials />} />
        <Route path="/raw-materials" element={<RawMaterials />} /> {/* Route for Raw Materials */}
      </Routes>
    </Router>
  );
}

export default App;
