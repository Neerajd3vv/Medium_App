import { useNavigate } from "react-router-dom";
import { useTokenExists } from "../Hooks/Bloghook";
import { useState } from "react";
import { SigninToReadBlog } from "./ProfilePopup";
interface blogCardType {
  authorName: string;
  title: string;
  mainbody: string;
  publishDate: string;
  id: string;
}

function BlogCard({
  authorName,
  title,
  mainbody,
  publishDate,
  id,
}: blogCardType) {
  const { userTokenExists } = useTokenExists();
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const navigate = useNavigate();
  const bodyWord = mainbody.split(" ");
  const bodyWordLength = bodyWord.length;
  const truncatedBody =
    bodyWord.length > 100
      ? `${bodyWord.slice(0, 60).join(" ")}  Readmore...`
      : mainbody;

  const readBlog = () => {
    if (userTokenExists) {
      navigate(`/blog/${id}`);
    } else {
      setShowSignInPopup(true);
    }
  };

  // cancel of popup asking for signing in to red full aticle

  function cancel (){
    setShowSignInPopup(false)
  }

  // redirectin to sigin in page
  function signin () {
    navigate("/signin")
  }

  return (
   
    <>
    <div className="flex justify-center mb-2 " onClick={readBlog}>
      <div className="py-12 px-8 border-b-2 cursor-pointer  border-slate-300 max-w-3xl w-full rounded-md ">
        <div className="flex col items-center mb-4">
          <div>
            <Avatar authorName={authorName} />
          </div>

          <div className="px-2 font-Afacad text-lg ">{authorName} •</div>
          <div className="text-gray-400  font-Afacad">{publishDate}</div>
        </div>
        <div className="text-3xl font-bold font-Poppins mb-2">{title}</div>
        <div className="text-lg text-slate-500 mb-8 font-semibold font-lora">
          {truncatedBody}
        </div>
        <div className="font-Afacad font-semibold text-gray-600 ">
          {Math.ceil(bodyWordLength / 100)} min read{" "}
        </div>
      </div>
    </div>
   {showSignInPopup ? (
    <SigninToReadBlog cancel={cancel} signin={signin}/>
   ) : null}
   </>
   
  );
}

export function Avatar({
  authorName,
  size = 8,
}: {
  authorName?: string;
  size?: number;
}) {
  if (!authorName) {
    // Handle the case when authorName is undefined
    return; // or render a placeholder avatar
  }

  return (
    <div
      className={`relative w-${size} inline-flex items-center h-${size} justify-center  overflow-hidden bg-redMe rounded-full `}
    >
      <span className="font-medium  text-white font-Merri  dark:text-black">
        {authorName.toUpperCase()[0]}
      </span>
    </div>
  );
}

export default BlogCard;
