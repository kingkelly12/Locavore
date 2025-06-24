import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const linkClasses = (path) =>
    `text-sm font-medium hover:text-green-700 ${
      location.pathname.startsWith(path)
        ? "text-green-700 underline"
        : "text-gray-700"
    }`;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-700">Locavore 🥕</h1>
        <nav className="space-x-4">
          <Link to="/vendors" className={linkClasses("/vendors")}>Vendors</Link>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-red-600 hover:underline"
          >
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
