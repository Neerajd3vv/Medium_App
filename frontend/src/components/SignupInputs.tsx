import { Link } from "react-router-dom";
import Inputbox from "./Inputbox";
import { useState } from "react";
import { SignupSchema } from "@neerajrandom/medium-common";
import Button from "./Button";


function SignupInputs() {
  // So here is we are inforcing/giving a type to authinputs state variable , which we have defined in common module of this project
  const [authInputs, setAuthInputs] = useState<SignupSchema>({
    username: "",
    email: "",
    password: "",
  });
  return (
    
    <div className="flex flex-col justify-center h-screen ">
    {/* {JSON.stringify(authInputs)} */}
      <div className="flex justify-center ">
        <div>
          <div className="  font-Poppins text-3xl font-bold flex justify-center  text-bubblyblue ">
            Create an account
          </div>
        
          <Inputbox
            label="Username"
            placeholder="Enter your username"
            onChange={(e) => {
              setAuthInputs({
                ...authInputs,
                username: e.target.value,
              });
            }}
          />
          <Inputbox
            label="Email"
            placeholder="test@gmail.com"
            onChange={(e) => {
              setAuthInputs({
                ...authInputs,
                email: e.target.value,
              });
            }}
          />
          <Inputbox
            label="Password"
            placeholder="Enter password"
            onChange={(e) => {
              setAuthInputs({
                ...authInputs,
                password: e.target.value,
              });
            }}
          />
            <div className="font-Poppins flex justify-center">
            Already have an account?
            <Link className="text-heheblu underline" to={"/signin"}>
              {" "}
              Signin
            </Link>
          </div>
          <Button button="signup"/>
        </div>
      </div>
    </div>
  );
}

export default SignupInputs;
