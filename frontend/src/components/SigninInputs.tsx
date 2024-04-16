import { useState } from "react";
import Inputbox from "./Inputbox";
import { SigninSchema } from "@neerajrandom/medium-common";
import { Link } from "react-router-dom";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

function SigninInputs() {
  const [signinInputs, setSigninInputs] = useState<SigninSchema>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  async function signinBackend() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        signinInputs
      );
      const token = response.data.token;

      if (!token) {
        alert("User not found with such credentials, check your credentials!");
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
      <div className=" flex justify-center">
        <div className="border-2 py-14 px-8 shadow-lg rounded-xl">
          <div className="font-Gelasio mb-4 text-4xl  flex justify-center  text-bubblyblue">
            Welcome Back!
          </div>
          <Inputbox
            label="Email"
            placeholder="test@gmail.com"
            onChange={(e) => {
              setSigninInputs({
                ...signinInputs,
                email: e.target.value.trim(),
              });
            }}
          />
          <Inputbox
            label="Password"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => {
              setSigninInputs({
                ...signinInputs,
                password: e.target.value.trim(),
              });
            }}
          />
          <div className="font-Poppins pt-2 flex justify-center">
            Go back to{" "}
            <Link className="text-heheblu underline" to={"/signup"}>
              {" "}
              Signup!
            </Link>
          </div>
          <Button button="Signin" onClick={signinBackend} />
        </div>
      </div>
    </div>
  );
}

export default SigninInputs;
