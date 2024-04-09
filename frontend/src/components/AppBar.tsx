import { Avatar } from "./BlogCard";
import MediumLogo from "../images/Medium-Logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AppBar() {
  const [dropBox, setDropBox] = useState(false);
  const navigate = useNavigate();
  function handleNavigate() {
    navigate("/create-blog");
  }
  const dropOn = () => {
    setDropBox(!dropBox);
  };

  const dropOff = () => {
    setDropBox(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="flex justify-between px-12 border-b-2 py-4 border-slate-200">
      <div className="flex ">
        <Link to={"/blogs"}>
          <img src={MediumLogo} alt="Medium-Logo " className="w-32" />
        </Link>
        <div className="flex col items-center relative">
          <AppBarSearchbox />
        </div>
      </div>
      <div className="flex col items-center relative">
        <button
          onClick={handleNavigate}
          className="bg-green-500 mr-6 hover:bg-green-600 text-white font-bold py-2 px-4 w-40 rounded-xl"
        >
          Publish
        </button>

        {dropBox && (
          <div className="absolute top-14 right-0 bg-white border-2 border-gray-200 rounded-lg z-10">
            <ul className="py-2">
              <li
                className=" cursor-pointer font-hind  font-semibold px-4 py-3 hover:bg-gray-200"
                onClick={dropOff}
              >
                Profile picture
              </li>
              <li
                className=" cursor-pointer  font-hind font-semibold px-4 py-3 hover:bg-gray-200"
                onClick={dropOff}
              >
                Bio
              </li>
              <li
                className=" cursor-pointer font-hind font-semibold px-4 py-3 hover:bg-gray-200"
                onClick={logout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
        {localStorage.getItem("token") ? (
          <div className=" cursor-pointer mx-6 " onClick={dropOn}>
            <Avatar authorName="Neeraj" size={8} />
          </div>
        ) : (
          <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg
              className="absolute w-12 h-12 text-gray-400 -left-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

function AppBarSearchbox() {
  return (
    <div>
      <input
        className="border-gray-200 border-2 px-3 py-1 rounded-2xl "
        type="text"
        placeholder="Search"
      />
    </div>
  );
}

export default AppBar;
