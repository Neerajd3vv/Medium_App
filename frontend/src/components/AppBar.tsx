import { Link } from "react-router-dom";
import MediumLogo from "../images/Medium-Logo.png";
import { useState } from "react";

function AppBar() {
  const [dropBox, setDropBox] = useState(false);

  function dropBoxAction() {
    setDropBox(!dropBox);
  }
  return (
    <div className="grid grid-cols-2  lg:px-20 border-b-2 py-4 border-slate-500">
      <div className="lg:ml-20">
        <Link to={"/blogs"}>
          <img src={MediumLogo} className="w-40" alt="Medium Logo" />
        </Link>
      </div>

      <div className=" flex justify-center items-center  grid-cols-2">
        <div className=" pr-8 hidden lg:flex">
          <div className="mx-4 cursor-pointer font-Afacad">Our story</div>
          <div className="mx-4 cursor-pointer font-Afacad">Write</div>
          <Link to={"/signin"}>
            {" "}
            <div className="mx-4 cursor-pointer font-Afacad">Signin</div>
          </Link>
        </div>

        <div>
          <div className="font-Hind flex justify-center items-center relative">
            <button
              onClick={dropBoxAction}
              className="bg-black font-hind hover:bg-MainBlack text-white font-bold py-2 px-4 w-32 lg:w-40 rounded-3xl"
            >
              Get Started
            </button>
          </div>
          {dropBox && (
            <div className="absolute bg-MainBlack shadow-xl top-14 border-2 rounded-md py-2 mt-2 w-40 h-40 flex items-center justify-center text-center z-10">
              <ul className="w-full">
                <Link to={"/signin"}>
                  <li className="py-2 px-4 text-white rounded-full font-Mullish  text-lg  cursor-pointer hover:bg-slate-200 hover:text-black">
                    Signin
                  </li>
                </Link>
                <Link to={"/signup"}>
                  <li className="py-2 px-4 text-white rounded-full  font-Mullish  text-lg  cursor-pointer hover:bg-slate-200 hover:text-black">
                    Signup
                  </li>
                </Link>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AppBar;
