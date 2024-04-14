import { useState } from "react";
import {
  useLoggedUser,
  useTokenExists,
  useUserBioChecking,
} from "../Hooks/Bloghook";
import MediumLogo from "../images/Medium-Logo.png";
import Blackprofile from "../images/blackProfile.png";
import BlackLogout from "../images/logoutTwo.png";
import MyBlogs from "../images/RealBlog.webp";
import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";
import { ProfilePopupOne, ProfilePopupTwo } from "./ProfilePopup";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

function AppBarLogged() {
  const { userBioValue, userProfile } = useUserBioChecking();
  const navigate = useNavigate();
  const [dropBox, setDropBox] = useState(false);
  const [profilePopup, setProfilePopup] = useState(false);
  const [userBio, setUserBio] = useState("");
  const [userProfilePicture, setUserProfilePicture] = useState("");
  // const [logoutButtonClicked , setLogoutButtonClicked] = useState(false)
  const { updateAuthenticationStatus } = useTokenExists();

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

  // navigaate to blogs route
  const navigateToMyblogs = () => {
    navigate("/myblogs");
    setProfilePopup(!setProfilePopup);
    updateAuthenticationStatus(false);
  };

  // savechanges for new Profile
  const saveChanges = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/userbio`,
        { bio: userBio, profilePicture: userProfilePicture },

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

  // savechanges for updating Profile
  const saveChangesUpdated = async () => {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/user/userprofileupdate`,
      userBio,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const updatedUserProfile = response.data.UpdtedProfile;
    setProfilePopup(!profilePopup);
    if (updatedUserProfile) {
      window.location.reload();
    }
  };

  // logout button logic
  const Logout = () => {
    localStorage.removeItem("token");
    setDropBox(false);
    navigate("/logoutDone");
  };

  const { userData } = useLoggedUser();

  return (
    <div className="flex justify-between px-4 lg:px-20 border-b-2 py-4 border-slate-500">
      <div className="flex items-center">
        <Link to={"/blogs"}>
          <img src={MediumLogo} className="w-40 mr-8 " alt="Medium Logo" />
        </Link>
        <AppBarSearchbox />
      </div>
      <div className="flex items-center">
        <div className="cursor-pointer mx-8 font-Afacad text-lg">Write</div>
        <div className="cursor-pointer" onClick={dropBoxMenu}>
          <Avatar authorName={userData?.username} size={8} />
        </div>
        {dropBox && (
          <div className="absolute right-4 bg-white flex justify-center shadow-xl top-14 border-2 rounded-md  py-2 mt-2 w-48 text-center z-10">
            <ul className="w-full">
              <li
                onClick={navigateToMyblogs}
                className="  py-4 rounded-full   cursor-pointer  hover:bg-slate-200"
              >
                <div className=" flex justify-between items-center  mx-10">
                  <div>
                    <img className="w-8 " src={MyBlogs} alt="myblogs" />
                  </div>

                  <div className=" font-Gelasio  ">My Blogs</div>
                </div>
              </li>

              <li
                className="py-4 rounded-full  cursor-pointer hover:bg-slate-200"
                onClick={profileClick}
              >
                {" "}
                <div className="flex justify-between items-center mx-10">
                  <div>
                    <img className="w-8 " src={Blackprofile} alt="Profile" />
                  </div>

                  <div className=" font-Gelasio  ">Profile</div>
                </div>
              </li>

              <li
                className="py-4 rounded-full   cursor-pointer hover:bg-slate-200"
                onClick={Logout}
              >
                <div className="flex justify-between items-center  mx-10">
                  <div>
                    <img className="w-8 " src={BlackLogout} alt="logout" />
                  </div>

                  <div className=" font-Gelasio  ">Logout</div>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
      {profilePopup &&
        (userBioValue ? (
          <ProfilePopupTwo
            onchangeTwo={(e) => {
              setUserProfilePicture(e.target.value[0]);
            }}
            currentBio={userProfile?.bio}
            onclick={saveChangesUpdated}
            onchange={(e) => {
              setUserBio(e.target.value);
            }}
            closeProfilePopup={closeProfilePopup}
          />
        ) : (
          <ProfilePopupOne
            onchangeTwo={(e) => {
              setUserProfilePicture(e.target.value[0]);
            }}
            onchange={(e) => setUserBio(e.target.value)}
            onclick={saveChanges}
            closeProfilePopup={closeProfilePopup}
          />
        ))}
    </div>
  );
}

export default AppBarLogged;

function AppBarSearchbox() {
  return (
    <div className="hidden lg:flex">
      <input
        className="border-gray-100 font-Afacad focus:outline-none border-2 px-3 py-2 w-60 rounded-full bg-slate-100"
        type="text"
        placeholder="Search"
      />
    </div>
  );
}
