import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-700">Locavore 🥕</h1>
        <nav className="space-x-4">
          <Link to="/vendors" className="text-sm font-medium text-gray-700 hover:text-green-700">Vendors</Link>
          <button onClick={handleLogout} className="text-sm font-medium text-red-600 hover:underline">
            Logout
          </button>
        </nav>
      </header>
      <main className="flex-1 p-6 max-w-4xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
