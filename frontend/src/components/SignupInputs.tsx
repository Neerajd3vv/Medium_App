import { Link } from "react-router-dom";
import Inputbox from "./Inputbox";
import { useState } from "react";
import { SignupSchema } from "@neerajrandom/medium-common";
import Button from "./Button";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
function SignupInputs() {
  // So here is we are inforcing/giving a type to authinputs state variable , which we have defined in common module of this project
  const [authInputs, setAuthInputs] = useState<SignupSchema>({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  async function signupBackend() {
    console.log("called");

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        authInputs
      );
      const token = response.data.token;

      if (!token ) {
        alert("No token returned, use different email!");
        return;
      }
      localStorage.setItem("token", token);
      navigate("/blogs");
    } catch (error) {
      alert("Request failed!");
    }
  }
  return (
    <div className="flex flex-col justify-center h-screen ">
      {/* {JSON.stringify(authInputs)} */}
      <div className="flex justify-center ">
        <div className="border-2 py-14 px-8 shadow-lg rounded-xl">
          <div className="  font-Gelasio text-4xl mb-4  flex justify-center  text-bubblyblue ">
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
            type="password"
            placeholder="Enter password"
            onChange={(e) => {
              setAuthInputs({
                ...authInputs,
                password: e.target.value,
              });
            }}
          />
          <div className="font-Poppins pt-2 flex justify-center">
            Already have an account?
            <Link className="text-heheblu underline" to={"/signin"}>
              {" "}
              Signin
            </Link>
          </div>
          <Button button="signup" onClick={signupBackend} />
        </div>
      </div>
    </div>
  );
}

export default SignupInputs;
