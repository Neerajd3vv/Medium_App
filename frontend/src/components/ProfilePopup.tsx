import { ChangeEvent, MouseEventHandler } from "react";
import RedCross from "../images/blackcross.webp";

interface profilePopUpType {
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
  onclick: MouseEventHandler<HTMLButtonElement>;
  closeProfilePopup: MouseEventHandler<HTMLDivElement>;
  onchangetwo: (e: ChangeEvent<HTMLInputElement>) => void;
}
export function ProfilePopupOne({
  onchange,
  onclick,
  closeProfilePopup,
  onchangetwo,
}: profilePopUpType) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white pt-4 px-10 pb-6 rounded-lg border-2 shadow-xl">
        <div className="flex justify-end mb-8">
          <img
            onClick={closeProfilePopup}
            src={RedCross}
            alt="Cross"
            className="w-4 cursor-pointer"
          />
        </div>
        <h2 className="text-2xl font-semibold mb-4 font-ptserif">
          Edit Profile
        </h2>
        <input
          type="text"
          placeholder="Enter your bio"
          className="border border-gray-300 focus:outline-none rounded-md px-3 py-2 mb-4 w-full"
          // value={bio}
          onChange={onchange}
        />
        <label htmlFor="ProfileImage" className=" mb-2 font-Hind">
          Upload Profile Picture
        </label>
        <input
          onChange={onchangetwo}
          id="profileImage"
          placeholder="Choose Image"
          type="file"
          name="image"
          accept="image/*"
          className="block mt-2 mb-6"
        />
        <div className="flex justify-center mb-8 ">
          <button
            onClick={onclick}
            className="bg-green-500 text-white px-4 w-full py-2 rounded-md hover:bg-green-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

interface ProfilePopTwoType {
  onclick: MouseEventHandler<HTMLButtonElement>;
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
  closeProfilePopup: MouseEventHandler<HTMLDivElement>;
  currentBio: string | undefined;
  onchangetwo: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function ProfilePopupTwo({
  onclick,
  onchange,
  closeProfilePopup,
  currentBio,
  onchangetwo,
}: ProfilePopTwoType) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white max-w-4xl pt-4 px-10 pb-6 rounded-lg border-2 shadow-xl">
        <div className="flex justify-end mb-8">
          <img
            onClick={closeProfilePopup}
            src={RedCross}
            alt="Cross"
            className="w-4 cursor-pointer"
          />
        </div>
        <h2 className="text-2xl  font-semibold mb-4 font-ptserif">
          Update Profile
        </h2>
        <div className="flex mb-2 items-center ">
          <div className=" block mr-4 lg:mr-2 font-Mullish font-bold">
            Current Bio:
          </div>
          <div className="font-lora text-lg ">{currentBio}</div>
        </div>

        <input
          type="text"
          placeholder="Enter your new bio"
          className="border border-gray-300 focus:outline-none rounded-md px-3 py-2 mb-4 w-full"
          // value={bio}
          onChange={onchange}
        />
        <label htmlFor="ProfileImage" className=" mb-2 font-Afacad text-lg">
          Upload Profile Picture
        </label>
        <input
          onChange={onchangetwo}
          id="profileImage"
          placeholder="Choose Image"
          type="file"
          name="image"
          accept="image/*"
          className="block mt-2 mb-6"
        />
        <div className="flex justify-center mb-8 ">
          <button
            onClick={onclick}
            className="bg-green-500 text-white px-4 w-full py-2 rounded-md hover:bg-green-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

interface SigninToReadBlogType {
  cancel?: MouseEventHandler<HTMLButtonElement>;
  signin?: MouseEventHandler<HTMLButtonElement>;
}

export function SigninToReadBlog({ cancel, signin }: SigninToReadBlogType) {
  return (
    <div className="w-full h-full fixed flex justify-center items-center top-0 right-0 bg-black bg-opacity-50 z-50 ">
      <div className="rounded-lg bg-MainBlack max-w-md py-10 px-10 lg:max-w-3xl lg:px-20 lg:py-20">
        <div className="flex text-white text-lg lg:text-4xl font-semibold mb-10  font-rowdies ">
          Upgrade Your Read: Sign in for Full Access to Blogs!
        </div>
        <div className="flex justify-between">
          <button
            onClick={cancel}
            className="bg-red-600 hover:bg-red-500 text-white w-32 lg:w-60 py-2 rounded-full font-Afacad text-lg"
          >
            Cancel
          </button>
          <button
            onClick={signin}
            className="bg-heheblu font-Afacad text-lg hover:bg-Myblue w-32 text-white lg:w-60 py-2 rounded-full"
          >
            Signin
          </button>
        </div>
      </div>
    </div>
  );
}

