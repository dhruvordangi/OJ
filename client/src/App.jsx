import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider, { useAuth } from './context/AuthProvider.jsx';

import MainLayout from "./Layouts/MainLayout";
import Home from "./Pages/Home";
import About from "./pages/about.jsx";


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
      
        <MainLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            {/* Add more routes as needed */}
          </Routes>
        </MainLayout>
      
    
  );
}

export default App;
