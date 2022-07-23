import React from "react";
export default function Header() {
  return (
    <header className="flex flex-col items-start p-4 bg-white relative z-4 rounded-t-xl">
      <img
        alt="user_avatar"
        src="https://via.placeholder.com/60?text=WI"
        className="rounded-full mx-4 border-2 border-primary"
      />
      <div className="ml-4 mt-2 text-left">
        <p className="text-2xl">Hi, we are Blah Blah</p>
        <p className="text-md">some random description</p>
      </div>
    </header>
  );
}
