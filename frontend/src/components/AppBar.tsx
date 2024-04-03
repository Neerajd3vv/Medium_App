import { Avatar } from "./BlogCard";
import MediumLogo from "../images/Medium-Logo.png";

function AppBar() {
  return (
    <div className="flex justify-between px-12 border-b-2 py-4 border-slate-200">
      <div className="w-32  flex">
        <img src={MediumLogo} alt="Medium-Logo " />
        <div className="flex items-center ml-3">
          <AppBarSearchbox />
        </div>
      </div>
      <div className="flex col items-center ">
        <div className="w-7 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            id="bell"
          >
            <rect width="256" height="256" fill="none"></rect>
            <path
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="8"
              d="M56.20305 104A71.899 71.899 0 0 1 128.5484 32.002c39.58967.29432 71.25651 33.20133 71.25651 72.90185V112c0 35.81563 7.49325 56.59893 14.093 67.95814A7.999 7.999 0 0 1 207.01628 192H48.98365A7.99908 7.99908 0 0 1 42.103 179.95641c6.60328-11.35959 14.1-32.1426 14.1-67.95641zM96 192v8a32 32 0 0 0 64 0v-8"
            ></path>
          </svg>
        </div>
        <div className="pl-6">
          <Avatar size={10} authorName="Neeraj" />
        </div>
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
