import { Link } from "react-router-dom";

interface blogCardType {
  authorName: string;
  title: string;
  mainbody: string;
  publishDate: string;
  id: string
}

function BlogCard({ authorName, title, mainbody, publishDate , id}: blogCardType) {
  const bodyWord = mainbody.split(" ");
  const bodyWordLength = bodyWord.length;
  const truncatedBody =
    bodyWord.length > 100
      ? `${bodyWord.slice(0, 60).join(" ")}  Readmore...`
      : mainbody;
  return (
    <Link to={"/blog/"+ id}>
    <div className="flex justify-center mb-2 ">
      
      <div className="py-12 px-8 border-b-2 cursor-pointer  border-slate-300 max-w-3xl w-full rounded-md ">
        <div className="flex col items-center mb-4">
          <div>
            <Avatar authorName={authorName} />
          </div>

          <div className="px-2 font-rowdies ">{authorName} •</div>
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
    </Link>
  );
}

export function Avatar({ authorName }: { authorName?: string }) {
  if (!authorName) {
    // Handle the case when authorName is undefined
    return ; // or render a placeholder avatar
  }

  return (
    <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-bubblyblue rounded-full dark:bg-gray-600">
      <span className="font-medium  text-white font-Merri  dark:text-black">
        {authorName.toUpperCase()[0]}
      </span>
    </div>
  );
}

export default BlogCard;
