import React from "react";

export default function ListItem() {
  return (
    <div className="flex w-full items-center rounded-lg bg-red-50 p-2">
      <img
        alt="user_avatar"
        src="https://via.placeholder.com/60?text=WI"
        className="rounded-full mx-4"
      />
      <div className="text-left w-full">
        <div className="flex flex-row justify-between w-full">
          <p className="font-bold">Username</p>
          <p className="text-xs">10h ago</p>
        </div>
        <p className="text-sm">some convo he made</p>
      </div>
    </div>
  );
}
