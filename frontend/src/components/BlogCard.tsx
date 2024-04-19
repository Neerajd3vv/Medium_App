import { useNavigate } from "react-router-dom";
import  useBlog, { useTokenExists } from "../Hooks/Bloghook";
import { useState } from "react";
import { SigninToReadBlog } from "./ProfilePopup";
interface blogCardType {
  authorName: string;
  title: string;
  mainbody: string;
  publishDate: string;
  id: string;
  profilePicture:string
}

function BlogCard({
  authorName,
  title,
  mainbody,
  publishDate,
  id,
  profilePicture,
}: blogCardType) {
  const {profileUrlExists} = useBlog()
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

  // cancel of popup asking for signing in to red full aticle

  function cancel() {
    setShowSignInPopup(false);
  }

  // redirectin to sigin in page
  function signin() {
    navigate("/signin");
  }

  return (
    <>
      <div className="flex justify-center mb-2 " onClick={readBlog}>
        <div className="py-12 px-8 border-b-2 cursor-pointer  border-slate-300 max-w-3xl w-full rounded-md ">
          <div className="flex col items-center mb-4">
           {profileUrlExists ? (
            <AvatarProfile  userImage={profilePicture}/>
           ): (
            <Avatar authorName={authorName}/>
           )}

            <div className="px-2 font-Afacad text-lg ">{authorName} •</div>
            <div className="text-gray-400  font-Afacad">{publishDate}</div>
          </div>
          <div className="text-3xl font-bold font-Poppins mb-2">{title}</div>
          <div className="text-lg text-slate-700 mb-8  font-ptserif">
            {truncatedBody}
            <div className="text-Myblue">Readmore ...</div>
          </div>
          <div className="font-Afacad font-semibold text-gray-600 ">
            {Math.ceil(bodyWordLength / 100)} min read{" "}
          </div>
        </div>
      </div>
      {showSignInPopup ? (
        <SigninToReadBlog cancel={cancel} signin={signin} />
      ) : null}
    </>
  );
}

export function Avatar({authorName}:{authorName: string}) {
  return (
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="font-medium text-gray-600 dark:text-gray-300">{authorName.toLocaleUpperCase()[0]}</span>
</div>
  )
}

function AvatarProfile({ userImage }: { userImage?: any }) {
  return (
    <div className="flex items-center gap-4">
      <img
        className="w-10 h-10 object-fill rounded-full"
        src={userImage}
        alt="image"
      />
    </div>
  );
}

  





export default BlogCard;
