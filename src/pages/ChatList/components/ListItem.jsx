import React from "react";

export default function ListItem({data}) {
  return (
    <div className="flex w-full items-center rounded-lg bg-red-50 p-2">
      <img
        alt="user_avatar"
        width={60}
        height={60}
        src={data.members[0].img}
        className="rounded-full mx-4 border-2 border-primary"
      />
      <div className="text-left w-full">
        <div className="flex flex-row justify-between w-full">
          <p className="font-bold">{data.members[0].name}</p>
          <p className="text-xs">10h ago</p>
        </div>
        <p className="text-sm">{data.msg.text}</p>
      </div>
    </div>
  );
}
