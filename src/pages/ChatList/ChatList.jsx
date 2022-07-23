import React from "react";
import Header from "./components/ChatListHeader.jsx";
import Body from "./components/ChatListBody.jsx";

import "./ChatList.css";
export default function ChatList() {
  return (
    <div className="flex flex-col text-center h-full relative z-2 ">
      <Header />
      <Body />
      {/* <Footer /> */}
      <WaveSVG />
    </div>
  );
}

const WaveSVG = () => {
  return (
    // <svg
    //   id="visual"
    //   viewBox="0 0 600 900"
    //   xmlns="http://www.w3.org/2000/svg"
    //   version="1.1"
    //   className="absolute top-0 -z-1"
    // >
    //   <path
    //     d="M0 514L50 473.7C100 433.3 200 352.7 300 307.3C400 262 500 252 550 247L600 242L600 0L550 0C500 0 400 0 300 0C200 0 100 0 50 0L0 0Z"
    //     fill="#0066FF"
    //     stroke-linecap="round"
    //     stroke-linejoin="miter"
    //   ></path>
    // </svg>
    <svg
      id="svg"
      viewBox="0 0 500 349"
      xmlns="http://www.w3.org/2000/svg"
      class="transition duration-300 ease-in-out delay-150"
      className="absolute top-0 -z-1 rounded-xl"
    >
      <path
        d="M 0,700 C 0,700 0,350 0,350 C 205.71428571428572,450 822.8571428571429,400 1440,350 C 1440,350 1440,700 1440,700 Z"
        stroke="none"
        stroke-width="0"
        fill="#9900efff"
        class="transition-all duration-300 ease-in-out delay-150 path-0"
        transform="rotate(-180 720 350)"
      ></path>
    </svg>
  );
};
