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

  const handleDelete = async (vendorId) => {
    if (!window.confirm("Are you sure you want to delete this vendor?")) return;

    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:5000/vendors/${vendorId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setVendors(vendors.filter((v) => v.id !== vendorId));
    } else {
      alert("Failed to delete vendor");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Vendors</h2>
        <div className="space-x-2">
          <button
            onClick={() => navigate("/vendors/new")}
            className="text-sm text-blue-600 underline"
          >
            Add Vendor
          </button>
          <button onClick={handleLogout} className="text-sm text-red-600 underline">
            Logout
          </button>
        </div>
      </div>
      <ul className="space-y-2">
        {vendors.map((vendor) => (
          <li key={vendor.id} className="border p-4 rounded">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{vendor.name}</h3>
                <p className="text-sm text-gray-600">{vendor.location}</p>
                <p>{vendor.description}</p>
              </div>
              <div className="text-right space-y-1">
                <button
                  onClick={() => navigate(`/vendors/edit/${vendor.id}`)}
                  className="text-sm text-blue-600 underline block"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(vendor.id)}
                  className="text-sm text-red-600 underline block"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}