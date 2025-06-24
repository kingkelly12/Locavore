import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import StarRating from "./StarRating";

export default function ReviewCard({ review, onDelete }) {
  const { vendorId } = useParams();
  const navigate = useNavigate();

  const timestamp = new Date(review.created_at || review.updated_at || Date.now())
    .toLocaleString();

  return (
    <li className="border p-3 rounded">
      <div className="flex justify-between">
        <div>
          <StarRating value={review.rating} editable={false} />
          <p className="text-sm text-gray-600 mb-1">
            by {review.username || "Anonymous"} • {timestamp}
          </p>
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
            onClick={() => onDelete(review.id)}
            className="text-sm text-red-600 underline block"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
