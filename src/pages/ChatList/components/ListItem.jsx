import React from "react";

export default function ListItem({ data }) {
  return (
    <section
      data-cid={data.cid}
      className="flex w-full items-center rounded-lg shadow-lg p-2 bg-white mb-4 cursor-pointer"
    >
      <img
        loading="lazy"
        alt="user_avatar"
        width={50}
        height={50}
        src={data.members[0].img}
        className="rounded-full mx-4 border-4 border-primary"
      />
      <div className="text-left w-full zi_textoverflow">
        <div className="flex flex-row justify-between w-full">
          <p className="font-bold">{data.members[0].name}</p>
          <p className="text-xs">10h ago</p>
        </div>
        <p
          className="text-xs "
          dangerouslySetInnerHTML={{ __html: data.msg.text }}
        />
      </div>
    </section>
  );
}
