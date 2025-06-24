import React from "react";
import { Star } from "lucide-react";

export default function StarRating({ value, onChange, editable = false }) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="flex space-x-1">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => editable && onChange(star)}
          className={
            "text-yellow-500" +
            (editable ? " hover:scale-110 transition-transform" : " cursor-default")
          }
        >
          <Star fill={star <= value ? "currentColor" : "none"} strokeWidth={1} />
        </button>
      ))}
    </div>
  );
}