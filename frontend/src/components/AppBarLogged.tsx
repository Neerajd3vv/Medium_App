import { useState } from "react";
import { useLoggedUser } from "../Hooks/Bloghook";
import MediumLogo from "../images/Medium-Logo.png";
import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

function AppBarLogged() {
  const [dropBox, setDropBox] = useState(false);

  const dropBoxMenu = () => {
    setDropBox(!dropBox);
  };

  const Logout = () => {
    localStorage.removeItem("token");
  };
  const { userData } = useLoggedUser();
  return (
    <div className=" flex justify-between px-4 lg:px-20 border-b-2 py-4 border-slate-500">
      <div className="flex items-center">
        <img src={MediumLogo} className="w-40 mr-8" />
        <AppBarSearchbox />
      </div>
      <div className="flex items-center">
        <div className=" cursor-pointer mx-8 font-Afacad text-lg">Write</div>
        <div className="cursor-pointer" onClick={dropBoxMenu}>
          <Avatar authorName={userData?.username} size={8} />
        </div>
        {dropBox && (
          <div className="absolute bg-white shadow-xl top-14 border-2 rounded-md py-2 mt-2 w-40 text-center z-10 ">
            <ul>
                <Link to={"/profile"}>
              <li className="py-2 px-4 font-Afacad font-semibold cursor-pointer hover:bg-slate-200">
                Profile
              </li>
              </Link>

              <li
                className="py-2 px-4 font-Afacad font-semibold cursor-pointer hover:bg-slate-200"
                onClick={Logout}
              >
                Logout
              </li>

              <Link to={"/settings"}>
                <li className="py-2 px-4 font-Afacad font-semibold cursor-pointer hover:bg-slate-200">
                  Settings
                </li>
              </Link>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default AppBarLogged;

function AppBarSearchbox() {
  return (
    <div className="hidden lg:flex">
      <input
        className="border-gray-200 focus:outline-none border-2 px-3 py-1 rounded-2xl "
        type="text"
        placeholder="Search"
      />
    </div>
  );
}
