import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

interface MineBlogType {
  id: string;
  title: string;
  body: string;
  publishDate: string;
  authorName: string;
}

function MyBlogs({ id, title, body, publishDate, authorName }: MineBlogType) {
  const bodyWord = body.split(" ");
  const bodyWordLength = bodyWord.length;
  const truncatedBody =
    bodyWord.length > 100
      ? `${bodyWord.slice(0, 60).join(" ")}`
      : body;
  return (
    <Link to={"/blog/" + id}>
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
          <div className="text-lg font-Gelasio mb-8 ">
            {truncatedBody}
            <div className="text-Myblue">Readmore...</div>
          </div>
          <div className="font-Afacad font-semibold text-gray-600 ">
            {Math.ceil(bodyWordLength / 100)} min read{" "}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MyBlogs;
