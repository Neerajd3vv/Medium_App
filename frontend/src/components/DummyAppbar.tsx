import MediumLogo from "../images/Medium-Logo.png";

function DummyAppBar() {
  return (
    <div className="grid grid-cols-2  lg:px-20 border-b-2 py-4 border-slate-500">
      <div className="lg:ml-20">
        <img src={MediumLogo} className="w-40" alt="Medium Logo" />
      </div>

      <div className=" flex justify-center items-center  grid-cols-2">
        <div className=" pr-8 hidden lg:flex">
          <div className="mx-4 cursor-pointer font-Afacad">Our story</div>
          <div className="mx-4 cursor-pointer font-Afacad">Write</div>{" "}
          <div className="mx-4 cursor-pointer font-Afacad">Signin</div>
        </div>

        <div>
          <div className="font-Hind flex justify-center items-center relative">
            <button className="bg-black font-hind hover:bg-MainBlack text-white font-bold py-2 px-4 w-32 lg:w-40 rounded-3xl">
              Get started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DummyAppBar;
