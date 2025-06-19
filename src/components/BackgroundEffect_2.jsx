import React from "react";
import looperbg from "../assets/looper1.svg";

export default function BackgroundEffect() {
  return (
      <div className="absolute bottom-0 left-[-9rem] min-w-full h-full overflow-hidden" >
        <img src={looperbg} alt="" className="min-w-[140%]  translate-y-[-10%] translate-x-[-2%] 
        " />
      </div>
  );
}
