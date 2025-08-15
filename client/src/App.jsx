import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import AuthProvider, { useAuth } from './context/AuthProvider.jsx';

import MainLayout from "./Layouts/MainLayout";
import Home from "./Pages/Home";
import About from "./Pages/About.jsx";
import AddProblem from "./Components/AddProblem.jsx";
import ProblemSet from "./Components/ProblemSet.jsx";
import Compiler from "./Components/Compiler.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";
import TestEditor from "./Pages/TestEditor.jsx";

function ProblemSolveWrapper() {
  const { id } = useParams();
  return <Compiler problemId={id} />;
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
      
        <MainLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/analytics" element={<AddProblem />} />
            <Route path="/problems" element={<ProblemSet />} />
            <Route path="/problems/:id/solve" element={<ProblemSolveWrapper />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/test-editor" element={<TestEditor />} />
            {/* Add more routes as needed */}
          </Routes>
        </MainLayout>
  );
}

export default App;
