import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminDashboard from "./Pages/AdminDashboard";

const RedirectToExternalUrl = () => {
  useEffect(() => {
    // Replace 'https://2846493.propelauthtest.com' with the specific external URL you want to redirect to
    window.location.href = "https://2846493.propelauthtest.com";
  }, []);

  return null; // This component does not render anything
};

function App() {
  return (
    <>
      {/* <TopNav /> Include the TopNav component */}
      <Routes>
        <Route path="/" element={<RedirectToExternalUrl />} />
        <Route path="/data" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;
