import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { AvatarProfile } from "./AppBarLogged";
import updateBlog from "../images/actualWrite.png";
import deleteblog from "../images/deleteBlog.png";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
interface MineBlogType {
  id: string;
  title: string;
  body: string;
  publishDate: string;
  authorName: string;
  profilePicture: string | null;
  coverphoto: string | undefined;
}

function MyBlogs({
  id,
  title,
  body,
  publishDate,
  authorName,
  profilePicture,
  coverphoto,
}: MineBlogType) {
  const bodyWord = body.split(" ");
  const bodyWordLength = bodyWord.length;
  const truncatedBody =
    bodyWord.length > 50 ? `${bodyWord.slice(0, 30).join(" ")}` : body;

  function stripHtml(html: string) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.innerText || "";
  }

  const htmltotext = stripHtml(truncatedBody);

  /// delete blog function
  const deleteBlog = async () => {
    const response = await axios.delete(
      `${BACKEND_URL}/api/v1/blog/blogdeleted`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: { id },
      }
    );
    if (response) {
      toast("Blog deleted successfully!", { autoClose: 1200 });
      setTimeout(() => {
        window.location.reload();
      }, 1600);
    } else {
      toast.error("Error while deleting blog");
    }
  };

  const navigate = useNavigate();
  const navigateUpdateBlog = () => {
    navigate("/updateblog/" + id);
  };

  return (
    <div className="flex justify-center mb-2">
      <div className="py-12 px-8 border-b-2 grid grid-cols-3  border-slate-300 max-w-5xl w-full rounded-md">
        <div className="grid col-span-2">
          <div className="flex col items-center mb-4">
            <div>
              {profilePicture ? (
                <AvatarProfile userImage={profilePicture} />
              ) : (
                <Avatar authorName={authorName} />
              )}
            </div>

            <div className="px-2 font-rowdies">{authorName} •</div>
            <div className="text-gray-400 font-Afacad">{publishDate}</div>
          </div>
          <div className="text-3xl font-bold font-Poppins mb-2">{title}</div>
          <div className="text-lg font-Gelasio mb-8 pr-1">
            {htmltotext}
            <div>
              <Link
                to={`/blog/${id}`}
                className="text-Myblue font-Afacad underline"
              >
                Read more...
              </Link>
            </div>
          </div>
          <div className="font-Afacad font-semibold text-gray-600">
            {Math.ceil(bodyWordLength / 100)} min read{" "}
          </div>
        </div>
        <div className="grid w-full h-full col-span-1 justify-center items-center">
          <img className="" src={coverphoto} alt="img" />
          {/* Update and Delete functionality */}
          <div className="flex justify-end mt-3">
            <img
              onClick={navigateUpdateBlog}
              className="w-6 cursor-pointer mx-4"
              src={updateBlog}
              alt="Update-blog"
            />
            <img
              onClick={deleteBlog}
              className="w-6 cursor-pointer"
              src={deleteblog}
              alt="Delete-blog"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyBlogs;
