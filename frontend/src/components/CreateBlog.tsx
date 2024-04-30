import  { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { toast } from "react-toastify";
import { storage } from "../../Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { NewBlogSchema } from "@neerajrandom/medium-cloned";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function CreateBlog() {
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [userInfo, setUserInfo] = useState<NewBlogSchema>({
    title: "",
    body: "",
    coverphoto: "",
  });
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  const PublishPost = async () => {
    try {
      if (!userInfo.title || !userInfo.body || !coverPhoto) {
        toast.error("Please fill in all fields and select a cover photo!", {
          autoClose: 1300,
        });
        return;
      }
      setLoading(true); // Set loading to true when publishing starts
      const CoverPhotoRef = ref(
        storage,
        `CoverPhoto/${coverPhoto.name + v4()}`
      );
      await uploadBytes(CoverPhotoRef, coverPhoto);
      getDownloadURL(CoverPhotoRef).then(async (url) => {
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/blog/createblog`,
          { title: userInfo.title, body: userInfo.body, coverphoto: url },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const userBlog = response.data.Blog;
        if (userBlog) {
          setUserInfo({
            title: "",
            body: "",
            coverphoto: "",
          });
          toast("Blog created successfully!", { autoClose: 1300 });
        }
      });
    } catch (error) {
      toast.error("Error in creating blog", { autoClose: 1300 });
    } finally {
      setLoading(false); // Set loading back to false after publishing completes
    }
  };

  const maxImageSize = 8 * 1024 * 1024;

  const HandleImages = (event: any) => {
    const file = event.target.files[0];
    if (file.size > maxImageSize) {
      toast("Image size exceeds 8mb");
      return;
    }
    setCoverPhoto(file);
  };

  return (
    <div>
      <input
      value={userInfo.title}
        onChange={(e) => {
          setUserInfo({
            ...userInfo,
            title: e.target.value,
          });
        }}
        className="bg-slate-100 font-Afacad text-xl focus:ring  focus:ring-black w-full lg:w-1/3  p-3  focus:outline-none  rounded-lg"
        placeholder="Blog title!"
      />
      <input
      value={userInfo.coverphoto}
        onChange={HandleImages}
        className="bg-MainBlack block file font-rowdies w-full lg:w-1/3 my-3 p-3 text-white   rounded-lg"
        type="file"
        accept="images/*"
        placeholder="Choose Image"
      />

      <ReactQuill
      value={userInfo.body}
        onChange={(value) => {
          setUserInfo({
            ...userInfo,
            body: value,
          });
        }}
        className=" h-96 mb-20 lg:mb-12"
        theme="snow"
      />
      <button
        onClick={PublishPost}
        className="w-full py-3 font-rowdies text-lg text-white bg-MainBlack hover:bg-heheblu  rounded-b-lg focus:outline-none "
      >
        {loading ? "Publishing..." : "Publish Post"} {/* Show loading text */}
      </button>
    </div>
  );
}

export default CreateBlog;

