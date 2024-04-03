import Quote from "../components/Quote";
import SignupInputs from "../components/SignupInputs";


function Signup() {
return <div>
  <div className="grid grid-cols-1 lg:grid-cols-2">
 <div>
  <SignupInputs/>
 </div>
 <div className="hidden lg:block">
  <Quote/>
 </div>
</div>
</div>
}

export default Signup;
