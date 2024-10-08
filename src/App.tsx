// src/pages/App.tsx
import React from "react";
import SignUp from "./pages/Signup";
import Welcome  from "./pages/Welcome";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importa el CSS de react-toastify

const App: React.FC = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
       <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/welcome" element={<Welcome />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;