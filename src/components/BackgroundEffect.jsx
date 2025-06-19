import React from "react";
import looperbg from "../assets/looper1.svg";

export default function BackgroundEffect() {
  return (
      <div className="absolute bottom-0 left-[-9rem] min-w-full h-full overflow-hidden" >
        <img src={looperbg} alt="" className="min-w-[150%]  translate-y-[-5%] translate-x-[-2%] 
        sm:min-w-[150%] sm:translate-y-[-13%] sm:translate-x-[-3%]
        " />
      </div>
  );
}
