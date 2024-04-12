import { ChangeEvent, MouseEventHandler } from "react";
import RedCross from "../images/RedCross.png";

interface profilePopUpType {
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
  onclick: MouseEventHandler<HTMLButtonElement>;
  closeProfilePopup: MouseEventHandler<HTMLDivElement>;
}

function ProfilePopup({
  onchange,
  onclick,
  closeProfilePopup,
}: profilePopUpType) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white pt-4 px-10 pb-6 rounded-lg border-2 shadow-xl">
        <div className="flex justify-end mb-8">
          <img
            onClick={closeProfilePopup}
            src={RedCross}
            alt="Cross"
            className="w-8 cursor-pointer"
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
          id="profileImage"
          placeholder="Choose Image"
          type="file"
          className="block mt-2 mb-6"
        />
        <div className="flex justify-center mb-8 ">
          <button
            onClick={onclick}
            className="bg-green-500 text-white px-4 w-full py-2 rounded-md hover:bg-green-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePopup;
