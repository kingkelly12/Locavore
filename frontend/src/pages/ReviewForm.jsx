import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function ReviewForm() {
  const { vendorId, reviewId } = useParams();
  const isEdit = Boolean(reviewId);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(1);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (vendorId) {
      fetch(`http://localhost:5000/vendors/${vendorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((vendor) => {
          if (vendor.reviews) setReviews(vendor.reviews);
        });
    }

    if (isEdit) {
      fetch(`http://localhost:5000/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setContent(data.content);
          setRating(data.rating);
        });
    }
  }, [vendorId, reviewId, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const url = isEdit
      ? `http://localhost:5000/reviews/${reviewId}`
      : `http://localhost:5000/reviews`;
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content,
        rating,
        vendor_id: parseInt(vendorId),
      }),
    });

    if (res.ok) {
      navigate(`/vendors/${vendorId}/reviews`);
    } else {
      alert("Failed to submit review");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    const res = await fetch(`http://localhost:5000/reviews/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setReviews(reviews.filter((r) => r.id !== id));
    } else {
      alert("Failed to delete review");
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-10 space-y-10">
        <div>
          <h2 className="text-2xl font-bold mb-4">{isEdit ? "Edit" : "Add"} Review</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              className="w-full border p-2"
              placeholder="Write your review..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              required
            />
            <input
              className="w-full border p-2"
              type="number"
              min="1"
              max="5"
              placeholder="Rating (1-5)"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              required
            />
            <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">
              {isEdit ? "Update" : "Submit"}
            </button>
          </form>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Existing Reviews</h3>
          <ul className="space-y-3">
            {reviews.map((review) => (
              <li key={review.id} className="border p-3 rounded">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Rating: {review.rating}</p>
                    <p>{review.content}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <button
                      onClick={() => navigate(`/vendors/${vendorId}/reviews/${review.id}`)}
                      className="text-sm text-blue-600 underline block"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(review.id)}
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
      </div>
    </Layout>
  );
}
