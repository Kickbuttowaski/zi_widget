import React from "react";
import "./Loader.css"
export default function Loader({position="center"}) {
    const alignProp = "flex w-full justify-"+position
  return (
    <div className={alignProp}>
      <div className="snippet" data-title=".dot-pulse">
        <div className="stage">
          <div className="dot-pulse"></div>
        </div>
      </div>
    </div>
  );
}
