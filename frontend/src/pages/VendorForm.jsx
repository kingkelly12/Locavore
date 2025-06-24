import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function VendorForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      const token = localStorage.getItem("token");
      fetch(`http://localhost:5000/vendors/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setName(data.name);
          setLocation(data.location);
          setDescription(data.description);
        });
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit
      ? `http://localhost:5000/vendors/${id}`
      : "http://localhost:5000/vendors";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, location, description }),
    });

    if (res.ok) {
      navigate("/vendors");
    } else {
      alert("Failed to save vendor");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">{isEdit ? "Edit" : "Add"} Vendor</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="w-full border p-2"
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <textarea
          className="w-full border p-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">
          {isEdit ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
