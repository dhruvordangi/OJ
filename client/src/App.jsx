import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider, { useAuth } from './context/AuthProvider.jsx';

import MainLayout from "./Layouts/MainLayout";
import Home from "./Pages/Home";
import About from "./pages/about.jsx";
import AddProblem from "./Components/AddProblem.jsx";
import ProblemSet from "./Components/ProblemSet.jsx";
import Compiler from "./Components/Compiler.jsx";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
      
        <MainLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/add-prob" element={<AddProblem />} />
            <Route path="/problems" element={<ProblemSet />} />
            <Route path="/compiler" element={<Compiler />} />
            {/* Add more routes as needed */}
          </Routes>
        </MainLayout>
      
    
  );
}

export default App;
