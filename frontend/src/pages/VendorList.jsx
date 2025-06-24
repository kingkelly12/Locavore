import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VendorList() {
  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVendors = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/vendors", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setVendors(data);
      }
    };
    fetchVendors();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Vendors</h2>
        <button onClick={handleLogout} className="text-sm text-red-600 underline">
          Logout
        </button>
      </div>
      <ul className="space-y-2">
        {vendors.map((vendor) => (
          <li key={vendor.id} className="border p-4 rounded">
            <h3 className="text-lg font-semibold">{vendor.name}</h3>
            <p className="text-sm text-gray-600">{vendor.location}</p>
            <p>{vendor.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
