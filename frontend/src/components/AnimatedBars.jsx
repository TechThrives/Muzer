import React from "react";

const AnimatedBars = () => {
  return (
    <div className="absolute bottom-2 left-1 h-16 w-20 flex rotate-180">
      <div className="bg-violet-500 opacity-50 h-full w-2 ml-0.5 animation-bars animation-delay-0 m-0.5"></div>
      <div className="bg-violet-500 opacity-50 h-full w-2 ml-0.5 animation-bars animation-delay-1 m-0.5"></div>
      <div className="bg-violet-500 opacity-50 h-full w-2 ml-0.5 animation-bars animation-delay-2 m-0.5"></div>
      <div className="bg-violet-500 opacity-50 h-full w-2 ml-0.5 animation-bars animation-delay-3 m-0.5"></div>
      <div className="bg-violet-500 opacity-50 h-full w-2 ml-0.5 animation-bars animation-delay-4 m-0.5"></div>
      <div className="bg-violet-500 opacity-50 h-full w-2 ml-0.5 animation-bars animation-delay-5 m-0.5"></div>
    </div>
  );
};

export default AnimatedBars;
