import { useNavigate } from "react-router-dom";
import { useTokenExists } from "../Hooks/Bloghook";
import { useState } from "react";
import { SigninToReadBlog } from "./ProfilePopup";
import { Link } from "react-router-dom";
// import nature from "../images/nature.jpg";
// import tick from "../images/Tick.png"
interface blogCardType {
  authorName: string;
  title: string;
  mainbody: string;
  publishDate: string;
  id: string;
  profilePicture: string | null;
  coverPhotoUrl : string
}

function BlogCard({
  authorName,
  title,
  mainbody,
  publishDate,
  id,
  profilePicture,
  coverPhotoUrl,
}: blogCardType) {
  const { userTokenExists } = useTokenExists();
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const navigate = useNavigate();

  const bodyWord = mainbody.split(" ");
  const bodyWordLength = bodyWord.length;
  const truncatedBody =
    bodyWord.length > 50 ? `${bodyWord.slice(0, 30).join(" ")}` : mainbody;

  const readBlog = () => {
    if (userTokenExists) {
      navigate(`/blog/${id}`);
    } else {
      setShowSignInPopup(true);
    }
  };

  return (
    <>
  <div className="flex justify-center mb-2" >
  <div className="py-12 px-8 border-b-2 grid grid-cols-3  bg-slate-200 border-slate-300 max-w-5xl w-full rounded-md">
    <div className="grid  col-span-2">
      <div className="flex col items-center mb-4">
        {/* conditional render of one of the avatars */}
        {profilePicture ? (
          <AvatarProfile userImage={profilePicture} />
        ) : (
          <Avatar authorName={authorName} />
        )}
        <div className="px-2 font-Afacad text-lg">{authorName} •</div>
        <div className="text-gray-400 font-Afacad">{publishDate}</div>
      </div>
      <div className="text-3xl font-bold font-Poppins mb-2">{title}</div>
      <div className="text-lg max-w-2xl text-slate-700 mb-8 font-ptserif">
        {truncatedBody}
        <div onClick={readBlog} className="text-Myblue cursor-pointer font-mono">Read more...</div>
      </div>
      <div className="font-Afacad font-semibold text-gray-600">
        {Math.ceil(bodyWordLength / 100)} min read
      </div>
    </div>
    <div className=" justify-center  items-center grid col-span-1 ">
      <img className="" src={coverPhotoUrl} alt="cover_image" />
    </div>
  </div>
</div>
      {showSignInPopup ? (
        <SigninToReadBlog
          cancel={() => setShowSignInPopup(false)}
          signin={() => navigate("/signin")}
        />
      ) : null}
    </>
  );
}

export function Avatar({ authorName }: { authorName: string | undefined }) {
  return (
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-300 rounded-full ">
      <span className="font-medium text-black ">
        {authorName?.toLocaleUpperCase()[0]}
      </span>
    </div>
  );
}

function AvatarProfile({ userImage }: { userImage?: any }) {
  return (
      <img
        className="w-10 h-10  rounded-full"
        src={userImage}
        alt="image"
      />
  );
}

export default BlogCard;
