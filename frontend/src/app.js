import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import VendorList from "./pages/VendorList";
import VendorForm from "./pages/VendorForm";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/vendors" element={<VendorList />} />
        <Route path="/vendors/new" element={<VendorForm />} />
        <Route path="/vendors/edit/:id" element={<VendorForm />} />
      </Routes>
    </Router>
  );
}