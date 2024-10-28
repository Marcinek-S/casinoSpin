import React from "react";

import CrashGame from "../Components/UI/CrashGame"

const Crash = () => {
    return (
      <div className="Crash">
        <CrashGame maxCrash={5}/>
      </div>
    );
  };
  
  export default Crash;