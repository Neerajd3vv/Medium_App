import { useState } from "react";
import Inputbox from "./Inputbox";
import { SigninSchema } from "@neerajrandom/medium-common";
import { Link } from "react-router-dom";
import Button from "./Button";

function SigninInputs() {
  const [signinInputs, setSigninInputs] = useState<SigninSchema>({
    email: "",
    password: "",
  });
  return (
    <div className="flex flex-col justify-center h-screen ">
      <div className=" flex justify-center">
        <div>
          <div className="font-Poppins text-3xl font-bold flex justify-center  text-bubblyblue">
            Signin
          </div>
          <Inputbox
            label="Email"
            placeholder="test@gmail.com"
            onChange={(e) => {
              setSigninInputs({
                ...signinInputs,
                email: e.target.value,
              });
            }}
          />
          <Inputbox
            label="Password"
            placeholder="Enter your password"
            onChange={(e) => {
              setSigninInputs({
                ...signinInputs,
                email: e.target.value,
              });
            }}
          />
          <div className="font-Poppins flex justify-center">
            Go back to{" "}
            <Link className="text-heheblu underline" to={"/signup"}>
              {" "}
              Signup!
            </Link>
          </div>
          <Button button="Signin"/>
        </div>
      </div>
    </div>
  );
}

export default SigninInputs;
