import React from 'react'

const AnimatedBars = () => {
  return (
    <div className="absolute bottom-2 left-1 h-16 w-20 flex rotate-180">
      <div className="bg-violet-500 opacity-50 h-full w-2 ml-0.5 animate-[bars_1.2s_ease-in-out_infinite] m-0.5"></div>
      <div
        className="bg-violet-500 opacity-50 h-full w-2 ml-0.5 animate-[bars_1.2s_ease-in-out_infinite] m-0.5"
        style={{
          animationDelay: "0.3s",
        }}
      ></div>
      <div
        className="bg-violet-500 opacity-50 h-full w-2 ml-0.5 animate-[bars_1.2s_ease-in-out_infinite] m-0.5"
        style={{
          animationDelay: "0.6s",
        }}
      ></div>
      <div
        className="bg-violet-500 opacity-50 h-full w-2 ml-0.5 animate-[bars_1.2s_ease-in-out_infinite] m-0.5"
        style={{
          animationDelay: "0.9s",
        }}
      ></div>
      <div
        className="bg-violet-500 opacity-50 h-full w-2 ml-0.5 animate-[bars_1.2s_ease-in-out_infinite] m-0.5"
        style={{
          animationDelay: "0.12s",
        }}
      ></div>
      <div
        className="bg-violet-500 opacity-50 h-full w-2 ml-0.5 animate-[bars_1.2s_ease-in-out_infinite] m-0.5"
        style={{
          animationDelay: "0.15s",
        }}
      ></div>
    </div>
  )
}

export default AnimatedBars