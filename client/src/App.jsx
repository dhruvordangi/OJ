import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google"; // ✅ Import this
import AuthProvider, { useAuth } from './context/AuthProvider.jsx';

import MainLayout from "./Layouts/MainLayout";
import Home from "./Pages/Home";
import About from "./pages/about.jsx";
import Login from "./Components/Login.jsx";
import Signup from "./Components/Signup.jsx";
import Logout from "./Components/Logout.jsx";
import UploadFile from "./Pages/UploadFile.jsx";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authUser, setAuthUser] = useAuth();

  return (
      
        <MainLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<UploadFile />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
            {/* Add more routes as needed */}
          </Routes>
        </MainLayout>
      
    
  );
}

export default App;
