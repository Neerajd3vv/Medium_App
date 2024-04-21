import { ChangeEvent, useEffect, useState } from "react";
import useBlog, { useUserBioChecking } from "../Hooks/Bloghook";
import MediumLogo from "../images/Medium-Logo.png";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { ProfilePopupOne, ProfilePopupTwo } from "./ProfilePopup";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import balckprofile from "../images/blackProfile.png";
// React toast
import { toast } from "react-toastify";
//firebase imports
import { storage } from "../../Firebase";
// ref to create ref to where ProfilePicture will be saved in storage bucket , uploadbyte help us to uload files to firebase
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

function AppBarLogged() {
  useEffect(() => {
    const storedImageLocally = localStorage.getItem("userProfileImage");
    if (storedImageLocally) {
      setuserProfileImage(storedImageLocally);
    } else {
      setProfileUrlExitsLoclStorage(true);
    }
  }, []);

  const [profileUrlExistsInLocalStorage, setProfileUrlExitsLoclStorage] = useState(false);
  const { setBlogSearch } = useBlog();
  const location = useLocation();
  const { userBioValue, userProfile } = useUserBioChecking();
  const navigate = useNavigate();
  const [dropBox, setDropBox] = useState(false);
  const [profilePopup, setProfilePopup] = useState(false);
  const [userBio, setUserBio] = useState("");
  const [userProfilePicture, setUserProfilePicture] = useState<File | null>(
    null
  );
  // Here we are saving the firebase url to this follwing state
  const [userProfileImage, setuserProfileImage] = useState<string | null>(null);
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
    setProfilePopup(!setProfilePopup);
    navigate("/myblogs");
    // updateAuthenticationStatus(false);
  };

  // savechanges for new Profile
  const saveChanges = async () => {
    try {
      // storing userImgage to firebase storage
      if (userProfilePicture === null) {
        return;
      }
      //ref to upload file in firebase storage
      const ProfilePictureRef = ref(
        storage,
        `Images/${userProfilePicture.name + v4()}`
      );

      //upload the image to firebase
      await uploadBytes(ProfilePictureRef, userProfilePicture);

      // getting Public url and saving it to UserPublicProfileUrl state
      getDownloadURL(ProfilePictureRef).then(async (PublicUrl) => {
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/user/userprofile`,
          { userBio, PublicUrl },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const UserProfile = response.data.ProfileData;
        if (UserProfile) {
          localStorage.setItem("userProfileImage", UserProfile.profileUrl);
          setuserProfileImage(UserProfile.profileUrl);
          setProfilePopup(!profilePopup);
          toast("Profile Saved", { autoClose: 1200 });
        }
      });
    } catch (error) {
      toast.error("Error! Occurred while setting profile");
      // Handle error, e.g., display an error message to the user
    }
  };

  // savechanges for updating Profile
  const saveChangesUpdated = async () => {
    try {
      if (userProfilePicture == null) {
        return;
      }
      // ref to storage bucket
      const ProfilePictureRef = ref(
        storage,
        `Images/${userProfilePicture.name + v4()}`
      );
      // upload images to firebase
      await uploadBytes(ProfilePictureRef, userProfilePicture);
      getDownloadURL(ProfilePictureRef).then(async (PublicUrl) => {
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/user/userprofileupdate`,
          { userBio, PublicUrl },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const updatedProfileUser = response.data.UpdatedProfile;
        if (updatedProfileUser) {
          localStorage.setItem(
            "userProfileImage",
            updatedProfileUser.profileUrl
          );
          setuserProfileImage(updatedProfileUser.profileUrl);

          setProfilePopup(!profilePopup);
          toast("Profile Updated", { autoClose: 1200 });
        }
      });
    } catch (error) {
      toast.error("Error! Occurred while updating profile");
    }
  };

  // logout button logic
  const Logout = () => {
    localStorage.removeItem("userProfileImage");
    localStorage.removeItem("token");
    setDropBox(false);
    toast("Successfully logged out!", { autoClose: 1200 });
    if (location.pathname === "/blogs") {
      setTimeout(() => {
        window.location.reload();
      }, 1600);
    } else {
      navigate("/blogs");
    }
  };

  // Handle profile set
  const maxImageSize = 4 * 1024 * 1024;
  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    // Validate file type
    if (!file || file.size > maxImageSize) {
      toast.error("Image size should'nt be more than 4mb", { autoClose: 1300 });
      return;
    }
    setUserProfilePicture(file);
  };

  // const { userData } = useLoggedUser();

  return (
    <div>
      <div className="flex justify-between px-4 lg:px-20 border-b-2 shadow-sm py-4 border-slate-300">
        <div className="flex items-center">
          <Link to={"/blogs"}>
            <img src={MediumLogo} className="w-40 mr-8 " alt="Medium Logo" />
          </Link>
          <AppBarSearchbox
            onchange={(e) => {
              // console.log(e.target.value);

              setBlogSearch(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center">
          <Link to={"/create-blog"}>
            <div className="cursor-pointer mx-8 font-Afacad text-lg">Write</div>
          </Link>
          <div className="cursor-pointer" onClick={dropBoxMenu}>
            {profileUrlExistsInLocalStorage ? (
              <Avatar />
            ) : (
              <AvatarProfile userImage={userProfileImage}/>
            )}
          </div>
          {dropBox && (
            <div className="absolute right-4 bg-actualBlack flex justify-center items-center shadow-xl  top-14 border-2 rounded-xl  py-4 mt-2 w-48 text-center z-10">
              <ul className="w-full">
                <li
                  onClick={navigateToMyblogs}
                  className="py-2 px-4 text-white rounded-full font-Mullish  text-lg  cursor-pointer hover:bg-slate-200 hover:text-black"
                >
                  My Blogs
                </li>
                <li
                  onClick={profileClick}
                  className="py-2 px-4 text-white rounded-full  font-Mullish  text-lg  cursor-pointer hover:bg-slate-200 hover:text-black"
                >
                  Profile
                </li>
                <li
                  onClick={Logout}
                  className="py-2 px-4 text-white rounded-full  font-Mullish  text-lg  cursor-pointer hover:bg-slate-200 hover:text-black"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
        {profilePopup &&
          (userBioValue ? (
            <ProfilePopupTwo
              onchangetwo={handleImageChange}
              currentBio={userProfile?.bio}
              onclick={saveChangesUpdated}
              onchange={(e) => {
                setUserBio(e.target.value);
              }}
              closeProfilePopup={closeProfilePopup}
            />
          ) : (
            <ProfilePopupOne
              onchangetwo={handleImageChange}
              onchange={(e) => setUserBio(e.target.value)}
              onclick={saveChanges}
              closeProfilePopup={closeProfilePopup}
            />
          ))}
      </div>
    </div>
  );
}

export default AppBarLogged;
interface AppsearchBoxType {
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function AppBarSearchbox({ onchange }: AppsearchBoxType) {
  return (
    <div className="hidden lg:flex">
      <input
        onChange={onchange}
        className="border-gray-300 text-black font-Afacad focus:outline-none border-2 px-3 py-2 w-60 rounded-full bg-slate-200"
        type="text"
        placeholder="Search"
      />
    </div>
  );
}

function Avatar() {
  return <img className="w-10" src={balckprofile} />;
}

export function AvatarProfile({ userImage }: { userImage?: any }) {
  return (
    <img className="w-12 h-12  rounded-full" src={userImage} alt="image" />
  );
}
