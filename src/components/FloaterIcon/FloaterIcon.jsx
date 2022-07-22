import React from "react";

export default function FloaterIcon({ onClick }) {
  return (
    <div className="mr-8 mb-8" onClick={onClick}>
      <img
        alt="chat_icon"
        src="https://via.placeholder.com/60?text=WI"
        className="rounded-full cursor-pointer"
      />
    </div>
  );
}
