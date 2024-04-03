import Quote from "../components/Quote";
import SigninInputs from "../components/SigninInputs";

function Signin() {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <SigninInputs />
        </div>
        <div className="hidden lg:block">
          <Quote />
        </div>
      </div>
    </div>
  );
}

export default Signin;
