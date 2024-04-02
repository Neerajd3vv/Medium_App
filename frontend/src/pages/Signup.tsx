import Quote from "../components/Quote";
import SignupInputs from "../components/SignupInputs";
import { useState, useEffect } from "react";

function Signup() {
  const [largeScreen , SetlargeScreen ] = useState(window.innerWidth >= 1024)
  useEffect(()=>{
    const screenChange = () =>{
     SetlargeScreen(window.innerWidth >= 1024)
    }

    window.addEventListener("resize" , screenChange)
    return () => window.removeEventListener("resize", screenChange)
  })
  return (
    <div className="grid lg:grid-cols-2 items-center">
    <div className={largeScreen? "lg:col-span-1" : "col-span-2"}>
 <SignupInputs/>
    </div>
      {largeScreen && (
        <div className="lg:col-span-1">
          <Quote/>
        </div>
      )}
    </div>
  );
}

export default Signup;
