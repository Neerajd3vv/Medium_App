import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tick from "../images/Tick.png";
function userLoggedOutSuccessfully() {
    const navigate = useNavigate();
    useEffect(() => {
      setTimeout(() => {
        navigate("/blogs");
      }, 2000);
    });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-300 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg border-slate-300 shadow-2xl border-2 px-10 pt-12 pb-14 max-w-xl  w-full">
        <div className="text-4xl text-center font-poppions font-bold mb-20">
          User Successfully Signed Off
        </div>
        <div className="flex justify-center">
          <img className="w-40" src={tick} alt="success" />
        </div>
      </div>
    </div>
  );
}

export default userLoggedOutSuccessfully;
