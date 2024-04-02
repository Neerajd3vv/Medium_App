import Quote from "../components/Quote"
import SigninInputs from "../components/SigninInputs"
import { useState, useEffect } from "react"
function Signin() {
  const [isBigScreen , setIsBigScreen ] = useState(window.innerWidth >= 1024)

  useEffect(()=>{
    function onScreenSizeChange (){
     setIsBigScreen(window.innerWidth >= 1024)
    }
    
    // added eventlistener on change of brower window onScreenSizeChange function will get called which set new width to isBigScreen state , then futher conditional tailwind on bases of true or false of wherther screeen was big or not
    window.addEventListener("resize", onScreenSizeChange)
    // cleanup function 
    return  () => window.removeEventListener("resize", onScreenSizeChange)
  })
  return (
    <div className="grid lg:grid-cols-2 ">
      <div className={isBigScreen? "lg:col-span-1" : "col-span-2" }>
        <SigninInputs/>
      </div>
      {isBigScreen && (
        <div className="lg:col-span-1">
          <Quote/>
        </div>
      )}
    </div>
  )
}

export default Signin