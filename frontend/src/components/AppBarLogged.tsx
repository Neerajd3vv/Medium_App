import { useState } from "react";
import { useLoggedUser } from "../Hooks/Bloghook";
import MediumLogo from "../images/Medium-Logo.png";
import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";
import ProfilePopup from "./ProfilePopup";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

function AppBarLogged() {
  const navigate = useNavigate();
  const [dropBox, setDropBox] = useState(false);
  const [profilePopup, setProfilePopup] = useState(false);
  const [userBio, setUserBio] = useState("");

  const dropBoxMenu = () => {
    setDropBox(!dropBox);
  };

  const profileClick = () => {
    setProfilePopup(!profilePopup);
    setDropBox(!dropBox);
  };

  const closeProfilePopup = () => {
    setProfilePopup(false);
  };

  const saveChanges = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/userbio`,
        userBio,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setProfilePopup(!profilePopup);
      const userData = response.data.Bio;
      if (userData) {
        navigate("/blogs");
      }
    } catch (error) {
      console.error("Error saving bio:", error);
      // Handle error, e.g., display an error message to the user
    }
  };

  const Logout = () => {
    localStorage.removeItem("token");
    setDropBox(false);
    window.location.reload();
  };

  const { userData } = useLoggedUser();

  return (
    <div className="flex justify-between px-4 lg:px-20 border-b-2 py-4 border-slate-500">
      <div className="flex items-center">
      <Link to={"/blogs"}>
        <img src={MediumLogo} className="w-40 mr-8 "  alt="Medium Logo" />
        </Link>
        <AppBarSearchbox />
      </div>
      <div className="flex items-center">
        <div className="cursor-pointer mx-8 font-Afacad text-lg">Write</div>
        <div className="cursor-pointer" onClick={dropBoxMenu}>
          <Avatar authorName={userData?.username} size={8} />
        </div>
        {dropBox && (
          <div className="absolute bg-white shadow-xl top-14 border-2 rounded-md py-2 mt-2 w-40 text-center z-10">
            <ul>
              <Link to={"/myblogs"}>
                <li className="py-2 px-4 font-Afacad font-semibold cursor-pointer hover:bg-slate-200">
                  My Blogs
                </li>
              </Link>

              <li
                className="py-2 px-4 font-Afacad font-semibold cursor-pointer hover:bg-slate-200"
                onClick={profileClick}
              >
                Profile
              </li>

              <li
                className="py-2 px-4 font-Afacad font-semibold cursor-pointer hover:bg-slate-200"
                onClick={Logout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
      {profilePopup && (
        <ProfilePopup
          onchange={(e) => setUserBio(e.target.value)}
          onclick={saveChanges}
          closeProfilePopup={closeProfilePopup}
        />
      )}
    </div>
  );
}

export default AppBarLogged;

function AppBarSearchbox() {
  return (
    <div className="hidden lg:flex">
      <input
        className="border-gray-200 focus:outline-none border-2 px-3 py-1 rounded-2xl"
        type="text"
        placeholder="Search"
      />
    </div>
  );
}
