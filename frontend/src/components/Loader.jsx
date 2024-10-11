import React from "react";

const Loader = ({ className = "" }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div id="ld">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;